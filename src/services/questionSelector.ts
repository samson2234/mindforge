import { Difficulty, Question } from '../types/game';
import { QUESTION_BANK } from '../data/questions';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Selects 10 randomized, unique questions for the given difficulty.
 * Also randomizes option order to prevent position bias while preserving correctness.
 */
export const selectQuestionsForSession = (
  difficulty: Difficulty,
  count = 10
): Question[] => {
  const candidates = QUESTION_BANK.filter((q) => q.difficulty === difficulty);
  const shuffledCandidates = shuffleArray(candidates);
  const selected = shuffledCandidates.slice(0, count);

  return selected.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
};
