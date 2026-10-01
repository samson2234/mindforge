import React from 'react';
import { Check, X } from 'lucide-react';

interface AnswerOptionProps {
  option: string;
  index: number;
  selectedAnswer: string | null;
  correctAnswer: string | null;
  isAnswered: boolean;
  onSelect: (option: string) => void;
}

const KEY_LABELS = ['A', 'B', 'C', 'D'];
const NUM_LABELS = ['1', '2', '3', '4'];

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  option,
  index,
  selectedAnswer,
  correctAnswer,
  isAnswered,
  onSelect,
}) => {
  const isSelected = selectedAnswer === option;
  const isCorrect = correctAnswer === option;

  // Determine styling based on response state
  let buttonStyle = 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/80 text-white hover:border-indigo-500/60 active:scale-[0.99]';
  let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

  if (isAnswered) {
    if (isCorrect) {
      buttonStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/40';
      badgeStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold';
    } else if (isSelected && !isCorrect) {
      buttonStyle = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/40';
      badgeStyle = 'bg-rose-500 text-white border-rose-400 font-bold';
    } else {
      buttonStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50 cursor-default';
      badgeStyle = 'bg-slate-900 text-slate-600 border-slate-800';
    }
  }

  return (
    <button
      type="button"
      onClick={() => !isAnswered && onSelect(option)}
      disabled={isAnswered}
      className={`group relative flex items-center justify-between w-full min-h-[4.25rem] px-5 py-3.5 rounded-xl border text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${buttonStyle}`}
      aria-label={`Option ${KEY_LABELS[index]}: ${option}`}
    >
      <div className="flex items-center gap-4">
        {/* Key indicator (A / 1) */}
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono-numbers font-semibold border transition-colors ${badgeStyle}`}
        >
          {KEY_LABELS[index]}
        </span>

        {/* Option value */}
        <span className="text-xl sm:text-2xl font-bold font-mono-numbers tracking-tight">
          {option}
        </span>
      </div>

      {/* Status icon & label when answered */}
      <div className="flex items-center gap-2">
        {isAnswered && isCorrect && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/40">
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Correct</span>
          </span>
        )}

        {isAnswered && isSelected && !isCorrect && (
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/40">
            <X className="w-4 h-4 stroke-[2.5]" />
            <span>Incorrect</span>
          </span>
        )}

        {!isAnswered && (
          <span className="hidden sm:inline-block text-[11px] font-mono-numbers text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
            Press [{NUM_LABELS[index]}]
          </span>
        )}
      </div>
    </button>
  );
};
