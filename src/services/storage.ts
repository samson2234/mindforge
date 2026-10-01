import { UserStats, CompletedGameRecord, CognitiveCategory, CategoryProgress } from '../types/game';
import { COGNITIVE_CATEGORIES } from '../data/categories';

const STATS_KEY = 'mindforge_cognitive_platform_v2';

const createDefaultCategoryProgress = (): Record<CognitiveCategory, CategoryProgress> => {
  const map = {} as Record<CognitiveCategory, CategoryProgress>;
  COGNITIVE_CATEGORIES.forEach((cat) => {
    map[cat.id] = {
      gamesCompleted: 0,
      bestScore: 0,
      totalScore: 0,
      averageAccuracy: 0,
      totalAnswered: 0,
      totalCorrect: 0,
    };
  });
  return map;
};

const DEFAULT_STATS: UserStats = {
  bestScoreOverall: 0,
  totalGamesPlayed: 0,
  bestStreakOverall: 0,
  currentStreakOverall: 0,
  dailyChallengeCompletions: {},
  categoryProgress: createDefaultCategoryProgress(),
  recentGames: [],
};

export const loadUserStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);

    const mergedCategoryProgress = createDefaultCategoryProgress();
    if (parsed.categoryProgress) {
      COGNITIVE_CATEGORIES.forEach((cat) => {
        if (parsed.categoryProgress[cat.id]) {
          mergedCategoryProgress[cat.id] = {
            ...mergedCategoryProgress[cat.id],
            ...parsed.categoryProgress[cat.id],
          };
        }
      });
    }

    return {
      ...DEFAULT_STATS,
      ...parsed,
      categoryProgress: mergedCategoryProgress,
      dailyChallengeCompletions: parsed.dailyChallengeCompletions || {},
      recentGames: Array.isArray(parsed.recentGames) ? parsed.recentGames : [],
    };
  } catch (e) {
    console.error('Failed to load stats from localStorage:', e);
    return DEFAULT_STATS;
  }
};

export const saveCompletedGameRecord = (
  record: CompletedGameRecord,
  categoryUpdates?: Array<{ category: CognitiveCategory; correct: number; total: number; score: number }>
): UserStats => {
  try {
    const current = loadUserStats();

    const newBestOverall = Math.max(current.bestScoreOverall, record.score);
    const newBestStreak = Math.max(current.bestStreakOverall, record.bestStreak);
    const newCurrentStreak = record.accuracy >= 60 ? current.currentStreakOverall + 1 : 0;

    // Update category-level statistics
    const updatedCategoryProgress = { ...current.categoryProgress };

    if (categoryUpdates && categoryUpdates.length > 0) {
      categoryUpdates.forEach((up) => {
        const catStats = updatedCategoryProgress[up.category] || {
          gamesCompleted: 0,
          bestScore: 0,
          totalScore: 0,
          averageAccuracy: 0,
          totalAnswered: 0,
          totalCorrect: 0,
        };

        const totalAnswered = catStats.totalAnswered + up.total;
        const totalCorrect = catStats.totalCorrect + up.correct;
        const averageAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

        updatedCategoryProgress[up.category] = {
          gamesCompleted: catStats.gamesCompleted + 1,
          bestScore: Math.max(catStats.bestScore, up.score),
          totalScore: catStats.totalScore + up.score,
          averageAccuracy,
          totalAnswered,
          totalCorrect,
        };
      });
    } else if (record.category) {
      const catStats = updatedCategoryProgress[record.category] || {
        gamesCompleted: 0,
        bestScore: 0,
        totalScore: 0,
        averageAccuracy: 0,
        totalAnswered: 0,
        totalCorrect: 0,
      };

      const totalAnswered = catStats.totalAnswered + record.totalQuestions;
      const totalCorrect = catStats.totalCorrect + record.correctAnswers;
      const averageAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

      updatedCategoryProgress[record.category] = {
        gamesCompleted: catStats.gamesCompleted + 1,
        bestScore: Math.max(catStats.bestScore, record.score),
        totalScore: catStats.totalScore + record.score,
        averageAccuracy,
        totalAnswered,
        totalCorrect,
      };
    }

    // If this was a daily challenge, record completion for today's date
    const updatedDaily = { ...current.dailyChallengeCompletions };
    if (record.sessionType === 'daily_challenge') {
      const todayKey = new Date().toISOString().slice(0, 10);
      updatedDaily[todayKey] = {
        completed: true,
        score: record.score,
        accuracy: record.accuracy,
      };
    }

    // Keep last 25 recent games
    const updatedRecentGames = [record, ...current.recentGames].slice(0, 25);

    const updatedStats: UserStats = {
      bestScoreOverall: newBestOverall,
      totalGamesPlayed: current.totalGamesPlayed + 1,
      bestStreakOverall: newBestStreak,
      currentStreakOverall: newCurrentStreak,
      dailyChallengeCompletions: updatedDaily,
      categoryProgress: updatedCategoryProgress,
      recentGames: updatedRecentGames,
    };

    localStorage.setItem(STATS_KEY, JSON.stringify(updatedStats));
    return updatedStats;
  } catch (e) {
    console.error('Failed to save game to localStorage:', e);
    return DEFAULT_STATS;
  }
};

export const isDailyChallengeCompletedToday = (stats: UserStats): boolean => {
  const todayKey = new Date().toISOString().slice(0, 10);
  return Boolean(stats.dailyChallengeCompletions[todayKey]?.completed);
};
