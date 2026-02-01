
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Apple, Star, Timer, Trophy, Banana, Cherry, Target, Keyboard } from 'lucide-react';

interface Fruit {
  id: number;
  x: number;
  y: number;
  type: string;
  speed: number;
}

const FRUIT_TYPES = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍇'];

const FruitCatcher: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [basketX, setBasketX] = useState(50); // percentage
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const gameRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const spawnFruit = useCallback(() => {
    const newFruit: Fruit = {
      id: Date.now() + Math.random(),
      x: Math.random() * 90 + 5,
      y: -10,
      type: FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)],
      speed: 2 + Math.random() * 3,
    };
    setFruits(prev => [...prev, newFruit]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawner = setInterval(spawnFruit, 800);

    // Keyboard support initialization
    const handleKeyDown = (e: KeyboardEvent) => { keysPressed.current[e.key] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current[e.key] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [score, spawnFruit, onComplete]);

  const updateGame = useCallback(() => {
    // Smooth keyboard movement
    setBasketX(prev => {
      let next = prev;
      const speed = 1.5;
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['a'] || keysPressed.current['A']) {
        next = Math.max(prev - speed, 5);
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['d'] || keysPressed.current['D']) {
        next = Math.min(prev + speed, 95);
      }
      return next;
    });

    setFruits(prevFruits => {
      return prevFruits
        .map(f => ({ ...f, y: f.y + f.speed }))
        .filter(f => {
          // Catch logic: using current basketX within the setter logic is tricky, 
          // but we use the state from the last render or a ref if needed. 
          // For simplicity, we compare with the current basketX state.
          if (f.y > 85 && f.y < 95 && Math.abs(f.x - basketX) < 10) {
            setScore(s => s + 5);
            return false;
          }
          return f.y < 105; 
        });
    });
    requestRef.current = requestAnimationFrame(updateGame);
  }, [basketX]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updateGame]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameRef.current) return;
    const rect = gameRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.min(Math.max(x, 5), 95));
  };

  return (
    <div 
      ref={gameRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="relative w-full max-w-xl h-[500px] glass rounded-[40px] overflow-hidden select-none border-2 border-cyan-500/30 shadow-2xl"
    >
      {/* HUD */}
      <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
        <div className="bg-indigo-600/80 px-4 py-2 rounded-2xl flex items-center gap-2 border border-indigo-400 backdrop-blur-md">
          <Trophy className="text-yellow-400" size={20} />
          <span className="font-bold text-xl">{score}</span>
        </div>
        <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 border backdrop-blur-md ${timeLeft < 10 ? 'bg-red-600/80 border-red-400 animate-pulse' : 'bg-cyan-600/80 border-cyan-400'}`}>
          <Timer size={20} />
          <span className="font-bold text-xl">{timeLeft}s</span>
        </div>
      </div>

      {/* Fruits */}
      {fruits.map(fruit => (
        <div
          key={fruit.id}
          className="absolute text-4xl transform -translate-x-1/2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          style={{ left: `${fruit.x}%`, top: `${fruit.y}%` }}
        >
          {fruit.type}
        </div>
      ))}

      {/* Basket */}
      <div 
        className="absolute bottom-4 h-16 w-24 bg-gradient-to-t from-orange-600 to-orange-400 rounded-b-xl rounded-t-md transform -translate-x-1/2 flex items-center justify-center border-t-4 border-orange-300 shadow-[0_0_20px_rgba(251,146,60,0.4)]"
        style={{ left: `${basketX}%` }}
      >
        <div className="text-3xl">🧺</div>
        <div className="absolute -top-4 w-full h-2 bg-orange-200/20 rounded-full"></div>
      </div>

      {/* Instructions */}
      {score === 0 && timeLeft > 25 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-lg p-8 rounded-3xl text-center border border-white/10 scale-in-center">
            <Target className="mx-auto mb-4 text-cyan-400 animate-ping" size={40} />
            <p className="text-2xl font-bold mb-2">Mevalarni tutib ol!</p>
            <div className="flex flex-col gap-2 opacity-90">
              <div className="flex items-center justify-center gap-2">
                <Keyboard size={18} className="text-indigo-400" />
                <p>⬅️ ➡️ yoki A / D tugmalari</p>
              </div>
              <p className="text-sm">Sichqoncha yoki barmoq ham ishlaydi</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FruitCatcher;
