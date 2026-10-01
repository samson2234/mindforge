import React, { useState } from 'react';
import { CognitiveChallenge } from '../../types/game';
import { ScoreCalculationResult } from '../../services/scoring';
import { Boxes, CheckCircle2, XCircle, Lightbulb, ArrowRight, Zap, Award, Sliders } from 'lucide-react';

interface ProblemSolvingChallengeProps {
  challenge: CognitiveChallenge;
  isAnswered: boolean;
  selectedAnswer: string | null;
  scoreBreakdown?: ScoreCalculationResult | null;
  onSelectOption: (option: string) => void;
  onNextChallenge: () => void;
  isLastChallenge: boolean;
}

export const ProblemSolvingChallenge: React.FC<ProblemSolvingChallengeProps> = ({
  challenge,
  isAnswered,
  selectedAnswer,
  scoreBreakdown,
  onSelectOption,
  onNextChallenge,
  isLastChallenge,
}) => {
  const config = challenge.problemSolvingConfig;
  const isCorrect = selectedAnswer === challenge.correctAnswer;
  const options = challenge.options || [];

  return (
    <div className="w-full space-y-6">
      {/* Scenario & Constraints Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Boxes className="w-4 h-4 text-amber-400" />
          <span>Multi-Step Constraint & Resource Optimization</span>
        </div>

        <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
          {challenge.contextInfo || challenge.prompt}
        </p>

        {config?.constraints && (
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
            <span className="font-bold text-amber-300 uppercase tracking-wider block">
              Active Constraints:
            </span>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {config.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Decision Selection Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4">
          {challenge.prompt}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {options.map((option, idx) => {
            const isThisSelected = selectedAnswer === option;
            const isThisCorrect = challenge.correctAnswer === option;

            let style =
              'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 hover:border-amber-500/60 text-slate-100';

            if (isAnswered) {
              if (isThisCorrect) {
                style =
                  'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30';
              } else if (isThisSelected && !isThisCorrect) {
                style =
                  'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/30';
              } else {
                style =
                  'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-50 cursor-default';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => !isAnswered && onSelectOption(option)}
                disabled={isAnswered}
                className={`flex items-start justify-between p-4 rounded-xl border text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${style}`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-800 text-slate-400 text-xs font-mono-numbers shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-relaxed">
                    {option}
                  </span>
                </div>
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
                  {isCorrect ? 'Optimal Strategy Achieved!' : 'Suboptimal Strategy Selected.'}
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
                </div>
              )}
            </div>

            <div className="pt-3">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-300 block mb-0.5">
                    Constraint Analysis & Mathematical Optimum:
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {challenge.explanation}
                  </p>
                  {config?.optimalSolutionSummary && (
                    <p className="text-xs font-mono-numbers text-amber-300 mt-2 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                      Summary: {config.optimalSolutionSummary}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={onNextChallenge}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-lg shadow-amber-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-95"
              >
                <span>{isLastChallenge ? 'Complete Session' : 'Next Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
