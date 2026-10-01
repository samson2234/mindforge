import React from 'react';
import { Brain, Trophy, Flame } from 'lucide-react';
import { UserStats } from '../types/game';

interface HeaderProps {
  currentView: 'home' | 'game' | 'results';
  onNavigateHome: () => void;
  userStats: UserStats;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  userStats,
}) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                MindForge
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Cognitive Platform
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Train your brain. Think sharper.
            </p>
          </div>
        </button>

        {/* Quick User Stats / Controls */}
        <div className="flex items-center gap-3">
          {userStats.bestScoreOverall > 0 && currentView !== 'game' && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-slate-400">Best:</span>
              <span className="font-bold font-mono-numbers text-white">
                {userStats.bestScoreOverall}
              </span>
            </div>
          )}

          {userStats.bestStreakOverall > 0 && currentView !== 'game' && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-orange-400">
              <Flame className="w-3.5 h-3.5" />
              <span className="font-bold font-mono-numbers">{userStats.bestStreakOverall}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
