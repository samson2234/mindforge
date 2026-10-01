import React from 'react';
import { Difficulty, UserStats } from '../types/game';
import { Zap, ShieldCheck, Flame, Trophy } from 'lucide-react';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  userStats: UserStats;
}

interface DifficultyOption {
  id: Difficulty;
  label: string;
  badge: string;
  basePoints: number;
  description: string;
  icon: React.ElementType;
  activeColor: string;
  borderColor: string;
}

const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    id: 'easy',
    label: 'Easy',
    badge: 'Warm-up',
    basePoints: 100,
    description: 'Direct arithmetic progressions, doubling, linear decreases, and consecutive squares.',
    icon: ShieldCheck,
    activeColor: 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30 text-emerald-400',
    borderColor: 'border-slate-800 hover:border-emerald-500/50',
  },
  {
    id: 'medium',
    label: 'Medium',
    badge: 'Balanced',
    basePoints: 150,
    description: 'Alternating operators (+/− and ×/÷), Fibonacci steps, prime numbers, and alphabetical shifts.',
    icon: Zap,
    activeColor: 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/30 text-amber-400',
    borderColor: 'border-slate-800 hover:border-amber-500/50',
  },
  {
    id: 'hard',
    label: 'Hard',
    badge: 'Challenger',
    basePoints: 200,
    description: 'Interleaved dual sequences, exponential compounds, digital sum additions, and second-order squares.',
    icon: Flame,
    activeColor: 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/30 text-rose-400',
    borderColor: 'border-slate-800 hover:border-rose-500/50',
  },
];

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
  userStats,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs uppercase tracking-wider font-bold text-slate-300">
          Select Difficulty
        </label>
        <span className="text-xs text-slate-500">10 Questions per session</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DIFFICULTY_OPTIONS.map((item) => {
          const isSelected = selectedDifficulty === item.id;
          const bestScore = userStats.bestScoreByDifficulty?.[item.id] || 0;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectDifficulty(item.id)}
              className={`relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                isSelected ? item.activeColor : `bg-slate-900/70 text-slate-200 ${item.borderColor}`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-current' : 'text-slate-400'}`} />
                    <span className="font-bold text-base text-white">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono-numbers">
                  Base: <strong className="text-slate-200">{item.basePoints} pts</strong>
                </span>

                <div className="flex items-center gap-1 text-slate-400 font-mono-numbers">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <span>Best: <strong className="text-white">{bestScore}</strong></span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
