
import React from 'react';
import { REASONS } from '../constants';
import { soundService } from '../services/soundService';

const ReasonsSection: React.FC = () => {
  const handleMouseEnter = () => {
    soundService.playSparkle();
  };

  return (
    <section id="reasons" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">لماذا أنتِ الأغلى؟</h2>
          <div className="w-24 h-1.5 bg-rose-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-500 max-w-lg mx-auto">
            هناك آلاف الأسباب التي تجعلني أحبكِ، ولكن هذه بعض الأسباب التي تجعل قلبي ينبض باسمكِ كل يوم.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {REASONS.map((reason) => (
            <div 
              key={reason.id}
              onMouseEnter={handleMouseEnter}
              className="group relative bg-white p-10 rounded-[2.5rem] shadow-lg border border-rose-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-rose-50 text-center cursor-default"
            >
              <div className="absolute top-4 right-4 text-rose-100 opacity-20 group-hover:opacity-40 transition-opacity">
                <span className="text-6xl font-romantic">#0{reason.id}</span>
              </div>
              
              <div className="text-6xl mb-6 inline-block transition-transform duration-500 group-hover:animate-heartbeat">
                {reason.icon}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 transition-all duration-300 group-hover:text-rose-600 group-hover:scale-110 leading-snug">
                {reason.text}
              </h3>
              
              <div className="mt-4 h-1 w-0 bg-rose-300 mx-auto rounded-full transition-all duration-500 group-hover:w-16"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative side element */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <span className="text-[20rem] font-romantic text-rose-500 select-none">Love</span>
      </div>
    </section>
  );
};

export default ReasonsSection;
