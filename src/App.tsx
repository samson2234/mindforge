/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  CognitiveCategory,
  CognitiveChallenge,
  Difficulty,
  GameSessionStats,
  SessionType,
  UserStats,
  CompletedGameRecord,
} from './types/game';
import { loadUserStats, saveCompletedGameRecord } from './services/storage';
import {
  getChallengesForCategory,
  getQuickChallengeSet,
  getDailyChallengeSet,
} from './services/challengeSelector';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';

type AppView = 'dashboard' | 'game' | 'results';

export default function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const [sessionType, setSessionType] = useState<SessionType>('category');
  const [selectedCategory, setSelectedCategory] = useState<CognitiveCategory>('pattern_recognition');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [activeChallenges, setActiveChallenges] = useState<CognitiveChallenge[]>([]);
  const [sessionStats, setSessionStats] = useState<GameSessionStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(() => loadUserStats());
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Sync user stats on mount
  useEffect(() => {
    setUserStats(loadUserStats());
  }, []);

  // Launch Category Challenge Session
  const handleStartCategorySession = useCallback(
    (category: CognitiveCategory, targetDifficulty: Difficulty) => {
      const challenges = getChallengesForCategory(category, targetDifficulty, 6);
      setSelectedCategory(category);
      setDifficulty(targetDifficulty);
      setSessionType('category');
      setActiveChallenges(challenges);
      setView('game');
    },
    []
  );

  // Launch Quick Challenge (Multi-category mixed sprint)
  const handleStartQuickChallenge = useCallback((targetDifficulty: Difficulty) => {
    const challenges = getQuickChallengeSet(targetDifficulty);
    setDifficulty(targetDifficulty);
    setSessionType('quick_challenge');
    setActiveChallenges(challenges);
    setView('game');
  }, []);

  // Launch Daily Challenge
  const handleStartDailyChallenge = useCallback(() => {
    const daily = getDailyChallengeSet();
    setSelectedCategory(daily.category);
    setDifficulty(daily.difficulty);
    setSessionType('daily_challenge');
    setActiveChallenges(daily.challenges);
    setView('game');
  }, []);

  // Game completion
  const handleFinishGame = useCallback(
    (stats: GameSessionStats) => {
      setSessionStats(stats);

      const record: CompletedGameRecord = {
        id: `game_${Date.now()}`,
        date: new Date().toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        timestamp: Date.now(),
        sessionType: stats.sessionType,
        category: stats.selectedCategory,
        difficulty: stats.difficulty,
        score: stats.score,
        accuracy: stats.accuracy,
        correctAnswers: stats.correctAnswers,
        totalQuestions: stats.history.length,
        averageResponseTime: stats.averageResponseTime,
        bestStreak: stats.bestStreak,
      };

      const categoryUpdates = stats.categoryBreakdowns?.map((b) => ({
        category: b.category,
        correct: b.correct,
        total: b.totalChallenges,
        score: b.score,
      }));

      const updatedStats = saveCompletedGameRecord(record, categoryUpdates);
      setUserStats(updatedStats);
      setView('results');
    },
    []
  );

  // Mid-game abandon confirmation
  const handleRequestAbandon = useCallback(() => {
    setShowExitConfirm(true);
  }, []);

  const handleConfirmAbandon = useCallback(() => {
    setShowExitConfirm(false);
    setView('dashboard');
  }, []);

  const handleCancelAbandon = useCallback(() => {
    setShowExitConfirm(false);
  }, []);

  // Results Screen Actions
  const handlePlayAgain = useCallback(() => {
    if (sessionType === 'quick_challenge') {
      handleStartQuickChallenge(difficulty);
    } else if (sessionType === 'daily_challenge') {
      handleStartDailyChallenge();
    } else {
      handleStartCategorySession(selectedCategory, difficulty);
    }
  }, [
    sessionType,
    difficulty,
    selectedCategory,
    handleStartQuickChallenge,
    handleStartDailyChallenge,
    handleStartCategorySession,
  ]);

  const handleTryAnotherCategory = useCallback(() => {
    setView('dashboard');
  }, []);

  const handleReturnToDashboard = useCallback(() => {
    setView('dashboard');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sticky App Header */}
      <Header
        currentView={view === 'dashboard' ? 'home' : view}
        onNavigateHome={() => {
          if (view === 'game') {
            handleRequestAbandon();
          } else {
            setView('dashboard');
          }
        }}
        userStats={userStats}
      />

      {/* Main App Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {view === 'dashboard' && (
          <Dashboard
            userStats={userStats}
            onStartCategorySession={handleStartCategorySession}
            onStartQuickChallenge={handleStartQuickChallenge}
            onStartDailyChallenge={handleStartDailyChallenge}
          />
        )}

        {view === 'game' && activeChallenges.length > 0 && (
          <GameScreen
            challenges={activeChallenges}
            difficulty={difficulty}
            sessionType={sessionType}
            selectedCategory={selectedCategory}
            onFinishGame={handleFinishGame}
            onAbandon={handleRequestAbandon}
          />
        )}

        {view === 'results' && sessionStats && (
          <ResultsScreen
            stats={sessionStats}
            userStats={userStats}
            onPlayAgain={handlePlayAgain}
            onTryAnotherCategory={handleTryAnotherCategory}
            onReturnToDashboard={handleReturnToDashboard}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            MindForge &copy; {new Date().getFullYear()} • Modular Cognitive Training Game
          </p>
          <p className="text-slate-600">
            7 Cognitive Domains • Daily Challenge • Quick Mixed Drills
          </p>
        </div>
      </footer>

      {/* Mid-Game Abandon Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-center">
            <h3 className="text-lg font-bold text-white mb-2">Leave Challenge?</h3>
            <p className="text-sm text-slate-300 mb-6">
              Your ongoing progress in this session will not be saved to your records.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancelAbandon}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors"
              >
                Keep Playing
              </button>
              <button
                type="button"
                onClick={handleConfirmAbandon}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-colors shadow-md shadow-rose-600/30"
              >
                Quit Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
