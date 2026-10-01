import { CategoryInfo, CognitiveCategory } from '../types/game';

export const COGNITIVE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'critical_thinking',
    name: 'Critical Thinking',
    shortDesc: 'Evaluate evidence, spot hidden assumptions, and detect flawed reasoning.',
    longDesc: 'Dismantle arguments, distinguish facts from unsupported claims, identify logical fallacies, and choose the most defensible conclusion based strictly on provided premises.',
    iconName: 'Compass',
    color: 'text-sky-400',
    borderColor: 'border-sky-500/40',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    mechanicNote: 'Evidence Analysis & Premise Evaluation',
  },
  {
    id: 'problem_solving',
    name: 'Problem Solving',
    shortDesc: 'Optimize resources, schedule multi-step plans, and satisfy rigid constraints.',
    longDesc: 'Navigate complex resource limits, budgeting, route scheduling, and combinatorial trade-offs to arrive at mathematically optimal solutions.',
    iconName: 'Boxes',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    mechanicNote: 'Interactive Constraint & Resource Optimization',
  },
  {
    id: 'working_memory',
    name: 'Working Memory',
    shortDesc: 'Retain, reorder, and manipulate mental data streams under cognitive load.',
    longDesc: 'Store sequences of numbers, letters, and spatial symbols in active memory, then perform mental transformations like reverse recall, sorting, or target retrieval.',
    iconName: 'Brain',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    mechanicNote: 'Timed Memorization & Mental Manipulation',
  },
  {
    id: 'sustained_attention',
    name: 'Sustained Attention',
    shortDesc: 'Rapidly detect target stimuli while suppressing distractor interference.',
    longDesc: 'Maintain high vigilance across continuous visual trials. React precisely to target criteria while avoiding false alarms and minimizing reaction latency.',
    iconName: 'Target',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    mechanicNote: 'Rapid Continuous Target Response & Distractor Suppression',
  },
  {
    id: 'logical_thinking',
    name: 'Logical Thinking',
    shortDesc: 'Solve deductive syllogisms, conditional chains, and relational orderings.',
    longDesc: 'Apply formal logic rules: identify valid deductions, navigate conditional statements (If P then Q), and determine absolute relational truths.',
    iconName: 'Cpu',
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    mechanicNote: 'Deductive Syllogisms & Conditional Chains',
  },
  {
    id: 'word_puzzles',
    name: 'Word Puzzles',
    shortDesc: 'Solve verbal analogies, decipher anagrams, and reason through word relationships.',
    longDesc: 'Test verbal fluency and semantic reasoning through analogies, anagram restructuring, letter manipulation, and synonym/antonym relational networks.',
    iconName: 'Sparkles',
    color: 'text-teal-400',
    borderColor: 'border-teal-500/40',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    mechanicNote: 'Verbal Analogies, Anagrams & Lexical Relations',
  },
  {
    id: 'pattern_recognition',
    name: 'Pattern Recognition',
    shortDesc: 'Decode complex numeric, geometric, and rule-based visual progressions.',
    longDesc: 'Uncover governing mathematical formulas, alternating transformations, second-order differences, and visual sequence progressions.',
    iconName: 'Activity',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    mechanicNote: 'Mathematical & Progression Rule Induction',
  },
];

export const getCategoryById = (categoryId: CognitiveCategory): CategoryInfo => {
  const found = COGNITIVE_CATEGORIES.find((c) => c.id === categoryId);
  if (!found) return COGNITIVE_CATEGORIES[0];
  return found;
};
