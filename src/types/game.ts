export type Difficulty = 'easy' | 'medium' | 'hard';

export type CognitiveCategory =
  | 'critical_thinking'
  | 'problem_solving'
  | 'working_memory'
  | 'sustained_attention'
  | 'logical_thinking'
  | 'word_puzzles'
  | 'pattern_recognition';

export type SessionType = 'category' | 'quick_challenge' | 'daily_challenge';

export interface GameModeInfo {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  isAvailable: boolean;
  comingSoonBadge?: string;
}

export type GameMode = CognitiveCategory;

export interface Question {
  id: string;
  difficulty: Difficulty;
  category?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuestionResult {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  pointsEarned: number;
}

export interface CategoryInfo {
  id: CognitiveCategory;
  name: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  mechanicNote: string;
}

// Challenge representation that unifies gameplay mechanics
export type ChallengeKind =
  | 'standard_choice'     // Pattern Recognition, Critical Thinking, Logical Thinking, Word Puzzles
  | 'working_memory'     // Memorize stream/grid, then recall or manipulate (reverse, sort, target)
  | 'sustained_attention' // Timed rapid target stimuli: hits, misses, false alarms
  | 'problem_solving_multi_step'; // Multi-step resource allocation, ordering, or optimization

export interface WorkingMemoryConfig {
  items: string[];
  displayDurationMs: number; // e.g. 4000ms
  manipulationType: 'recall' | 'reverse' | 'sort_numeric' | 'position_recall';
  promptInstructions: string;
}

export interface SustainedAttentionTrial {
  id: string;
  symbol: string;
  color: string;
  isTarget: boolean;
}

export interface SustainedAttentionConfig {
  targetDescription: string;
  targetSymbol: string;
  targetColor: string;
  trialDurationMs: number; // Duration each stimulus is shown (e.g. 1000ms - 1500ms)
  trials: SustainedAttentionTrial[];
}

export interface ProblemSolvingResourceItem {
  id: string;
  name: string;
  cost: number;
  yield: number;
  unit: string;
}

export interface ProblemSolvingConfig {
  scenario: string;
  constraints: string[];
  budgetOrCapacity: number;
  budgetLabel: string;
  items: ProblemSolvingResourceItem[];
  minTargetYield: number;
  optimalSolutionSummary: string;
}

export interface CognitiveChallenge {
  id: string;
  category: CognitiveCategory;
  difficulty: Difficulty;
  subType?: string;
  title: string;
  prompt: string; // The main question/context
  contextInfo?: string; // Optional contextual premises, passage, or constraints
  kind: ChallengeKind;

  // For standard_choice & memory choice answers
  options?: string[];
  correctAnswer?: string;

  // Specific gameplay configs
  memoryConfig?: WorkingMemoryConfig;
  attentionConfig?: SustainedAttentionConfig;
  problemSolvingConfig?: ProblemSolvingConfig;

  explanation: string;
}

export interface ChallengeResult {
  challengeId: string;
  category: CognitiveCategory;
  title: string;
  isCorrect: boolean;
  userResponse: string;
  correctResponse: string;
  timeSpentSeconds: number;
  pointsEarned: number;
  explanation: string;
  // Specific metrics for attention/memory
  hits?: number;
  misses?: number;
  falseAlarms?: number;
}

export interface CategoryBreakdown {
  category: CognitiveCategory;
  totalChallenges: number;
  correct: number;
  accuracy: number;
  score: number;
  avgTime: number;
}

export interface GameSessionStats {
  sessionType: SessionType;
  selectedCategory?: CognitiveCategory;
  difficulty: Difficulty;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  currentStreak: number;
  bestStreak: number;
  totalTimeSeconds: number;
  averageResponseTime: number;
  completionRate: number;
  categoryBreakdowns?: CategoryBreakdown[];
  history: ChallengeResult[];
}

export interface CompletedGameRecord {
  id: string;
  date: string;
  timestamp: number;
  sessionType: SessionType;
  category?: CognitiveCategory;
  difficulty: Difficulty;
  score: number;
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  averageResponseTime: number;
  bestStreak: number;
}

export interface CategoryProgress {
  gamesCompleted: number;
  bestScore: number;
  totalScore: number;
  averageAccuracy: number;
  totalAnswered: number;
  totalCorrect: number;
}

export interface UserStats {
  bestScoreOverall: number;
  bestScoreByDifficulty?: Record<Difficulty, number>;
  totalGamesPlayed: number;
  totalQuestionsAnswered?: number;
  bestStreakOverall: number;
  currentStreakOverall: number;
  lastPlayedDate?: string;
  dailyChallengeCompletions: Record<string, { completed: boolean; score: number; accuracy: number }>;
  categoryProgress: Record<CognitiveCategory, CategoryProgress>;
  recentGames: CompletedGameRecord[];
}
