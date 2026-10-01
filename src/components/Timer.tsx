import React from 'react';
import { Timer as TimerIcon, Zap } from 'lucide-react';

interface TimerProps {
  elapsedSeconds: number;
  isAnswered: boolean;
}

export const Timer: React.FC<TimerProps> = ({ elapsedSeconds, isAnswered }) => {
  const isSuperFast = elapsedSeconds <= 2.5;
  const isSpeedBonusEligible = elapsedSeconds < 12.0;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
        isAnswered
          ? 'bg-slate-800/80 border-slate-700 text-slate-300'
          : isSuperFast
          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
          : isSpeedBonusEligible
          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
          : 'bg-slate-800/60 border-slate-700/80 text-slate-400'
      }`}
      aria-label={`Time elapsed: ${elapsedSeconds.toFixed(1)} seconds`}
    >
      <TimerIcon className={`w-3.5 h-3.5 ${!isAnswered ? 'animate-spin' : ''} ${isSuperFast && !isAnswered ? 'text-emerald-400' : 'text-slate-400'}`} style={{ animationDuration: '4s' }} />
      <span className="font-mono-numbers text-sm font-semibold tracking-wide">
        {elapsedSeconds.toFixed(1)}s
      </span>
      {!isAnswered && isSuperFast && (
        <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <Zap className="w-2.5 h-2.5 fill-emerald-400" /> Max Bonus
        </span>
      )}
    </div>
  );
};
