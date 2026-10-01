import { CognitiveCategory, CognitiveChallenge, Difficulty } from '../types/game';
import { ALL_CHALLENGES } from '../data/challenges';
import { COGNITIVE_CATEGORIES } from '../data/categories';

export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Returns randomized challenges for a specific category and difficulty.
 */
export const getChallengesForCategory = (
  category: CognitiveCategory,
  difficulty: Difficulty,
  count = 6
): CognitiveChallenge[] => {
  // First get exact matches
  const exact = ALL_CHALLENGES.filter(
    (c) => c.category === category && c.difficulty === difficulty
  );

  // If we need more items to satisfy count, also pull from other difficulties of the same category
  const others = ALL_CHALLENGES.filter(
    (c) => c.category === category && c.difficulty !== difficulty
  );

  const combined = [...shuffleArray(exact), ...shuffleArray(others)];
  const selected = combined.slice(0, Math.min(count, combined.length));

  return selected.map((ch) => ({
    ...ch,
    options: ch.options ? shuffleArray(ch.options) : undefined,
  }));
};

/**
 * Generates a mixed Quick Challenge session consisting of 1 challenge from each category.
 */
export const getQuickChallengeSet = (difficulty: Difficulty = 'medium'): CognitiveChallenge[] => {
  const session: CognitiveChallenge[] = [];

  COGNITIVE_CATEGORIES.forEach((cat) => {
    const candidates = ALL_CHALLENGES.filter(
      (c) => c.category === cat.id && c.difficulty === difficulty
    );
    const pool = candidates.length > 0
      ? candidates
      : ALL_CHALLENGES.filter((c) => c.category === cat.id);

    if (pool.length > 0) {
      const picked = pool[Math.floor(Math.random() * pool.length)];
      session.push({
        ...picked,
        options: picked.options ? shuffleArray(picked.options) : undefined,
      });
    }
  });

  return shuffleArray(session);
};

/**
 * Generates a deterministic Daily Challenge based on today's date string.
 */
export const getDailyChallengeSet = (date = new Date()): {
  category: CognitiveCategory;
  difficulty: Difficulty;
  challenges: CognitiveChallenge[];
  dailyTitle: string;
} => {
  const dateKey = date.toISOString().slice(0, 10); // YYYY-MM-DD

  // Simple string hash
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  const categories = COGNITIVE_CATEGORIES.map((c) => c.id);
  const pickedCategory = categories[positiveHash % categories.length];

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  const pickedDifficulty = difficulties[(positiveHash >> 2) % difficulties.length];

  const pool = ALL_CHALLENGES.filter((c) => c.category === pickedCategory);
  const challenges = pool.slice(0, 5).map((ch) => ({
    ...ch,
    options: ch.options ? shuffleArray(ch.options) : undefined,
  }));

  const catMeta = COGNITIVE_CATEGORIES.find((c) => c.id === pickedCategory);

  return {
    category: pickedCategory,
    difficulty: pickedDifficulty,
    challenges: challenges.length > 0 ? challenges : ALL_CHALLENGES.slice(0, 5),
    dailyTitle: `Daily Forge: ${catMeta?.name || 'Cognitive Focus'}`,
  };
};
