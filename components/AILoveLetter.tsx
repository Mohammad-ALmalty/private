
import React, { useState } from 'react';
import { generateLoveLetter } from '../services/geminiService';
import { Sparkles, Send, Loader2, Heart } from 'lucide-react';
import { soundService } from '../services/soundService';

const AILoveLetter: React.FC = () => {
  const [traits, setTraits] = useState('');
  const [context, setContext] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    soundService.playClick();
    setLoading(true);
    const result = await generateLoveLetter(traits, context);
    setLetter(result);
    setLoading(false);
    soundService.playMagicSuccess();
  };

  const handleReset = () => {
    soundService.playClick();
    setLetter('');
  };

  return (
    <section id="ai-writer" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-rose-500" />
            رسالة من أعماق القلب
            <Sparkles className="text-rose-500" />
          </h2>
          <p className="text-gray-600">أخبريني ببعض صفاتكِ وسأصيغ لكِ كلمات تليق بجمالكِ</p>
        </div>

        {!letter ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-rose-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ما هي أكثر صفة أحبها فيكِ؟</label>
                <input
                  type="text"
                  value={traits}
                  onChange={(e) => setTraits(e.target.value)}
                  placeholder="مثال: رقتك، ضحكتك، ذكاؤك..."
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ذكرى مميزة نعتز بها؟</label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="مثال: رحلتنا الأخيرة للبحر..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
              <button
                onClick={handleGenerate}
                disabled={loading || !traits}
                className="w-full py-4 bg-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-rose-600 disabled:opacity-50 transition-all shadow-md"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
                صياغة الرسالة السحرية
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-rose-100 relative animate-fade-in">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-lg">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            </div>
            <div className="prose prose-rose max-w-none">
              <div className="whitespace-pre-wrap text-xl text-gray-800 font-arabic-poetic leading-relaxed text-right">
                {letter}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-8 text-rose-500 font-medium hover:underline text-center block w-full"
            >
              كتابة رسالة جديدة ❤️
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AILoveLetter;
