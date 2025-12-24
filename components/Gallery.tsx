
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, Camera, Edit2, Files, Eraser, AlertCircle, HeartCrack } from 'lucide-react';
import { MEMORIES as INITIAL_MEMORIES } from '../constants';
import { Memory } from '../types';
import { soundService } from '../services/soundService';

const Gallery: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>(() => {
    try {
      const saved = localStorage.getItem('eternal_rose_memories');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load memories", e);
    }
    return INITIAL_MEMORIES;
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('eternal_rose_memories', JSON.stringify(memories));
      setError(null);
    } catch (e) {
      console.error("Storage limit reached", e);
      setError("عذراً حبيبي، ذاكرة الصور ممتلئة. يرجى حذف بعض الصور القديمة لإضافة صور جديدة.");
    }
  }, [memories]);

  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);
    const newItems: Memory[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        const compressed = await compressImage(base64);
        newItems.push({
          id: `mem_${Date.now()}_${i}`,
          url: compressed,
          caption: 'لحظة جميلة...',
          date: new Date().toLocaleDateString('ar-EG')
        });
      }
      setMemories(prev => [...newItems, ...prev]);
      soundService.playMagicSuccess();
    } catch (err) {
      setError("حدث خطأ أثناء رفع الصور.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const deleteMemory = (id: string) => {
    soundService.playClick();
    setMemories(prev => prev.filter(m => m.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const clearAllMemories = () => {
    if (window.confirm('هل تريد مسح الألبوم بالكامل؟')) {
      soundService.playClick();
      setMemories([]);
      localStorage.removeItem('eternal_rose_memories');
    }
  };

  const updateCaption = (id: string, newCaption: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, caption: newCaption } : m));
  };

  return (
    <section id="gallery" className="py-20 bg-rose-50/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-3xl shadow-sm mb-6 text-rose-500">
            <Camera size={40} className={isUploading ? "animate-spin" : ""} />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 font-arabic-poetic">ألبوم ذكرياتنا</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            {memories.length > 0 ? (
              <>لديكِ الآن <span className="text-rose-600 font-bold">{memories.length}</span> ذكرى محفوظة في قلب هذا الموقع.</>
            ) : (
              "المكان الذي كان يجب أن يمتلئ بضحكاتنا..."
            )}
          </p>
          
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center justify-center gap-2">
              <AlertCircle size={20} />
              <span className="font-bold">{error}</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="group relative inline-flex items-center gap-3 bg-rose-500 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-600 transition-all shadow-xl disabled:opacity-50"
            >
              <Plus size={24} />
              {isUploading ? 'جاري الحفظ...' : 'إضافة صورنا الأولى'}
            </button>

            {memories.length > 0 && (
              <button onClick={clearAllMemories} className="text-gray-400 hover:text-red-500 font-bold px-6">
                مسح الألبوم
              </button>
            )}
          </div>

          <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" multiple className="hidden" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memories.map((memory, index) => (
            <div 
              key={memory.id} 
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg h-[24rem] cursor-pointer"
              onClick={() => setActiveId(activeId === memory.id ? null : memory.id)}
            >
              <img src={memory.url} alt="" className="w-full h-full object-cover" loading="lazy" />
              
              <div className={`absolute inset-0 bg-gradient-to-t from-rose-950/90 via-black/10 to-transparent transition-all duration-300 flex flex-col justify-end p-6 ${activeId === memory.id ? 'opacity-100' : 'opacity-0'}`}>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteMemory(memory.id); }}
                  className="absolute top-6 right-6 w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-xl"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="text-white space-y-3">
                  <textarea
                    value={memory.caption}
                    onChange={(e) => updateCaption(memory.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white/10 p-3 rounded-xl w-full text-sm font-medium focus:outline-none resize-none"
                    placeholder="اكتبي وصفاً..."
                  />
                  <span className="text-[10px] text-rose-200 uppercase font-bold">{memory.date}</span>
                </div>
              </div>
            </div>
          ))}

          {memories.length === 0 && !isUploading && (
            <div className="col-span-full py-12 text-center animate-fade-in">
              <div className="max-w-md mx-auto bg-white p-8 rounded-[3rem] shadow-2xl border border-rose-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200 opacity-50"></div>
                
                <div className="relative mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop" 
                    alt="Waiting heart" 
                    className="w-full h-64 object-cover rounded-2xl shadow-inner filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/30 backdrop-blur-md p-4 rounded-full border border-white/50 animate-pulse">
                      <HeartCrack size={48} className="text-rose-600" />
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-arabic-poetic">الألبوم فارغ.. كقلبي بدونكِ</h3>
                <p className="text-gray-500 leading-relaxed font-arabic-poetic italic pb-4">
                  "قلبي ينتظر بشوق أولى صورنا معاً.. هذه المساحة فارغة تماماً، تماماً كغيابكِ الذي لا يملؤه شيء سوى حضوركِ."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
