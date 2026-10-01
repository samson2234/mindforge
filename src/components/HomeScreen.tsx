import React from 'react';
import {
  Brain,
  Trophy,
  Flame,
  Activity,
  Play,
  Sparkles,
  History,
  Target,
  ArrowRight,
  Layers,
  Cpu,
  Compass,
  Boxes,
} from 'lucide-react';
import { Difficulty, GameModeInfo, UserStats } from '../types/game';
import { GAME_MODES } from '../data/questions';
import { DifficultySelector } from './DifficultySelector';

interface HomeScreenProps {
  difficulty: Difficulty;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onStartGame: () => void;
  userStats: UserStats;
}

const MODE_ICONS: Record<string, React.ElementType> = {
  Sparkles,
  Brain,
  Cpu,
  Target,
  Compass,
  Boxes,
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  difficulty,
  onSelectDifficulty,
  onStartGame,
  userStats,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 sm:space-y-10 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-6 sm:p-10 text-center backdrop-blur-xl shadow-2xl">
        {/* Subtle accent glow in background */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-5 shadow-sm">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Cognitive Training Platform</span>
          </div>

          {/* App Name & Tagline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-3">
            MindForge
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-indigo-200/90 mb-5">
            Train your brain. Think sharper.
          </p>

          {/* Short Explanation of the Game */}
          <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Challenge your mental processing with high-focus cognitive drills. In{' '}
            <strong className="text-white font-semibold">Pattern Recognition</strong>, uncover
            the underlying mathematical laws governing numeric, geometric, and logical sequences
            under pressure.
          </p>

          {/* Prominent Best Score Indication */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-8 p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Best Score</span>
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-white">
                {userStats.bestScoreOverall}
              </div>
            </div>

            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Best Streak</span>
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-white">
                {userStats.bestStreakOverall}
              </div>
            </div>

            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Games Played</span>
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-white">
                {userStats.totalGamesPlayed}
              </div>
            </div>

            <div className="p-3 text-center rounded-xl bg-slate-900/50">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Questions</span>
              </div>
              <div className="text-2xl font-bold font-mono-numbers text-white">
                {userStats.totalQuestionsAnswered}
              </div>
            </div>
          </div>

          {/* Difficulty Selector before launch */}
          <div className="w-full max-w-2xl mb-8">
            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelectDifficulty={onSelectDifficulty}
              userStats={userStats}
            />
          </div>

          {/* Prominent "Start Challenge" Button */}
          <button
            type="button"
            onClick={onStartGame}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg sm:text-xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/40 active:scale-98"
          >
            <Play className="w-5 h-5 fill-white transition-transform group-hover:scale-110" />
            <span>Start Challenge</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Performance History (if any games completed) */}
      {userStats.recentGames.length > 0 && (
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <h2 className="font-bold text-base text-white">Recent Performance History</h2>
            </div>
            <span className="text-xs text-slate-500">Last {userStats.recentGames.length} sessions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="pb-2.5 font-semibold">Date</th>
                  <th className="pb-2.5 font-semibold">Difficulty</th>
                  <th className="pb-2.5 font-semibold">Score</th>
                  <th className="pb-2.5 font-semibold">Accuracy</th>
                  <th className="pb-2.5 font-semibold">Avg Speed</th>
                  <th className="pb-2.5 font-semibold">Best Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
                {userStats.recentGames.slice(0, 5).map((game) => (
                  <tr key={game.id} className="text-slate-300 hover:bg-slate-800/30">
                    <td className="py-3 font-sans text-slate-400 text-xs">{game.date}</td>
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
                    <td className="py-3 text-orange-400">{game.bestStreak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Extensible Cognitive Architecture: Game Mode Suite Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="font-bold text-base sm:text-lg text-white">
              Cognitive Training Matrix
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Phase 1 Active • Modular Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {GAME_MODES.map((mode: GameModeInfo) => {
            const IconComponent = MODE_ICONS[mode.iconName] || Brain;
            const isCurrentMode = mode.id === 'pattern_recognition';

            return (
              <div
                key={mode.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrentMode
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/50 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/50 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isCurrentMode
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">{mode.title}</span>
                  </div>

                  {isCurrentMode ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Active V1
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {mode.comingSoonBadge || 'Upcoming'}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {mode.shortDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
