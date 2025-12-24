
import React from 'react';
import HeartBackground from './components/HeartBackground';
import Hero from './components/Hero';
import AILoveLetter from './components/AILoveLetter';
import Gallery from './components/Gallery';
import ReasonsSection from './components/ReasonsSection';
import { NAV_ITEMS } from './constants';
import { soundService } from './services/soundService';

const App: React.FC = () => {
  const scrollTo = (id: string) => {
    soundService.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMusicClick = () => {
    soundService.playMagicSuccess();
    alert("تخيلي أغنيتكِ المفضلة تعمل الآن... 🎶 أحبكِ!");
  };

  return (
    <div className="min-h-screen relative bg-[#fff5f5]">
      <HeartBackground />
      
      {/* Navigation */}
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
      </nav>

      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        
        <AILoveLetter />
        
        <Gallery />
        
        <ReasonsSection />

        <footer className="py-20 text-center bg-rose-600 text-white mt-20">
          <div className="max-w-2xl mx-auto px-4">
            <h3 className="text-3xl font-romantic mb-4">Always & Forever</h3>
            <p className="text-rose-100 text-lg mb-8">
              كل عام وأنتِ حبيبتي، رفيقتي، وملهمتي. أتمنى لكِ عاماً مليئاً بالسعادة كما تملئين حياتي بها.
            </p>
            <div className="flex justify-center gap-4">
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform" onClick={() => soundService.playSparkle()}>❤️</span>
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform" onClick={() => soundService.playMagicSuccess()}>🎂</span>
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform" onClick={() => soundService.playSparkle()}>🎈</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Music Control Placeholder (Optional for user interaction) */}
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
