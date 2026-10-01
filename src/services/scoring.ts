import { Difficulty, CognitiveCategory } from '../types/game';

export interface ScoreCalculationResult {
  basePoints: number;
  speedBonus: number;
  streakBonus: number;
  totalPoints: number;
}

export interface PerformanceRating {
  tier: string;
  badge: string;
  headline: string;
  description: string;
  colorClass: string;
}

const BASE_POINTS_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 100,
  medium: 150,
  hard: 200,
};

export const calculateChallengeScore = (
  difficulty: Difficulty,
  isCorrect: boolean,
  timeSpentSeconds: number,
  currentStreak: number,
  accuracyRatio = 1.0
): ScoreCalculationResult => {
  if (!isCorrect) {
    return {
      basePoints: 0,
      speedBonus: 0,
      streakBonus: 0,
      totalPoints: 0,
    };
  }

  const basePoints = Math.round(BASE_POINTS_BY_DIFFICULTY[difficulty] * accuracyRatio);

  // Speed bonus: decaying scale up to 50 pts, accuracy remains predominant
  let speedBonus = 0;
  if (timeSpentSeconds <= 3.0) {
    speedBonus = 50;
  } else if (timeSpentSeconds < 15.0) {
    const fraction = (15.0 - timeSpentSeconds) / (15.0 - 3.0);
    speedBonus = Math.round(50 * Math.max(0, fraction));
  }

  // Momentum bonus for streak
  const streakBonus = Math.min(50, Math.max(0, (currentStreak - 1) * 10));

  const totalPoints = basePoints + speedBonus + streakBonus;

  return {
    basePoints,
    speedBonus,
    streakBonus,
    totalPoints,
  };
};

/**
 * Returns strictly non-medical, non-clinical challenge performance evaluation.
 * Uses phrasing like "Game Performance", "Cognitive Training Progress", "Challenge Performance".
 */
export const getPerformanceSummary = (
  score: number,
  accuracy: number,
  categoryName = 'Cognitive Training'
): PerformanceRating => {
  if (accuracy >= 90) {
    return {
      tier: 'Optimal Precision',
      badge: 'Challenge Performance: High',
      headline: `${categoryName} Mastery`,
      description: 'Superb game performance. Your rapid response latency and high task accuracy demonstrated disciplined attention and logical precision.',
      colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    };
  }

  if (accuracy >= 70) {
    return {
      tier: 'Strong Execution',
      badge: 'Challenge Performance: Proficient',
      headline: `${categoryName} Progress`,
      description: 'Solid cognitive training progress. You maintained steady focus and correctly solved complex multi-variable conditions.',
      colorClass: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    };
  }

  if (accuracy >= 50) {
    return {
      tier: 'Developing Agility',
      badge: 'Challenge Performance: Moderate',
      headline: `${categoryName} Building`,
      description: 'Promising challenge session. Regularly reviewing underlying constraints and step differences will increase your speed on harder tasks.',
      colorClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    };
  }

  return {
    tier: 'Targeted Focus',
    badge: 'Cognitive Training Progress',
    headline: `${categoryName} Practice`,
    description: 'Good effort in this training round. Taking a measured pace to verify premises and double-check instructions will elevate your completion rate.',
    colorClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  };
};
