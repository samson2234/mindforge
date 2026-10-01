import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CognitiveChallenge } from '../../types/game';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, Zap, Play } from 'lucide-react';

interface SustainedAttentionChallengeProps {
  challenge: CognitiveChallenge;
  isAnswered: boolean;
  onCompleteAttention: (hits: number, misses: number, falseAlarms: number, avgLatencyMs: number) => void;
  onNextChallenge: () => void;
  isLastChallenge: boolean;
}

export const SustainedAttentionChallenge: React.FC<SustainedAttentionChallengeProps> = ({
  challenge,
  isAnswered,
  onCompleteAttention,
  onNextChallenge,
  isLastChallenge,
}) => {
  const config = challenge.attentionConfig;
  const trials = config?.trials || [];
  const trialDurationMs = config?.trialDurationMs || 1000;

  const [gameState, setGameState] = useState<'ready' | 'running' | 'finished'>('ready');
  const [currentTrialIdx, setCurrentTrialIdx] = useState(0);
  const [hasRespondedCurrent, setHasRespondedCurrent] = useState(false);

  // Performance metrics
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [falseAlarms, setFalseAlarms] = useState(0);
  const [latencies, setLatencies] = useState<number[]>([]);

  const trialStartTimeRef = useRef<number>(Date.now());
  const trialTimerRef = useRef<number | null>(null);

  // Start trial run
  const handleStartRun = () => {
    setGameState('running');
    setCurrentTrialIdx(0);
    setHits(0);
    setMisses(0);
    setFalseAlarms(0);
    setLatencies([]);
    setHasRespondedCurrent(false);
    trialStartTimeRef.current = Date.now();
  };

  const finishTrialRun = useCallback(
    (finalHits: number, finalMisses: number, finalFA: number, finalLatencies: number[]) => {
      setGameState('finished');
      if (trialTimerRef.current) clearInterval(trialTimerRef.current);

      const avgLat =
        finalLatencies.length > 0
          ? Math.round(finalLatencies.reduce((a, b) => a + b, 0) / finalLatencies.length)
          : 0;

      onCompleteAttention(finalHits, finalMisses, finalFA, avgLat);
    },
    [onCompleteAttention]
  );

  // Advance each trial every trialDurationMs
  useEffect(() => {
    if (gameState !== 'running') return;

    trialStartTimeRef.current = Date.now();
    setHasRespondedCurrent(false);

    trialTimerRef.current = window.setTimeout(() => {
      // Check if current trial was a target and was missed
      const current = trials[currentTrialIdx];
      let newMisses = misses;
      if (current && current.isTarget && !hasRespondedCurrent) {
        newMisses += 1;
        setMisses(newMisses);
      }

      if (currentTrialIdx >= trials.length - 1) {
        finishTrialRun(hits, newMisses, falseAlarms, latencies);
      } else {
        setCurrentTrialIdx((prev) => prev + 1);
      }
    }, trialDurationMs);

    return () => {
      if (trialTimerRef.current) clearTimeout(trialTimerRef.current);
    };
  }, [
    gameState,
    currentTrialIdx,
    trials,
    trialDurationMs,
    hasRespondedCurrent,
    hits,
    misses,
    falseAlarms,
    latencies,
    finishTrialRun,
  ]);

  // Handle user response button or spacebar
  const handleRegisterResponse = useCallback(() => {
    if (gameState !== 'running' || hasRespondedCurrent) return;

    const reactionTime = Date.now() - trialStartTimeRef.current;
    const current = trials[currentTrialIdx];
    setHasRespondedCurrent(true);

    if (current && current.isTarget) {
      // Hit!
      setHits((h) => h + 1);
      setLatencies((l) => [...l, reactionTime]);
    } else {
      // False alarm!
      setFalseAlarms((fa) => fa + 1);
    }
  }, [gameState, hasRespondedCurrent, trials, currentTrialIdx]);

  // Spacebar listener for lightning fast reaction
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'ready') {
          handleStartRun();
        } else if (gameState === 'running') {
          handleRegisterResponse();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, handleRegisterResponse]);

  const currentTrial = trials[currentTrialIdx];
  const totalTargets = trials.filter((t) => t.isTarget).length;
  const trialProgress = Math.round(((currentTrialIdx + 1) / Math.max(1, trials.length)) * 100);

  return (
    <div className="w-full space-y-6">
      {/* Target Definition Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
            Sustained Vigilance Rule:
          </span>
          <p className="text-sm sm:text-base font-semibold text-white">
            {config?.targetDescription || challenge.prompt}
          </p>
          <span className="text-xs text-slate-400 mt-1 block">
            Tap TARGET (or press SPACE) as soon as the target appears. Ignore all distractors.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-center px-4 py-2 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Target</span>
            <span className={`text-2xl font-bold ${config?.targetColor || 'text-rose-400'}`}>
              {config?.targetSymbol || '★'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Stimulus Window */}
      {gameState === 'ready' && !isAnswered && (
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
            <Target className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Rapid Stimulus Series ({trials.length} trials)</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Stimuli will flash consecutively every {(trialDurationMs / 1000).toFixed(1)}s. Maintain high vigilance and react quickly to target appearances.
          </p>
          <button
            type="button"
            onClick={handleStartRun}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Vigilance Series [Space]</span>
          </button>
        </div>
      )}

      {gameState === 'running' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-6">
          {/* Header Progress */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Trial <strong className="text-white">{currentTrialIdx + 1}</strong> of {trials.length}
            </span>
            <span className="font-mono-numbers">{trialProgress}%</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-rose-500 transition-all duration-100"
              style={{ width: `${trialProgress}%` }}
            />
          </div>

          {/* Active Stimulus Display */}
          <div className="py-8 flex items-center justify-center">
            {currentTrial && (
              <div
                className={`w-32 h-32 rounded-3xl bg-slate-950 border-2 border-slate-800 flex items-center justify-center text-6xl font-extrabold select-none shadow-inner transition-transform active:scale-95 ${
                  currentTrial.color
                } ${hasRespondedCurrent ? 'ring-4 ring-rose-500/50' : ''}`}
              >
                {currentTrial.symbol}
              </div>
            )}
          </div>

          {/* Response Trigger Button */}
          <button
            type="button"
            onClick={handleRegisterResponse}
            disabled={hasRespondedCurrent}
            className={`w-full max-w-md mx-auto py-5 rounded-2xl font-extrabold text-lg sm:text-xl tracking-wider uppercase transition-all shadow-xl select-none ${
              hasRespondedCurrent
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-default'
                : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-rose-600/30 active:scale-95'
            }`}
          >
            {hasRespondedCurrent ? 'Response Registered' : 'TARGET DETECTED [SPACE]'}
          </button>
        </div>
      )}

      {/* Completion Metrics & Summary */}
      {(gameState === 'finished' || isAnswered) && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Sustained Vigilance Run Complete</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Target Hits</span>
              <span className="text-2xl font-bold font-mono-numbers text-emerald-400">
                {hits}
                <span className="text-sm font-normal text-slate-500"> / {totalTargets}</span>
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Missed Targets</span>
              <span className="text-2xl font-bold font-mono-numbers text-rose-400">
                {misses}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">False Alarms</span>
              <span className="text-2xl font-bold font-mono-numbers text-amber-400">
                {falseAlarms}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Avg Latency</span>
              <span className="text-2xl font-bold font-mono-numbers text-cyan-400">
                {latencies.length > 0
                  ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
                  : 0}
                ms
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic border-t border-slate-800 pt-3">
            {challenge.explanation}
          </p>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onNextChallenge}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400 active:scale-95"
            >
              <span>{isLastChallenge ? 'Complete Session' : 'Next Challenge'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
