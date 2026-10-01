import React from 'react';
import { Flame, Target, Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  currentStreak: number;
  accuracy: number;
  lastPointsEarned?: number | null;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  currentStreak,
  accuracy,
  lastPointsEarned,
}) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Current Score */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 shadow-inner">
        <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Score</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold font-mono-numbers text-white">{score}</span>
            {lastPointsEarned !== undefined && lastPointsEarned !== null && lastPointsEarned > 0 && (
              <span className="text-xs font-semibold text-emerald-400 animate-bounce">
                +{lastPointsEarned}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
        currentStreak >= 3
          ? 'bg-orange-500/10 border-orange-500/40 text-orange-300'
          : currentStreak > 0
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        <Flame className={`w-4 h-4 ${currentStreak >= 3 ? 'text-orange-400 animate-pulse fill-orange-400/50' : currentStreak > 0 ? 'text-amber-400' : 'text-slate-500'}`} />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Streak</span>
          <span className="text-base font-bold font-mono-numbers">{currentStreak}</span>
        </div>
      </div>

      {/* Accuracy */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
        <Target className="w-4 h-4 text-cyan-400 shrink-0" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Accuracy</span>
          <span className="text-base font-bold font-mono-numbers">{accuracy}%</span>
        </div>
      </div>
    </div>
  );
};
