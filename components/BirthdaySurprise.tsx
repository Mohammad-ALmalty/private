
import React, { useState, useEffect, useRef } from 'react';
import { Gift, Sparkles, Wind, PartyPopper, Calendar, Clock, Heart, MicOff } from 'lucide-react';
import { soundService } from '../services/soundService';

const VOUCHERS = [
  "تذكرة لـ 'عشاء رومانسي' من اختيارك 🕯️",
  "يوم كامل من 'الدلال' والراحة التامة 👑",
  "مشاهدة فيلمكِ المفضل مع الكثير من الفشار 🍿",
  "رحلة مفاجئة لمكان تحبينه كثيراً ✈️",
  "باقة ورد كبيرة تصلكِ في أي وقت 💐",
  "عناق دافئ لمدة 10 دقائق كاملة 🤗"
];

// تاريخ بداية العلاقة المحدث: 20 فبراير 2021
const START_DATE = new Date('2021-02-20T00:00:00'); 

const BirthdaySurprise: React.FC = () => {
  const [candlesOut, setCandlesOut] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [currentVoucher, setCurrentVoucher] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [micDenied, setMicDenied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      stopListening();
    };
  }, []);

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#fb7185', '#f43f5e', '#fbbf24', '#38bdf8', '#a855f7'][Math.floor(Math.random() * 5)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleBlowOut = () => {
    if (candlesOut) return;
    setCandlesOut(true);
    soundService.playMagicSuccess();
    triggerConfetti();
    stopListening();
  };

  const openBox = () => {
    if (boxOpened) return;
    const randomVoucher = VOUCHERS[Math.floor(Math.random() * VOUCHERS.length)];
    setCurrentVoucher(randomVoucher);
    setBoxOpened(true);
    soundService.playMagicSuccess();
    triggerConfetti();
  };

  const startListening = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicDenied(true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      setIsListening(true);
      setMicDenied(false);
      
      const checkBlow = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        
        // Threshold for "blowing" sound detection
        if (average > 65) { 
          handleBlowOut();
        } else {
          animationRef.current = requestAnimationFrame(checkBlow);
        }
      };
      
      checkBlow();
    } catch (err: any) {
      console.error("Mic access error:", err);
      setIsListening(false);
      setMicDenied(true);
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        alert("عذراً حبيبتي، يبدو أن الوصول للميكروفون مرفوض. يمكنكِ إطفاء الشموع يدوياً بالنقر عليها، أو تفعيل الإذن من إعدادات المتصفح.");
      }
    }
  };

  const stopListening = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsListening(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/50 relative overflow-hidden">
      {confetti.map((c) => (
        <div 
          key={c.id}
          className="fixed pointer-events-none z-[100] animate-bounce"
          style={{ 
            left: `${c.x}%`, 
            top: `${c.y}%`, 
            width: '10px', 
            height: '10px', 
            backgroundColor: c.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-bold mb-6">
            <Heart size={16} className="fill-rose-600 animate-pulse" />
            <span>منذ أن التقينا أول مرة</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 font-arabic-poetic">حكايتنا مستمرة منذ...</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'يوم', value: timeLeft.days },
              { label: 'ساعة', value: timeLeft.hours },
              { label: 'دقيقة', value: timeLeft.minutes },
              { label: 'ثانية', value: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-rose-100 transform hover:scale-105 transition-transform">
                <div className="text-4xl md:text-5xl font-bold text-rose-500 mb-2 font-romantic">{unit.value}</div>
                <div className="text-gray-500 font-bold">{unit.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className="relative p-10 rounded-[3.5rem] bg-white border border-rose-100 shadow-2xl flex flex-col items-center justify-between text-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-arabic-poetic">كعكة الأمنيات</h3>
              <p className="text-gray-500 mb-8 text-sm">أغمضي عينيكِ، تمني أمنية، ثم اطفئي الشموع</p>
            </div>
            
            <div 
              className="relative w-56 h-56 mb-12 flex items-center justify-center cursor-pointer group"
              onClick={handleBlowOut}
              title="انقري لإطفاء الشموع"
            >
              <div className="absolute bottom-4 w-44 h-24 bg-rose-200 rounded-2xl shadow-inner border-b-8 border-rose-300"></div>
              <div className="absolute bottom-16 w-40 h-16 bg-white rounded-2xl shadow-sm border-b-4 border-rose-50"></div>
              
              <div className="absolute bottom-[4.5rem] flex gap-2 w-32 justify-center opacity-40">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-4 h-6 bg-rose-100 rounded-full"></div>)}
              </div>

              {!candlesOut ? (
                <div className="absolute top-4 flex gap-6 z-10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="relative w-4 h-16 bg-gradient-to-b from-yellow-50 to-yellow-200 rounded-full border border-yellow-300 shadow-sm">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                        <div className="w-5 h-8 bg-orange-400 rounded-full animate-pulse opacity-60 blur-md"></div>
                        <div className="absolute inset-0 w-3 h-6 bg-yellow-400 rounded-full animate-bounce mt-1 ml-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in">
                  <PartyPopper size={80} className="text-rose-500 mb-4 animate-bounce" />
                  <span className="text-rose-600 font-bold text-xl">عيد ميلاد سعيد!</span>
                </div>
              )}
            </div>

            <div className="w-full space-y-4">
              {!micDenied ? (
                <button
                  onClick={candlesOut ? undefined : (isListening ? stopListening : startListening)}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                    candlesOut 
                      ? 'bg-gray-100 text-gray-400 cursor-default' 
                      : isListening 
                        ? 'bg-rose-100 text-rose-600 animate-pulse' 
                        : 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200 active:scale-95'
                  }`}
                >
                  {candlesOut ? 'تحققت الأمنية بإذن الله ✨' : isListening ? <><Wind className="animate-spin" /> انفخي بقوة الآن!</> : <><Wind size={20} /> إطفاء الشموع بالنفخ</>}
                </button>
              ) : (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 text-sm font-medium">
                  <MicOff size={18} />
                  <span>الميكروفون غير متاح. يمكنكِ النقر على الكعكة للإطفاء.</span>
                </div>
              )}
              
              {!candlesOut && (
                <p className="text-xs text-rose-300 italic">
                  نصيحة: يمكنكِ النقر على الشموع مباشرة لإطفائها
                </p>
              )}
            </div>
          </div>

          <div className="relative p-10 rounded-[3.5rem] bg-white border border-rose-100 shadow-2xl flex flex-col items-center justify-between text-center overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-rose-50 opacity-10">
              <Gift size={200} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-arabic-poetic">صندوق المفاجآت</h3>
              <p className="text-gray-500 mb-8 text-sm">كل نقرة تخبئ لكِ هدية معنوية خاصة مني</p>
            </div>
            
            <div 
              onClick={openBox}
              className={`relative z-10 cursor-pointer transition-all duration-700 ${boxOpened ? 'rotate-0' : 'hover:scale-110 active:scale-90 hover:rotate-3'}`}
            >
              {!boxOpened ? (
                <div className="group relative">
                  <div className="absolute -inset-8 bg-rose-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <Gift size={140} className="text-rose-500 relative z-10 drop-shadow-2xl" strokeWidth={1} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Sparkles className="text-yellow-400 animate-ping" size={40} />
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 p-8 rounded-[2.5rem] border-2 border-dashed border-rose-200 animate-fade-in relative max-w-xs mx-auto">
                  <div className="absolute -top-4 -right-4 bg-rose-500 text-white p-2 rounded-full shadow-lg">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-rose-600 font-bold mb-4 flex items-center justify-center gap-2">
                    <PartyPopper size={18} />
                    قسيمة الحب
                  </h4>
                  <p className="text-xl font-arabic-poetic text-gray-800 leading-relaxed font-bold">
                    {currentVoucher}
                  </p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setBoxOpened(false); }}
                    className="mt-6 text-xs text-rose-400 hover:text-rose-600 underline"
                  >
                    افتحي هدية أخرى؟
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-8 z-10">
              <p className="text-gray-400 text-sm italic">
                {!boxOpened ? "انقري لتكتشفي مفاجأتكِ اليوم" : "لا تنسي المطالبة بحقكِ في هذه القسيمة! 😉"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdaySurprise;
