import React, { useState } from 'react';
import {
  Brain,
  Trophy,
  Flame,
  Activity,
  Play,
  Sparkles,
  Calendar,
  Zap,
  Target,
  Compass,
  Boxes,
  Cpu,
  Layers,
  BarChart3,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  CognitiveCategory,
  Difficulty,
  UserStats,
  SessionType,
} from '../types/game';
import { COGNITIVE_CATEGORIES } from '../data/categories';
import { isDailyChallengeCompletedToday } from '../services/storage';

interface DashboardProps {
  userStats: UserStats;
  onStartCategorySession: (category: CognitiveCategory, difficulty: Difficulty) => void;
  onStartQuickChallenge: (difficulty: Difficulty) => void;
  onStartDailyChallenge: () => void;
}

const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  Boxes,
  Brain,
  Target,
  Cpu,
  Sparkles,
  Activity,
};

export const Dashboard: React.FC<DashboardProps> = ({
  userStats,
  onStartCategorySession,
  onStartQuickChallenge,
  onStartDailyChallenge,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [activeTab, setActiveTab] = useState<'categories' | 'progress'>('categories');
  const isDailyDone = isDailyChallengeCompletedToday(userStats);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      {/* Top Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 border border-slate-800 p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4 shadow-sm">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Modular Cognitive Training Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
            MindForge
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-indigo-200/90 mb-6">
            Train your brain. Think sharper.
          </p>

          <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            A comprehensive mental training suite targeting seven distinct cognitive domains.
            Engage in purpose-built mechanics for deductive logic, working memory load, rapid attention, and constraint optimization.
          </p>

          {/* User's Overall Session Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mb-8 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Best Score</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-white">
                {userStats.bestScoreOverall}
              </div>
            </div>

            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Games Completed</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-white">
                {userStats.totalGamesPlayed}
              </div>
            </div>

            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Current Streak</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-white">
                {userStats.currentStreakOverall}
              </div>
            </div>

            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Best Streak</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-white">
                {userStats.bestStreakOverall}
              </div>
            </div>
          </div>

          {/* Action Row: Quick Challenge & Daily Challenge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left">
            {/* Quick Challenge Card */}
            <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 hover:border-indigo-400/70 transition-all flex flex-col justify-between group shadow-lg shadow-indigo-950/30">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-white text-base">Quick Challenge</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Mixed Domains
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  A high-impact mixed sprint pulling challenges across Critical Thinking, Memory, Attention, Logic, and Patterns.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onStartQuickChallenge(selectedDifficulty)}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30 active:scale-98"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start Quick Challenge ({selectedDifficulty})</span>
              </button>
            </div>

            {/* Daily Challenge Card */}
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col justify-between group shadow-lg shadow-amber-950/20">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white text-base">Daily Challenge</span>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                      isDailyDone
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {isDailyDone ? 'Completed Today' : "Today's Drill"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {isDailyDone
                    ? 'Great discipline! You have completed your daily challenge for today. You can replay anytime.'
                    : 'A curated daily challenge. Keep your streak alive and sharpen cross-domain cognitive flexibility.'}
                </p>
              </div>

              <button
                type="button"
                onClick={onStartDailyChallenge}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-98 ${
                  isDailyDone
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/30'
                }`}
              >
                {isDailyDone ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Replay Daily Challenge</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Daily Challenge</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Global Difficulty Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'categories'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cognitive Categories (7)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'progress'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Progress & Metrics
          </button>
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Difficulty:</span>
          <div className="inline-flex p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors ${
                  selectedDifficulty === d
                    ? d === 'easy'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : d === 'medium'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tab 1: Cognitive Category Cards */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Cognitive Training Categories</span>
            </h2>
            <span className="text-xs text-slate-400">
              Select any category to train with specialized gameplay
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COGNITIVE_CATEGORIES.map((category) => {
              const IconComponent = CATEGORY_ICON_MAP[category.iconName] || Brain;
              const catProgress = userStats.categoryProgress[category.id] || {
                gamesCompleted: 0,
                bestScore: 0,
                totalScore: 0,
                averageAccuracy: 0,
                totalAnswered: 0,
                totalCorrect: 0,
              };

              return (
                <div
                  key={category.id}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-black/30"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${category.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                            {category.name}
                          </h3>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block">
                            {category.mechanicNote}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {category.shortDesc}
                    </p>
                  </div>

                  {/* Stats & Launch button */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono-numbers">
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                        <span className="text-[10px] text-slate-500 block font-sans">Best Score</span>
                        <span className="font-bold text-white text-sm">
                          {catProgress.bestScore}
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                        <span className="text-[10px] text-slate-500 block font-sans">Completed</span>
                        <span className="font-bold text-white text-sm">
                          {catProgress.gamesCompleted}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onStartCategorySession(category.id, selectedDifficulty)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md group-hover:bg-indigo-600 active:scale-98"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start {category.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Tab 2: Progress Section across all 7 Categories */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Cognitive Performance Matrix (All 7 Categories)
                </h2>
              </div>
              <span className="text-xs text-slate-500">Persistent Local Records</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COGNITIVE_CATEGORIES.map((cat) => {
                const p = userStats.categoryProgress[cat.id];
                const IconComponent = CATEGORY_ICON_MAP[cat.iconName] || Brain;

                return (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-4 h-4 ${cat.color}`} />
                        <span className="font-bold text-sm text-white">{cat.name}</span>
                      </div>
                      <span className="text-xs font-mono-numbers text-slate-400">
                        {p.gamesCompleted} sessions
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Average Accuracy</span>
                      <span className="font-mono-numbers font-bold text-white">
                        {p.averageAccuracy}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                        style={{ width: `${p.averageAccuracy}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono-numbers pt-1">
                      <span>Total Solved: {p.totalCorrect}/{p.totalAnswered}</span>
                      <span>Best: {p.bestScore} pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent History */}
          {userStats.recentGames.length > 0 && (
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-base text-white">Recent Challenge History</h3>
                </div>
                <span className="text-xs text-slate-500">
                  Last {userStats.recentGames.length} sessions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="pb-2.5 font-semibold">Date</th>
                      <th className="pb-2.5 font-semibold">Type / Category</th>
                      <th className="pb-2.5 font-semibold">Difficulty</th>
                      <th className="pb-2.5 font-semibold">Score</th>
                      <th className="pb-2.5 font-semibold">Accuracy</th>
                      <th className="pb-2.5 font-semibold">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
                    {userStats.recentGames.slice(0, 8).map((game) => (
                      <tr key={game.id} className="text-slate-300 hover:bg-slate-800/30">
                        <td className="py-3 font-sans text-slate-400 text-xs">{game.date}</td>
                        <td className="py-3 font-sans capitalize font-medium text-white">
                          {game.sessionType === 'quick_challenge'
                            ? 'Quick Challenge (Mixed)'
                            : game.sessionType === 'daily_challenge'
                            ? 'Daily Challenge'
                            : game.category
                            ? COGNITIVE_CATEGORIES.find((c) => c.id === game.category)?.name
                            : 'Challenge'}
                        </td>
                        <td className="py-3 font-sans">
                          <span
                            className={`capitalize px-2 py-0.5 rounded text-[11px] font-semibold ${
                              game.difficulty === 'easy'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : game.difficulty === 'medium'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {game.difficulty}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-white">{game.score}</td>
                        <td className="py-3">{game.accuracy}%</td>
                        <td className="py-3">{game.averageResponseTime}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
