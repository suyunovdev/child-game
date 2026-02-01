
import React, { useState, useEffect } from 'react';
import { getSmartBuddyResponse } from '../services/geminiService';
import { MessageCircle, Sparkles, Lightbulb, Ghost, Send } from 'lucide-react';

interface Props {
  lastScore: number;
}

const GeminiBuddy: React.FC<Props> = ({ lastScore }) => {
  const [message, setMessage] = useState<string>("Salom bolajonim! Men Donishmand Boyo'g'liman. Sen bilan o'yin o'ynashdan juda xursandman! Bugun qanday yangiliklar o'rganamiz?");
  const [loading, setLoading] = useState(false);

  const fetchAIContent = async (type: 'riddle' | 'praise' | 'fact') => {
    setLoading(true);
    const text = await getSmartBuddyResponse(type, lastScore);
    setMessage(text);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl glass rounded-[50px] p-8 shadow-2xl border border-white/10 overflow-hidden relative group">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[80px]"></div>

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="relative shrink-0">
          <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full flex items-center justify-center text-7xl shadow-2xl border-4 border-white/20 animate-float relative overflow-hidden">
            <span className="relative z-10">🦉</span>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)] opacity-20 animate-pulse"></div>
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 p-3 rounded-full text-black shadow-lg animate-pulse">
            <Sparkles size={24} />
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-[35px] relative border border-white/10 shadow-inner">
            <div className="absolute -top-3 left-10 md:-left-3 md:top-10 w-6 h-6 bg-indigo-900/40 transform rotate-45 border-l border-t border-white/10"></div>
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-3 h-3 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="italic text-indigo-300 font-medium">Sehrli kitoblarni varaqlayapman...</span>
              </div>
            ) : (
              <p className="text-xl md:text-2xl font-medium text-white leading-relaxed whitespace-pre-wrap">
                {message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button 
              onClick={() => fetchAIContent('riddle')}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white py-4 px-6 rounded-2xl font-black transition-all hover:scale-[1.02] shadow-xl border-b-4 border-purple-900"
            >
              <Lightbulb size={22} className="text-yellow-300" /> Topishmoq
            </button>
            <button 
              onClick={() => fetchAIContent('fact')}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white py-4 px-6 rounded-2xl font-black transition-all hover:scale-[1.02] shadow-xl border-b-4 border-emerald-900"
            >
              <Ghost size={22} className="text-cyan-200" /> Qiziqarli fakt
            </button>
            <button 
              onClick={() => fetchAIContent('praise')}
              className="flex items-center justify-center gap-3 col-span-2 bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-500 hover:to-cyan-600 text-white py-4 px-6 rounded-2xl font-black transition-all hover:scale-[1.02] shadow-xl border-b-4 border-blue-900"
            >
              <Sparkles size={22} className="text-yellow-300" /> Meni maqtab qo'y
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiBuddy;
