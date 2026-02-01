
import React, { useState, useEffect, useCallback } from 'react';
import { MemoryCard } from '../types';
import { Brain, RotateCcw, Trophy, HelpCircle } from 'lucide-react';

const EMOJIS = ['🦁', '🦒', '🐘', '🐒', '🐯', '🦓', '🐼', '🐨', '🦊', '🐸', '🐙', '🐢'];

const MemoryGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const initGame = useCallback(() => {
    const selectedEmojis = EMOJIS.sort(() => Math.random() - 0.5).slice(0, 6);
    const pairs = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        content: emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(pairs);
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].content === cards[second].content) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatches(prev => {
            const newCount = prev + 1;
            if (newCount === 6) onComplete(Math.max(100 - moves, 10));
            return newCount;
          });
        }, 600);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="flex justify-between w-full max-w-md mb-8 glass p-6 rounded-[30px] border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">Yurishlar</span>
          <div className="flex items-center gap-2">
            <Brain className="text-cyan-400" />
            <span className="font-bold text-2xl">{moves}</span>
          </div>
        </div>
        <div className="h-12 w-[1px] bg-white/10"></div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">Topildi</span>
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-400" />
            <span className="font-bold text-2xl">{matches}/6</span>
          </div>
        </div>
        <button 
          onClick={initGame} 
          className="ml-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group"
          title="Qayta boshlash"
        >
          <RotateCcw size={24} className="text-white group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 md:grid-cols-4 max-w-lg w-full">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`aspect-[3/4] flex items-center justify-center text-4xl cursor-pointer rounded-3xl transition-all duration-500 transform preserve-3d
              ${card.isFlipped || card.isMatched ? 'rotate-y-180 bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-gradient-to-br from-indigo-600 to-purple-800 border-2 border-white/20 shadow-xl'}
              ${card.isMatched ? 'opacity-40 grayscale-0' : ''}
              hover:scale-105 active:scale-95`}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {card.isFlipped || card.isMatched ? (
                <span className="animate-in zoom-in duration-300">{card.content}</span>
              ) : (
                <HelpCircle className="text-white/40" size={32} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
