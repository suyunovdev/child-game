
import React, { useState, useEffect, useCallback } from 'react';
import { MathQuestion } from '../types';
import { Calculator, Star, CheckCircle, XCircle, Zap } from 'lucide-react';

const MathGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * 12) + 1;
    const num2 = Math.floor(Math.random() * 12) + 1;
    const operators = ['+', '-'];
    const op = operators[Math.floor(Math.random() * operators.length)];
    
    let ans = 0;
    let text = "";
    if (op === '+') {
      ans = num1 + num2;
      text = `${num1} + ${num2}`;
    } else {
      const n1 = Math.max(num1, num2);
      const n2 = Math.min(num1, num2);
      ans = n1 - n2;
      text = `${n1} - ${n2}`;
    }

    const options = new Set<number>();
    options.add(ans);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) - 5;
      const fake = Math.max(0, ans + (offset === 0 ? 1 : offset));
      options.add(fake);
    }

    setQuestion({
      question: text,
      answer: ans,
      options: Array.from(options).sort(() => Math.random() - 0.5),
    });
    setFeedback(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (val: number) => {
    if (feedback) return;

    if (val === question?.answer) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (round < 5) {
        setRound(r => r + 1);
        generateQuestion();
      } else {
        onComplete(score + (val === question?.answer ? 10 : 0));
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center p-8 glass rounded-[50px] shadow-2xl max-w-md w-full mx-auto border border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-between w-full mb-10">
        <div className="bg-yellow-500/20 px-5 py-2 rounded-full flex items-center gap-2 border border-yellow-500/30">
          <Star className="text-yellow-400 fill-yellow-400 animate-pulse" size={18} />
          <span className="font-black text-xl text-yellow-200">{score}</span>
        </div>
        <div className="bg-indigo-500/20 px-5 py-2 rounded-full font-black text-indigo-200 border border-indigo-500/30 flex items-center gap-2">
          <Zap size={18} className="text-indigo-400" />
          Raund: {round}/5
        </div>
      </div>

      <div className="text-center mb-12">
        <p className="text-indigo-300 text-sm uppercase tracking-[0.2em] font-bold mb-4">Hisobla</p>
        <div className="text-6xl font-black text-white neon-text-cyan tracking-tighter">
          {question?.question} = ?
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-full">
        {question?.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={!!feedback}
            className={`py-8 rounded-3xl text-3xl font-black transition-all transform hover:scale-[1.05] active:scale-95 shadow-xl border-b-4
              ${feedback === 'correct' && opt === question.answer ? 'bg-green-500 border-green-700 text-white scale-110 z-10' : 
                feedback === 'wrong' && opt !== question.answer ? 'bg-slate-800 border-slate-900 text-slate-500 opacity-50' :
                feedback === 'wrong' && opt === question.answer ? 'bg-green-500/50 border-green-600 animate-pulse text-white' :
                'bg-indigo-600 border-indigo-800 text-white hover:bg-indigo-500'}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="h-16 mt-8 flex items-center justify-center">
        {feedback && (
          <div className="flex items-center gap-3 animate-bounce">
            {feedback === 'correct' ? (
              <div className="flex items-center bg-green-500/20 text-green-400 px-6 py-3 rounded-2xl font-black gap-2 border border-green-500/30">
                <CheckCircle /> Barakalla!
              </div>
            ) : (
              <div className="flex items-center bg-red-500/20 text-red-400 px-6 py-3 rounded-2xl font-black gap-2 border border-red-500/30">
                <XCircle /> Keyingi safar!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MathGame;
