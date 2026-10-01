import React, { useState } from 'react';
import {
  Trophy,
  Target,
  Timer as TimerIcon,
  Flame,
  RotateCcw,
  Sliders,
  Home,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import { GameSessionStats, UserStats } from '../types/game';
import { getPerformanceSummary } from '../services/scoring';
import { getCategoryById } from '../data/categories';

interface ResultsScreenProps {
  stats: GameSessionStats;
  userStats: UserStats;
  onPlayAgain: () => void;
  onTryAnotherCategory: () => void;
  onReturnToDashboard: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  stats,
  userStats,
  onPlayAgain,
  onTryAnotherCategory,
  onReturnToDashboard,
}) => {
  const [showReview, setShowReview] = useState(false);
  const categoryMeta = stats.selectedCategory
    ? getCategoryById(stats.selectedCategory)
    : null;

  const sessionTitle =
    stats.sessionType === 'quick_challenge'
      ? 'Quick Multi-Category Challenge'
      : stats.sessionType === 'daily_challenge'
      ? 'Daily Cognitive Challenge'
      : `${categoryMeta?.name || 'Cognitive'} Training`;

  const performance = getPerformanceSummary(
    stats.score,
    stats.accuracy,
    categoryMeta?.name || 'Cognitive Training'
  );

  const isNewHighScore = stats.score > 0 && stats.score >= userStats.bestScoreOverall;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Performance Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 text-center backdrop-blur-md shadow-2xl">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {isNewHighScore && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
            <span>New Personal Best!</span>
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center mb-4 text-indigo-400 shadow-lg shadow-indigo-500/20">
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>

          <span className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
            {sessionTitle} • {stats.difficulty.toUpperCase()}
          </span>

          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-5xl sm:text-6xl font-extrabold font-mono-numbers text-white tracking-tight">
              {stats.score}
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              points
            </span>
          </div>

          {/* Performance summary card */}
          <div className={`mt-3 px-4 py-2.5 rounded-xl border max-w-lg ${performance.colorClass}`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Award className="w-4 h-4 text-current" />
              <h2 className="font-bold text-base text-current">
                {performance.tier} — {performance.headline}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {performance.description}
            </p>
          </div>
        </div>

        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-left">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Accuracy</span>
            </div>
            <div className="text-2xl font-bold font-mono-numbers text-white">
              {stats.accuracy}%
            </div>
            <span className="text-[11px] text-slate-500">
              {stats.correctAnswers} of {stats.history.length} solved
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Solved</span>
            </div>
            <div className="text-2xl font-bold font-mono-numbers text-white">
              {stats.correctAnswers}
              <span className="text-sm text-slate-500 font-normal"> / {stats.history.length}</span>
            </div>
            <span className="text-[11px] text-slate-500">
              {stats.incorrectAnswers} missed
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <TimerIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Avg Speed</span>
            </div>
            <div className="text-2xl font-bold font-mono-numbers text-white">
              {stats.averageResponseTime}s
            </div>
            <span className="text-[11px] text-slate-500">per challenge</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Best Streak</span>
            </div>
            <div className="text-2xl font-bold font-mono-numbers text-white">
              {stats.bestStreak}
            </div>
            <span className="text-[11px] text-slate-500">in a row</span>
          </div>
        </div>
      </div>

      {/* Category Performance Breakdown (for Quick Challenge or Multi-category session) */}
      {stats.categoryBreakdowns && stats.categoryBreakdowns.length > 1 && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Category Performance Breakdown</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stats.categoryBreakdowns.map((b) => {
              const catInfo = getCategoryById(b.category);
              return (
                <div
                  key={b.category}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {catInfo.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {b.correct}/{b.totalChallenges} correct ({b.accuracy}%)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold font-mono-numbers text-indigo-300 block">
                      +{b.score} pts
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {b.avgTime}s avg
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons: Play Again, Try Another Category, Return to Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={onPlayAgain}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-98"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </button>

        <button
          type="button"
          onClick={onTryAnotherCategory}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 active:scale-98"
        >
          <Sliders className="w-4 h-4 text-slate-400" />
          <span>Try Another Category</span>
        </button>

        <button
          type="button"
          onClick={onReturnToDashboard}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800 text-slate-300 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-slate-500 active:scale-98"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>Return to Dashboard</span>
        </button>
      </div>

      {/* Review Section */}
      <div className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowReview(!showReview)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-800/40 transition-colors focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm sm:text-base">
              Review Challenge Explanations
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {stats.history.length} items
            </span>
          </div>
          {showReview ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showReview && (
          <div className="divide-y divide-slate-800/80 border-t border-slate-800 px-4 sm:px-6 pb-4">
            {stats.history.map((item, idx) => (
              <div key={idx} className="py-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-slate-400">
                      #{idx + 1}:
                    </span>
                    <span className="text-sm font-bold text-white">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono-numbers text-slate-400">
                      {item.timeSpentSeconds.toFixed(1)}s
                    </span>
                    <span
                      className={`text-xs font-bold font-mono-numbers px-2 py-0.5 rounded ${
                        item.isCorrect
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {item.pointsEarned > 0 ? `+${item.pointsEarned}` : '0'} pts
                    </span>
                  </div>
                </div>

                <div className="text-xs flex flex-wrap items-center gap-x-4 gap-y-1 pl-6">
                  <span className="text-slate-400">
                    Your Response:{' '}
                    <strong className={item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                      {item.userResponse}
                    </strong>
                  </span>
                  {!item.isCorrect && item.correctResponse && (
                    <span className="text-slate-400">
                      Correct: <strong className="text-emerald-400">{item.correctResponse}</strong>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 pl-6 leading-relaxed italic">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
