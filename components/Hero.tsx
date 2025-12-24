
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { soundService } from '../services/soundService';

const Hero: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleDearestClick = () => {
    soundService.playSparkle();
    const newCount = clickCount + 1;
    if (newCount === 3) {
      soundService.playMagicSuccess();
      setShowEasterEgg(true);
      setClickCount(0);
      // Auto-hide after 5 seconds
      setTimeout(() => setShowEasterEgg(false), 5000);
    } else {
      setClickCount(newCount);
    }
  };

  // Reset click count if not clicked for 2 seconds
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleExploreClick = () => {
    soundService.playClick();
    document.getElementById('ai-writer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Secret Easter Egg Overlay */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-500/20 backdrop-blur-md animate-fade-in">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-rose-300 transform scale-110 transition-transform text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="flex flex-wrap gap-4 p-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <Heart key={i} className="text-rose-500 animate-bounce" size={24} />
                ))}
              </div>
            </div>
            <h3 className="text-4xl font-arabic-poetic text-rose-600 mb-4 font-bold">سرّ صغير...</h3>
            <p className="text-2xl text-gray-700 font-arabic-poetic">"أنتِ لستِ فقط حبيبتي، أنتِ موطني وأماني وسبب ابتسامتي في كل صباح."</p>
            <div className="mt-6 flex justify-center gap-2">
              <Heart className="text-rose-500 fill-rose-500 animate-ping" />
              <Heart className="text-rose-500 fill-rose-500 animate-ping delay-75" />
              <Heart className="text-rose-500 fill-rose-500 animate-ping delay-150" />
            </div>
            <button 
              onClick={() => {
                soundService.playClick();
                setShowEasterEgg(false);
              }}
              className="mt-6 text-sm text-gray-400 hover:text-rose-500 underline"
            >
              إغلاق السر ❤️
            </button>
          </div>
        </div>
      )}

      <div className="z-10 animate-fade-in">
        <h2 
          onClick={handleDearestClick}
          className={`text-pink-600 font-romantic text-3xl md:text-4xl mb-2 cursor-pointer select-none transition-all duration-300 ${clickCount > 0 ? 'scale-110 text-rose-400' : ''}`}
        >
          My Dearest...
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold text-gray-800 mb-6 drop-shadow-md">
          عيد ميلاد سعيد يا <span className="text-rose-500">أميرتي</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
          في هذا اليوم المميز، ولدت أجمل وردة في الكون. أنتِ لستِ مجرد حبيبة، أنتِ كل العالم بالنسبة لي.
        </p>
        
        <div className="mt-12 relative inline-block">
          <div className="absolute -inset-4 bg-rose-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <button 
            onClick={handleExploreClick}
            className="relative px-8 py-4 bg-rose-500 text-white rounded-full font-bold text-lg hover:bg-rose-600 transition-all shadow-lg transform hover:scale-105"
          >
            استكشفي هديتك ✨
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <div className="w-1 h-12 bg-rose-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
