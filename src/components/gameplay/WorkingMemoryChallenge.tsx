import React, { useState, useEffect, useRef } from 'react';
import { CognitiveChallenge } from '../../types/game';
import { ScoreCalculationResult } from '../../services/scoring';
import { Eye, Brain, CheckCircle2, XCircle, Lightbulb, ArrowRight, Zap, Award } from 'lucide-react';

interface WorkingMemoryChallengeProps {
  challenge: CognitiveChallenge;
  isAnswered: boolean;
  selectedAnswer: string | null;
  scoreBreakdown?: ScoreCalculationResult | null;
  onSelectOption: (option: string) => void;
  onNextChallenge: () => void;
  isLastChallenge: boolean;
}

export const WorkingMemoryChallenge: React.FC<WorkingMemoryChallengeProps> = ({
  challenge,
  isAnswered,
  selectedAnswer,
  scoreBreakdown,
  onSelectOption,
  onNextChallenge,
  isLastChallenge,
}) => {
  const config = challenge.memoryConfig;
  const [phase, setPhase] = useState<'memorize' | 'recall'>('memorize');
  const [timeRemainingMs, setTimeRemainingMs] = useState(config?.displayDurationMs || 4000);
  const totalDurationMs = config?.displayDurationMs || 4000;
  const intervalRef = useRef<number | null>(null);

  // Handle countdown during memorization phase
  useEffect(() => {
    setPhase('memorize');
    setTimeRemainingMs(totalDurationMs);

    const stepMs = 50;
    intervalRef.current = window.setInterval(() => {
      setTimeRemainingMs((prev) => {
        if (prev <= stepMs) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase('recall');
          return 0;
        }
        return prev - stepMs;
      });
    }, stepMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [challenge.id, totalDurationMs]);

  // If already answered, make sure we are in recall phase
  useEffect(() => {
    if (isAnswered) {
      setPhase('recall');
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isAnswered]);

  const handleSkipMemorize = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeRemainingMs(0);
    setPhase('recall');
  };

  const isCorrect = selectedAnswer === challenge.correctAnswer;
  const options = challenge.options || [];
  const percentLeft = Math.max(0, Math.round((timeRemainingMs / totalDurationMs) * 100));

  return (
    <div className="w-full space-y-6">
      {/* Memorization Phase */}
      {phase === 'memorize' && !isAnswered && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-purple-500/40 shadow-2xl text-center space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs text-purple-300">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <Eye className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Phase 1: Memorization</span>
            </span>
            <span className="font-mono-numbers font-semibold">
              {(timeRemainingMs / 1000).toFixed(1)}s remaining
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-75"
              style={{ width: `${percentLeft}%` }}
            />
          </div>

          <div className="text-sm text-slate-300">
            Commit the sequence below to active working memory:
          </div>

          {/* Memory Items Stream */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4">
            {config?.items.map((item, idx) => (
              <div
                key={idx}
                className="w-12 h-14 sm:w-16 sm:h-20 rounded-xl bg-slate-950 border-2 border-purple-500/60 shadow-lg shadow-purple-950/50 flex flex-col items-center justify-center text-2xl sm:text-3xl font-extrabold font-mono-numbers text-white"
              >
                <span>{item}</span>
                <span className="text-[10px] font-sans text-purple-400/80 font-normal">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSkipMemorize}
              className="text-xs text-purple-300 hover:text-white px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-colors"
            >
              I have memorized it (Ready to Recall) →
            </button>
          </div>
        </div>
      )}

      {/* Recall / Manipulation Phase */}
      {(phase === 'recall' || isAnswered) && (
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>Phase 2: Working Memory Manipulation</span>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30">
            <h2 className="text-base sm:text-lg font-bold text-white mb-1">
              {config?.promptInstructions || challenge.prompt}
            </h2>
            <p className="text-xs text-slate-300">
              Transform the stored mental sequence according to the rule above.
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {options.map((option, idx) => {
              const isThisSelected = selectedAnswer === option;
              const isThisCorrect = challenge.correctAnswer === option;

              let style =
                'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 hover:border-purple-500/60 text-slate-100';
              if (isAnswered) {
                if (isThisCorrect) {
                  style = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30';
                } else if (isThisSelected && !isThisCorrect) {
                  style = 'bg-rose-950/80 border-rose-500 text-rose-100 ring-2 ring-rose-500/30';
                } else {
                  style = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-50 cursor-default';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => !isAnswered && onSelectOption(option)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${style}`}
                >
                  <span className="block text-sm sm:text-base font-bold font-mono-numbers mb-1">
                    {option}
                  </span>
                  <span className="text-[11px] text-slate-400">Option {idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Answer Breakdown when answered */}
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
                    {isCorrect ? 'Correct! Flawless mental manipulation.' : 'Recall inaccurate.'}
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
                      Original Sequence & Manipulation Rule:
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed font-mono-numbers">
                      Original: [{config?.items.join(' - ')}]
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed mt-1">
                      {challenge.explanation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={onNextChallenge}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 active:scale-95"
                >
                  <span>{isLastChallenge ? 'Complete Session' : 'Next Challenge'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
