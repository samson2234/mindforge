import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import {
  CognitiveCategory,
  CognitiveChallenge,
  Difficulty,
  GameSessionStats,
  ChallengeResult,
  SessionType,
  CategoryBreakdown,
} from '../types/game';
import { calculateChallengeScore, ScoreCalculationResult } from '../services/scoring';
import { ProgressBar } from './ProgressBar';
import { Timer } from './Timer';
import { ScoreDisplay } from './ScoreDisplay';
import { StandardChoiceChallenge } from './gameplay/StandardChoiceChallenge';
import { WorkingMemoryChallenge } from './gameplay/WorkingMemoryChallenge';
import { SustainedAttentionChallenge } from './gameplay/SustainedAttentionChallenge';
import { ProblemSolvingChallenge } from './gameplay/ProblemSolvingChallenge';
import { getCategoryById } from '../data/categories';

interface GameScreenProps {
  challenges: CognitiveChallenge[];
  difficulty: Difficulty;
  sessionType: SessionType;
  selectedCategory?: CognitiveCategory;
  onFinishGame: (stats: GameSessionStats) => void;
  onAbandon: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  challenges,
  difficulty,
  sessionType,
  selectedCategory,
  onFinishGame,
  onAbandon,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentScoreBreakdown, setCurrentScoreBreakdown] =
    useState<ScoreCalculationResult | null>(null);

  // Cumulative game statistics
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [results, setResults] = useState<ChallengeResult[]>([]);

  // Timer state for current challenge
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const currentChallenge = challenges[currentIndex];
  const isLastChallenge = currentIndex === challenges.length - 1;
  const currentCategoryMeta = currentChallenge
    ? getCategoryById(currentChallenge.category)
    : null;

  // Initialize timer on challenge load
  useEffect(() => {
    startTimeRef.current = Date.now();
    setElapsedSeconds(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentScoreBreakdown(null);

    timerRef.current = window.setInterval(() => {
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      setElapsedSeconds(elapsed);
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  // Handle standard option selection
  const handleSelectOption = useCallback(
    (option: string) => {
      if (isAnswered || !currentChallenge) return;

      if (timerRef.current) clearInterval(timerRef.current);
      const finalTime = Math.max(0.1, (Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(finalTime);

      const isCorrect = option === currentChallenge.correctAnswer;
      setSelectedAnswer(option);
      setIsAnswered(true);

      const nextStreak = isCorrect ? currentStreak + 1 : 0;
      const breakdown = calculateChallengeScore(
        difficulty,
        isCorrect,
        finalTime,
        nextStreak
      );
      setCurrentScoreBreakdown(breakdown);

      const newScore = score + breakdown.totalPoints;
      const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
      const newBestStreak = Math.max(bestStreak, nextStreak);

      setScore(newScore);
      setCorrectCount(newCorrectCount);
      setCurrentStreak(nextStreak);
      setBestStreak(newBestStreak);

      const challengeResult: ChallengeResult = {
        challengeId: currentChallenge.id,
        category: currentChallenge.category,
        title: currentChallenge.title,
        isCorrect,
        userResponse: option,
        correctResponse: currentChallenge.correctAnswer || '',
        timeSpentSeconds: Number(finalTime.toFixed(1)),
        pointsEarned: breakdown.totalPoints,
        explanation: currentChallenge.explanation,
      };

      setResults((prev) => [...prev, challengeResult]);
    },
    [
      isAnswered,
      currentChallenge,
      difficulty,
      currentStreak,
      score,
      correctCount,
      bestStreak,
    ]
  );

  // Handle attention challenge completion
  const handleCompleteAttention = useCallback(
    (hits: number, misses: number, falseAlarms: number, avgLatencyMs: number) => {
      if (isAnswered || !currentChallenge) return;

      if (timerRef.current) clearInterval(timerRef.current);
      const finalTime = Math.max(0.1, (Date.now() - startTimeRef.current) / 1000);
      setElapsedSeconds(finalTime);

      const totalStimuli = (currentChallenge.attentionConfig?.trials.length || 8);
      const totalTargets = (currentChallenge.attentionConfig?.trials.filter((t) => t.isTarget).length || 3);

      const accuracyRatio = Math.max(0, Math.min(1, (hits - falseAlarms * 0.5) / Math.max(1, totalTargets)));
      const isConsideredPass = hits >= Math.ceil(totalTargets * 0.6) && falseAlarms <= 2;

      setIsAnswered(true);
      setSelectedAnswer(`${hits} hits / ${misses} missed / ${falseAlarms} false`);

      const nextStreak = isConsideredPass ? currentStreak + 1 : 0;
      const breakdown = calculateChallengeScore(
        difficulty,
        isConsideredPass,
        avgLatencyMs > 0 ? avgLatencyMs / 1000 : finalTime,
        nextStreak,
        accuracyRatio
      );
      setCurrentScoreBreakdown(breakdown);

      const newScore = score + breakdown.totalPoints;
      const newCorrectCount = isConsideredPass ? correctCount + 1 : correctCount;
      const newBestStreak = Math.max(bestStreak, nextStreak);

      setScore(newScore);
      setCorrectCount(newCorrectCount);
      setCurrentStreak(nextStreak);
      setBestStreak(newBestStreak);

      const challengeResult: ChallengeResult = {
        challengeId: currentChallenge.id,
        category: currentChallenge.category,
        title: currentChallenge.title,
        isCorrect: isConsideredPass,
        userResponse: `${hits} hits, ${falseAlarms} false alarms (${avgLatencyMs}ms)`,
        correctResponse: `${totalTargets} targets detected`,
        timeSpentSeconds: Number(finalTime.toFixed(1)),
        pointsEarned: breakdown.totalPoints,
        explanation: currentChallenge.explanation,
        hits,
        misses,
        falseAlarms,
      };

      setResults((prev) => [...prev, challengeResult]);
    },
    [
      isAnswered,
      currentChallenge,
      difficulty,
      currentStreak,
      score,
      correctCount,
      bestStreak,
    ]
  );

  // Compute category breakdown and finish game
  const handleNextChallenge = useCallback(() => {
    if (!isAnswered) return;

    if (isLastChallenge) {
      const totalAnswered = results.length;
      const accuracy =
        totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
      const totalTime = results.reduce(
        (acc, curr) => acc + curr.timeSpentSeconds,
        0
      );
      const avgResponseTime =
        totalAnswered > 0
          ? Number((totalTime / totalAnswered).toFixed(1))
          : 0;

      // Group into category breakdowns
      const catMap = new Map<CognitiveCategory, { total: number; correct: number; score: number; time: number }>();
      results.forEach((r) => {
        const existing = catMap.get(r.category) || { total: 0, correct: 0, score: 0, time: 0 };
        catMap.set(r.category, {
          total: existing.total + 1,
          correct: existing.correct + (r.isCorrect ? 1 : 0),
          score: existing.score + r.pointsEarned,
          time: existing.time + r.timeSpentSeconds,
        });
      });

      const categoryBreakdowns: CategoryBreakdown[] = Array.from(catMap.entries()).map(([cat, data]) => ({
        category: cat,
        totalChallenges: data.total,
        correct: data.correct,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        score: data.score,
        avgTime: data.total > 0 ? Number((data.time / data.total).toFixed(1)) : 0,
      }));

      onFinishGame({
        sessionType,
        selectedCategory,
        difficulty,
        score,
        correctAnswers: correctCount,
        incorrectAnswers: totalAnswered - correctCount,
        accuracy,
        currentStreak,
        bestStreak,
        totalTimeSeconds: Number(totalTime.toFixed(1)),
        averageResponseTime: avgResponseTime,
        completionRate: 100,
        categoryBreakdowns,
        history: results,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [
    isAnswered,
    isLastChallenge,
    results,
    correctCount,
    score,
    currentStreak,
    bestStreak,
    sessionType,
    selectedCategory,
    difficulty,
    onFinishGame,
  ]);

  // Keyboard navigation for standard options & advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (isAnswered) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextChallenge();
        }
        return;
      }

      if (currentChallenge?.kind === 'standard_choice' && currentChallenge.options) {
        const key = e.key.toLowerCase();
        let selectedIdx = -1;
        if (key === '1' || key === 'a') selectedIdx = 0;
        else if (key === '2' || key === 'b') selectedIdx = 1;
        else if (key === '3' || key === 'c') selectedIdx = 2;
        else if (key === '4' || key === 'd') selectedIdx = 3;

        if (selectedIdx !== -1 && currentChallenge.options[selectedIdx]) {
          e.preventDefault();
          handleSelectOption(currentChallenge.options[selectedIdx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentChallenge, handleNextChallenge, handleSelectOption]);

  const totalAnsweredSoFar = results.length;
  const currentAccuracy =
    totalAnsweredSoFar > 0
      ? Math.round((correctCount / totalAnsweredSoFar) * 100)
      : 100;

  if (!currentChallenge) return null;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
        <ScoreDisplay
          score={score}
          currentStreak={currentStreak}
          accuracy={currentAccuracy}
          lastPointsEarned={currentScoreBreakdown?.totalPoints}
        />

        <div className="flex items-center gap-3">
          <Timer elapsedSeconds={elapsedSeconds} isAnswered={isAnswered} />

          <button
            type="button"
            onClick={onAbandon}
            title="Exit Session"
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700/80 transition-colors focus:outline-none"
            aria-label="Exit Session"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        currentIndex={currentIndex}
        totalQuestions={challenges.length}
        results={results.map((r) => ({
          question: {
            id: r.challengeId,
            difficulty,
            question: r.title,
            options: [],
            correctAnswer: r.correctResponse,
            explanation: r.explanation,
          },
          selectedAnswer: r.userResponse,
          isCorrect: r.isCorrect,
          timeSpentSeconds: r.timeSpentSeconds,
          pointsEarned: r.pointsEarned,
        }))}
      />

      {/* Category & Challenge Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
              currentCategoryMeta?.badgeBg || 'bg-slate-800 text-slate-300'
            }`}
          >
            {currentCategoryMeta?.name || 'Cognitive Challenge'}
          </span>
          {currentChallenge.subType && (
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              • {currentChallenge.subType}
            </span>
          )}
        </div>

        <span
          className={`text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${
            difficulty === 'easy'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : difficulty === 'medium'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}
        >
          {difficulty}
        </span>
      </div>

      {/* Render Appropriate Gameplay Engine by Challenge Kind */}
      {currentChallenge.kind === 'working_memory' ? (
        <WorkingMemoryChallenge
          challenge={currentChallenge}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          scoreBreakdown={currentScoreBreakdown}
          onSelectOption={handleSelectOption}
          onNextChallenge={handleNextChallenge}
          isLastChallenge={isLastChallenge}
        />
      ) : currentChallenge.kind === 'sustained_attention' ? (
        <SustainedAttentionChallenge
          challenge={currentChallenge}
          isAnswered={isAnswered}
          onCompleteAttention={handleCompleteAttention}
          onNextChallenge={handleNextChallenge}
          isLastChallenge={isLastChallenge}
        />
      ) : currentChallenge.kind === 'problem_solving_multi_step' ? (
        <ProblemSolvingChallenge
          challenge={currentChallenge}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          scoreBreakdown={currentScoreBreakdown}
          onSelectOption={handleSelectOption}
          onNextChallenge={handleNextChallenge}
          isLastChallenge={isLastChallenge}
        />
      ) : (
        <StandardChoiceChallenge
          challenge={currentChallenge}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          scoreBreakdown={currentScoreBreakdown}
          onSelectOption={handleSelectOption}
          onNextChallenge={handleNextChallenge}
          isLastChallenge={isLastChallenge}
        />
      )}
    </div>
  );
};
