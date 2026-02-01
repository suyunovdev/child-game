
import React, { useState, useEffect } from 'react';
import { GameMode } from './types';
import MemoryGame from './components/MemoryGame';
import MathGame from './components/MathGame';
import FruitCatcher from './components/FruitCatcher';
import GeminiBuddy from './components/GeminiBuddy';
import { Brain, Calculator, MessageSquare, Home as HomeIcon, Star, Moon, Sparkles, ShoppingBasket, X } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode>(GameMode.HOME);
  const [lastScore, setLastScore] = useState(0);

  // Background Stars Effect
  useEffect(() => {
    const container = document.body;
    const existingStars = document.querySelectorAll('.star');
    if (existingStars.length === 0) {
      for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3;
        const duration = 2 + Math.random() * 3;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${duration}s`);
        container.appendChild(star);
      }
    }

    // Global Escape Handler
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode(GameMode.HOME);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleGameComplete = (score: number) => {
    setLastScore(score);
    setMode(GameMode.GEMINI_OWL);
  };

  const renderContent = () => {
    switch (mode) {
      case GameMode.MEMORY:
        return <MemoryGame onComplete={handleGameComplete} />;
      case GameMode.MATH:
        return <MathGame onComplete={handleGameComplete} />;
      case GameMode.FRUIT_CATCHER:
        return <FruitCatcher onComplete={handleGameComplete} />;
      case GameMode.GEMINI_OWL:
        return (
          <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in duration-500 max-w-4xl px-4">
            <div className="text-center">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2 neon-text-cyan">Ajoyib natija!</h2>
              <p className="text-xl text-indigo-200">Haqiqiy super qahramon kashf qilindi!</p>
            </div>
            <GeminiBuddy lastScore={lastScore} />
            <div className="flex gap-4 mt-4">
              <button 
                onClick={() => setMode(GameMode.HOME)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20 border border-indigo-400/30"
              >
                <HomeIcon size={20} /> Asosiy menyu
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4 pb-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="md:col-span-2 text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 flex items-center justify-center gap-4">
                <Sparkles className="text-yellow-400 animate-pulse" size={32} />
                Sehrli Sarguzashtlar
                <Sparkles className="text-yellow-400 animate-pulse" size={32} />
              </h2>
              <p className="text-indigo-200 text-lg opacity-80 max-w-2xl mx-auto">
                Xotirangni charxla, hisoblashni o'rgan va reaksiyangni sinab ko'r! 
                Qaysi o'yindan boshlaymiz?
              </p>
            </div>

            <GameCard 
              title="Xotira O'yini"
              desc="Juftliklarni topib, xotirangni kuchaytir!"
              icon={<Brain size={48} />}
              color="from-purple-600 to-indigo-900"
              emoji="🧠"
              onClick={() => setMode(GameMode.MEMORY)}
            />

            <GameCard 
              title="Zukko Matematik"
              desc="Raqamlar sehrini o'rgan va tez hisobla!"
              icon={<Calculator size={48} />}
              color="from-blue-600 to-cyan-900"
              emoji="🔢"
              onClick={() => setMode(GameMode.MATH)}
            />

            <GameCard 
              title="Meva Tutish"
              desc="Mevalarni yig'ib, reaksiyangni chiniqtir!"
              icon={<ShoppingBasket size={48} />}
              color="from-emerald-600 to-teal-900"
              emoji="🍎"
              onClick={() => setMode(GameMode.FRUIT_CATCHER)}
            />

            <GameCard 
              title="Aqlli Boyo'g'li"
              desc="AI do'sting bilan suhbatlash va bilim ol!"
              icon={<MessageSquare size={48} />}
              color="from-fuchsia-600 to-pink-900"
              emoji="🦉"
              onClick={() => setMode(GameMode.GEMINI_OWL)}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20 overflow-x-hidden relative selection:bg-cyan-500 selection:text-white">
      {/* Decorative gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="glass p-6 mb-12 sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setMode(GameMode.HOME)}>
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-3 rounded-2xl text-white shadow-lg group-hover:rotate-12 transition-all duration-300">
              <Moon className="fill-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter neon-text-cyan">ZUKKO BOLAJON</h1>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-transparent rounded-full transition-all duration-500"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {mode !== GameMode.HOME && (
              <button 
                onClick={() => setMode(GameMode.HOME)}
                className="bg-white/5 text-white p-3 rounded-2xl hover:bg-white/10 transition-all border border-white/10 glass flex items-center gap-2 px-4 group"
              >
                <HomeIcon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline font-bold">Chiqish (Esc)</span>
              </button>
            )}
            <div className="hidden md:flex bg-black/40 px-5 py-2 rounded-full border border-white/10 items-center gap-2 backdrop-blur-md">
              <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={16} />
              <span className="text-sm font-bold tracking-wide">MIDNIGHT PRO</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto flex flex-col items-center justify-center relative z-10 px-4">
        {renderContent()}
      </main>

      {/* Footer Decoration */}
      <footer className="fixed bottom-6 left-1/2 transform -translate-x-1/2 opacity-30 pointer-events-none text-xs font-bold tracking-widest text-indigo-300">
        &copy; 2025 ZUKKO BOLAJON O'YINLAR OLAMI
      </footer>
    </div>
  );
};

interface CardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  emoji: string;
  onClick: () => void;
}

const GameCard: React.FC<CardProps> = ({ title, desc, icon, color, emoji, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-gradient-to-br ${color} p-8 rounded-[40px] text-white cursor-pointer transform transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] shadow-2xl relative overflow-hidden group border border-white/10`}
  >
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 bg-white/10 w-fit p-5 rounded-[28px] backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-3xl font-black mb-3 tracking-tight">{title}</h3>
      <p className="text-lg opacity-70 leading-snug font-medium">{desc}</p>
      
      <div className="mt-8 flex items-center text-sm font-bold bg-black/20 w-fit px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-transform">
        O'YINNI BOSHLASH &rarr;
      </div>
    </div>
    
    <div className="absolute -bottom-10 -right-10 text-[180px] opacity-[0.07] group-hover:opacity-[0.12] group-hover:rotate-12 group-hover:scale-125 transition-all duration-700 pointer-events-none select-none">
      {emoji}
    </div>
    
    <div className="absolute top-8 right-8 p-3 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100 duration-500">
      <Sparkles size={20} className="text-yellow-300" />
    </div>
  </div>
);

export default App;
