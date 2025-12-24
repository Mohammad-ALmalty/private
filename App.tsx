
import React, { useState } from 'react';
import HeartBackground from './components/HeartBackground.tsx';
import Hero from './components/Hero.tsx';
import AILoveLetter from './components/AILoveLetter.tsx';
import Gallery from './components/Gallery.tsx';
import ReasonsSection from './components/ReasonsSection.tsx';
import BirthdaySurprise from './components/BirthdaySurprise.tsx';
import { NAV_ITEMS } from './constants.tsx';
import { soundService } from './services/soundService.ts';
import { Lock, Heart, Stars } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'i_love_you') {
      soundService.playMagicSuccess();
      setIsAuthenticated(true);
    } else {
      soundService.playClick();
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const scrollTo = (id: string) => {
    soundService.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMusicClick = () => {
    soundService.playMagicSuccess();
    alert("تخيلي أغنيتكِ المفضلة تعمل الآن... 🎶 أحبكِ!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative bg-[#fff5f5] flex items-center justify-center px-4 overflow-hidden text-right">
        <HeartBackground />
        <div className="relative z-10 w-full max-w-md animate-fade-in">
          <div className={`bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-rose-100 text-center transition-all duration-300 ${error ? 'shake border-red-300' : ''}`}>
            <div className="inline-block p-4 bg-rose-50 rounded-full mb-6">
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-heartbeat" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-2 font-arabic-poetic">أهلاً بكِ يا أميرتي</h2>
            <p className="text-gray-500 mb-8 font-arabic-poetic">من فضلكِ ادخلي كلمة السر لرؤية هديتكِ</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة السر..."
                  className={`w-full px-6 py-4 rounded-2xl bg-white border outline-none transition-all text-center text-lg ${error ? 'border-red-400 focus:ring-red-200' : 'border-rose-200 focus:ring-rose-400 focus:ring-2'}`}
                  autoFocus
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-200 w-5 h-5" />
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold text-lg hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all active:scale-95"
              >
                افتحي عالمي ❤️
              </button>
            </form>
            
            {error && (
              <p className="mt-4 text-red-500 font-bold text-sm animate-pulse">كلمة السر غير صحيحة يا حبيبتي</p>
            )}
          </div>
          
          <p className="mt-8 text-center text-rose-300 font-romantic text-xl">Created with love just for you</p>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
          @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#fff5f5] text-right">
      <HeartBackground />
      
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl border border-rose-100 flex items-center gap-4 md:gap-8">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-2 rounded-full group-hover:bg-rose-100 text-rose-500 transition-colors">
              {item.icon}
            </div>
            <span className="text-[10px] md:text-xs font-medium text-gray-500 group-hover:text-rose-600 transition-colors">
              {item.label}
            </span>
          </button>
        ))}
        <button onClick={() => scrollTo('surprises')} className="flex flex-col items-center gap-1 group">
            <div className="p-2 rounded-full group-hover:bg-rose-100 text-rose-500 transition-colors">
              <Stars size={20} />
            </div>
            <span className="text-[10px] md:text-xs font-medium text-gray-500 group-hover:text-rose-600 transition-colors">المفاجأة</span>
        </button>
      </nav>

      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        
        <AILoveLetter />
        
        <Gallery />

        <div id="surprises">
          <BirthdaySurprise />
        </div>
        
        <ReasonsSection />

        <footer className="py-20 text-center bg-rose-600 text-white mt-20">
          <div className="max-w-2xl mx-auto px-4">
            <h3 className="text-3xl font-romantic mb-4">Always & Forever</h3>
            <p className="text-rose-100 text-lg mb-8 font-arabic-poetic">
              كل عام وأنتِ حبيبتي، رفيقتي، وملهمتي. أتمنى لكِ عاماً مليئاً بالسعادة كما تملئين حياتي بها.
            </p>
            <p className="font-arabic-poetic text-white text-xl font-bold mb-8">مع كل حبي، محمد ❤️</p>
            <div className="flex justify-center gap-4">
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform" onClick={() => soundService.playSparkle()}>❤️</span>
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform" onClick={() => soundService.playMagicSuccess()}>🎂</span>
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform" onClick={() => soundService.playSparkle()}>🎈</span>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed top-6 right-6 z-50">
        <button 
          className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-rose-100 text-rose-500 animate-pulse transition-transform hover:scale-110 active:scale-90"
          onClick={handleMusicClick}
        >
          🎵
        </button>
      </div>
    </div>
  );
};

export default App;
