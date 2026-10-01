import React from 'react';
import { QuestionResult } from '../types/game';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  results: QuestionResult[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  results,
}) => {
  const progressPercent = Math.min(100, Math.round(((currentIndex) / totalQuestions) * 100));

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Question <strong className="text-white font-semibold">{currentIndex + 1}</strong> of {totalQuestions}</span>
        </span>
        <span className="font-mono-numbers">{progressPercent}% Completed</span>
      </div>

      {/* Main continuous progress track */}
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step dot indicators for each question */}
      <div className="flex items-center justify-between gap-1 pt-1">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const result = results[idx];
          const isCurrent = idx === currentIndex;
          const isAnswered = result !== undefined;

          let statusClass = 'bg-slate-800 border-slate-700 text-slate-500';
          if (isAnswered) {
            if (result.isCorrect) {
              statusClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm shadow-emerald-500/20';
            } else {
              statusClass = 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-sm shadow-rose-500/20';
            }
          } else if (isCurrent) {
            statusClass = 'bg-indigo-500/20 border-indigo-400 text-indigo-300 ring-2 ring-indigo-500/40 ring-offset-1 ring-offset-slate-900';
          }

          return (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-sm border transition-all duration-200 ${statusClass}`}
              title={`Question ${idx + 1}${isAnswered ? (result.isCorrect ? ': Correct' : ': Incorrect') : isCurrent ? ': Active' : ''}`}
            />
          );
        })}
      </div>
    </div>
  );
};
