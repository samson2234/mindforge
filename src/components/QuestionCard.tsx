import React from 'react';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb, Zap, Award } from 'lucide-react';
import { Question } from '../types/game';
import { ScoreCalculationResult } from '../services/scoring';

interface QuestionCardProps {
  question: Question;
  isAnswered: boolean;
  selectedAnswer: string | null;
  scoreBreakdown?: ScoreCalculationResult | null;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isAnswered,
  selectedAnswer,
  scoreBreakdown,
  onNextQuestion,
  isLastQuestion,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  // Split sequence items by arrows for distinct token styling
  const sequenceTokens = question.question.split('→').map((t: string) => t.trim());

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-xl shadow-black/40">
      {/* Header category & difficulty */}
      <div className="flex items-center justify-between gap-2 mb-5">
        <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
          {question.category || 'Pattern Recognition'}
        </span>
        <span
          className={`text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
            question.difficulty === 'easy'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : question.difficulty === 'medium'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}
        >
          {question.difficulty}
        </span>
      </div>

      {/* Sequence visualizer */}
      <div className="mb-6">
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          Identify the pattern:
        </div>
        <div className="p-4 sm:p-6 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          {sequenceTokens.map((token: string, idx: number) => {
            const isTarget = token === '?';
            const isLast = idx === sequenceTokens.length - 1;

            return (
              <React.Fragment key={idx}>
                <span
                  className={`font-mono-numbers px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xl sm:text-2xl font-bold tracking-wider transition-all ${
                    isTarget
                      ? isAnswered
                        ? isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500 shadow-md shadow-emerald-500/20'
                          : 'bg-rose-500/20 text-rose-300 border-2 border-rose-500 shadow-md shadow-rose-500/20'
                        : 'bg-indigo-600/30 text-indigo-300 border-2 border-dashed border-indigo-400 animate-pulse'
                      : 'bg-slate-900 border border-slate-700/80 text-slate-100 shadow-sm'
                  }`}
                >
                  {isTarget && isAnswered ? question.correctAnswer : token}
                </span>

                {!isLast && (
                  <span className="text-slate-600 text-lg font-bold select-none">
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Answer Verdict & Explanation Banner when answered */}
      {isAnswered && (
        <div
          className={`rounded-xl border p-4 sm:p-5 mt-4 transition-all duration-200 ${
            isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span className="font-bold text-base sm:text-lg">
                {isCorrect ? 'Correct! Outstanding deduction.' : 'Incorrect.'}
              </span>
            </div>

            {/* Score points breakdown */}
            {scoreBreakdown && scoreBreakdown.totalPoints > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  <Award className="w-3.5 h-3.5" /> +{scoreBreakdown.basePoints} base
                </span>
                {scoreBreakdown.speedBonus > 0 && (
                  <span className="inline-flex items-center gap-1 font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30">
                    <Zap className="w-3.5 h-3.5" /> +{scoreBreakdown.speedBonus} speed
                  </span>
                )}
                {scoreBreakdown.streakBonus > 0 && (
                  <span className="inline-flex items-center gap-1 font-bold text-orange-300 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/30">
                    +{scoreBreakdown.streakBonus} streak
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="pt-3">
            <div className="flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block mb-0.5">
                  Pattern Rule & Explanation:
                </span>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {question.explanation}
                </p>
                {!isCorrect && (
                  <p className="text-sm font-semibold text-white mt-1.5">
                    Correct Answer:{' '}
                    <span className="font-mono-numbers text-emerald-400 underline underline-offset-2">
                      {question.correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Next Question CTA */}
          <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={onNextQuestion}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95"
            >
              <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-mono-numbers opacity-80 pl-1 border-l border-white/20">
                [Space / Enter]
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
