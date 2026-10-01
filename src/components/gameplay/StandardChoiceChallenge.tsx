import React from 'react';
import { CognitiveChallenge } from '../../types/game';
import { ScoreCalculationResult } from '../../services/scoring';
import { CheckCircle2, XCircle, Lightbulb, Zap, Award, ArrowRight } from 'lucide-react';

interface StandardChoiceChallengeProps {
  challenge: CognitiveChallenge;
  isAnswered: boolean;
  selectedAnswer: string | null;
  scoreBreakdown?: ScoreCalculationResult | null;
  onSelectOption: (option: string) => void;
  onNextChallenge: () => void;
  isLastChallenge: boolean;
}

const KEY_LABELS = ['A', 'B', 'C', 'D'];
const NUM_LABELS = ['1', '2', '3', '4'];

export const StandardChoiceChallenge: React.FC<StandardChoiceChallengeProps> = ({
  challenge,
  isAnswered,
  selectedAnswer,
  scoreBreakdown,
  onSelectOption,
  onNextChallenge,
  isLastChallenge,
}) => {
  const isCorrect = selectedAnswer === challenge.correctAnswer;
  const options = challenge.options || [];

  return (
    <div className="w-full space-y-6">
      {/* Context Card (if present) */}
      {challenge.contextInfo && (
        <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-2">
            Context & Premises
          </div>
          <div className="text-sm sm:text-base whitespace-pre-line leading-relaxed font-sans text-slate-100">
            {challenge.contextInfo}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <h2 className="text-base sm:text-xl font-bold text-white mb-2 leading-snug">
          {challenge.prompt}
        </h2>

        {/* Four Answer Options */}
        <div className="grid grid-cols-1 gap-3 mt-5">
          {options.map((option, idx) => {
            const isThisSelected = selectedAnswer === option;
            const isThisCorrect = challenge.correctAnswer === option;

            let buttonStyle =
              'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 hover:border-indigo-500/60 text-slate-100';
            let badgeStyle = 'bg-slate-800 text-slate-400 border-slate-700';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle =
                  'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30';
                badgeStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold';
              } else if (isThisSelected && !isThisCorrect) {
                buttonStyle =
                  'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/30';
                badgeStyle = 'bg-rose-500 text-white border-rose-400 font-bold';
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-50 cursor-default';
                badgeStyle = 'bg-slate-900 text-slate-600 border-slate-800';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => !isAnswered && onSelectOption(option)}
                disabled={isAnswered}
                className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${buttonStyle}`}
              >
                <div className="flex items-start gap-3.5 flex-1 pr-2">
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono-numbers font-semibold border shrink-0 ${badgeStyle}`}
                  >
                    {KEY_LABELS[idx]}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-relaxed">
                    {option}
                  </span>
                </div>

                {!isAnswered && (
                  <span className="hidden sm:inline-block text-[11px] font-mono-numbers text-slate-500 shrink-0">
                    [{NUM_LABELS[idx]}]
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Verdict & Explanation Banner */}
        {isAnswered && (
          <div
            className={`rounded-xl border p-4 sm:p-5 mt-6 transition-all duration-200 ${
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
                  {isCorrect ? 'Correct! Strong cognitive deduction.' : 'Incorrect response.'}
                </span>
              </div>

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

            <div className="pt-3">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block mb-0.5">
                    Cognitive Law & Explanation:
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {challenge.explanation}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm font-semibold text-white mt-1.5">
                      Correct Answer:{' '}
                      <span className="text-emerald-400 underline underline-offset-2">
                        {challenge.correctAnswer}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={onNextChallenge}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95"
              >
                <span>{isLastChallenge ? 'Complete Session' : 'Next Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-mono-numbers opacity-80 pl-1 border-l border-white/20">
                  [Space / Enter]
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
