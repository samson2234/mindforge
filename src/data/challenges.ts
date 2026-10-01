import { CognitiveChallenge } from '../types/game';

export const ALL_CHALLENGES: CognitiveChallenge[] = [
  // =========================================================================
  // 1. CRITICAL THINKING
  // =========================================================================
  {
    id: 'ct_e1',
    category: 'critical_thinking',
    difficulty: 'easy',
    subType: 'Identifying Assumptions',
    title: 'Workplace Productivity Claim',
    prompt: 'Which underlying assumption is required for the manager’s conclusion to hold true?',
    contextInfo: 'A manager observed: "Since we allowed remote work on Fridays, our team completed 15% more support tickets on Fridays than on Thursdays. Therefore, working remotely inherently makes our employees more productive."',
    kind: 'standard_choice',
    options: [
      'The difficulty and volume of tickets received on Fridays were comparable to Thursdays.',
      'All employees prefer working remotely over working in the office.',
      'Friday has always been the most productive day of the week in every industry.',
      'Employees did not take any lunch breaks during remote Fridays.'
    ],
    correctAnswer: 'The difficulty and volume of tickets received on Fridays were comparable to Thursdays.',
    explanation: 'The manager assumes ticket complexity or incoming volume was equal. If Friday tickets were simpler or routine, the 15% increase in volume does not prove greater innate productivity.'
  },
  {
    id: 'ct_e2',
    category: 'critical_thinking',
    difficulty: 'easy',
    subType: 'Evaluating Evidence',
    title: 'Customer Satisfaction Survey',
    prompt: 'Which fact most strongly challenges the marketing team’s conclusion?',
    contextInfo: 'Marketing team claim: "95% of customers who filled out our post-service survey rated our software as excellent. Therefore, 95% of our entire customer base is highly satisfied."',
    kind: 'standard_choice',
    options: [
      'Only 2% of total customers chose to complete the optional survey (voluntary response bias).',
      'The survey was sent via email rather than postal mail.',
      'The software was updated three months prior to the survey.',
      'Competitor software has a 90% positive rating.'
    ],
    correctAnswer: 'Only 2% of total customers chose to complete the optional survey (voluntary response bias).',
    explanation: 'A 2% voluntary response sample suffers from self-selection bias: only extremely enthusiastic users typically respond, making it unrepresentative of the full customer base.'
  },
  {
    id: 'ct_m1',
    category: 'critical_thinking',
    difficulty: 'medium',
    subType: 'Correlation vs Causation',
    title: 'App Usage & Sleep Duration',
    prompt: 'Which critique best demonstrates the flaw in this conclusion?',
    contextInfo: 'A wellness company states: "Our research found that individuals who log into our meditation app for 10 minutes before bed report sleeping an average of 45 minutes longer. Therefore, our app directly cures insomnia."',
    kind: 'standard_choice',
    options: [
      'People who regularly commit to pre-bed meditation may already practice better overall sleep hygiene.',
      'The app is priced higher than standard alarm clock applications.',
      'Some people prefer listening to white noise machines instead of guided meditation.',
      'The study only looked at adult participants rather than adolescents.'
    ],
    correctAnswer: 'People who regularly commit to pre-bed meditation may already practice better overall sleep hygiene.',
    explanation: 'This highlights a confounding variable. Conscientious users who prioritize sleep hygiene (consistent schedules, dark rooms, low caffeine) may sleep longer regardless of the specific app.'
  },
  {
    id: 'ct_m2',
    category: 'critical_thinking',
    difficulty: 'medium',
    subType: 'Detecting Flawed Reasoning',
    title: 'Corporate Expense Policy',
    prompt: 'What logical fallacy does the director commit in this statement?',
    contextInfo: 'The director argues: "Either we eliminate the annual professional development stipend completely, or the company will face severe bankruptcy within six months."',
    kind: 'standard_choice',
    options: [
      'False Dilemma (forcing two extreme alternatives while ignoring viable middle grounds).',
      'Circular Reasoning (repeating the premise as the conclusion).',
      'Ad Hominem (attacking the character of the employees).',
      'Appeal to Tradition (arguing that old policies must never change).'
    ],
    correctAnswer: 'False Dilemma (forcing two extreme alternatives while ignoring viable middle grounds).',
    explanation: 'The argument artificially presents an all-or-nothing dichotomy (cut the stipend entirely or go bankrupt), omitting realistic alternatives such as reducing overhead, renegotiating vendor contracts, or partial subsidies.'
  },
  {
    id: 'ct_h1',
    category: 'critical_thinking',
    difficulty: 'hard',
    subType: 'Evaluating Competing Hypotheses',
    title: 'City Traffic Congestion Pilot',
    prompt: 'Which finding provides the strongest evidence that the congestion pricing caused the traffic decline, rather than outside factors?',
    contextInfo: 'City X instituted a $5 downtown congestion toll in September. By November, downtown vehicle entries fell by 22%. Critics argued the drop was caused by rising seasonal fuel prices and increased autumn remote work.',
    kind: 'standard_choice',
    options: [
      'Adjacent untolled perimeter districts saw traffic increase by 14% as drivers actively bypassed the toll boundary.',
      'Public bus ridership in City X remained completely flat between September and November.',
      'City Y, which has identical fuel prices and remote work rates but no toll, experienced zero drop in downtown traffic.',
      'The revenue generated by the toll exceeded municipal forecasts by 18%.'
    ],
    correctAnswer: 'City Y, which has identical fuel prices and remote work rates but no toll, experienced zero drop in downtown traffic.',
    explanation: 'City Y serves as an effective control group. Because City Y shared identical fuel and remote-work fluctuations yet saw no traffic drop, the toll policy in City X is isolated as the causal factor.'
  },
  {
    id: 'ct_h2',
    category: 'critical_thinking',
    difficulty: 'hard',
    subType: 'Detecting Subtle Contradictions',
    title: 'Quarterly Executive Summary',
    prompt: 'Which pair of statements in the corporate report creates an irreconcilable factual contradiction?',
    contextInfo: 'Statement 1: "Total product manufacturing units increased by 20% compared to Q2."\nStatement 2: "Every unit produced in Q3 was sold immediately without accumulating inventory."\nStatement 3: "Average selling price per unit remained strictly constant at $100 across both Q2 and Q3."\nStatement 4: "Total top-line gross sales revenue in Q3 declined by 10% compared to Q2."',
    kind: 'standard_choice',
    options: [
      'Statements 1, 2, and 3 contradict Statement 4 (20% more units sold at the same price must produce 20% higher revenue, not a 10% decline).',
      'Statements 1 and 2 contradict Statement 3.',
      'Statements 2 and 4 contradict Statement 1.',
      'Statements 3 and 4 contradict Statement 2.'
    ],
    correctAnswer: 'Statements 1, 2, and 3 contradict Statement 4 (20% more units sold at the same price must produce 20% higher revenue, not a 10% decline).',
    explanation: 'Mathematically: Revenue = Quantity Sold × Price. If quantity increased 20% and price was unchanged, revenue must mathematically rise by 20%. A 10% revenue decline directly contradicts these premises.'
  },

  // =========================================================================
  // 2. PROBLEM SOLVING (Multi-step & resource allocation)
  // =========================================================================
  {
    id: 'ps_e1',
    category: 'problem_solving',
    difficulty: 'easy',
    subType: 'Resource Optimization',
    title: 'Emergency Generator Fuel Allocation',
    prompt: 'Determine the maximum total operating hours achievable under strict fuel and power constraints.',
    contextInfo: 'You have 100 liters of diesel fuel during a power outage. Generator A uses 10 liters/hour and powers the Medical Ward (essential). Generator B uses 15 liters/hour and powers the Communications Center (essential). Both must run simultaneously for at least 3 hours. How many additional hours can Generator A run alone with the remaining fuel?',
    kind: 'standard_choice',
    options: [
      '2.5 hours',
      '2.0 hours',
      '3.0 hours',
      '4.0 hours'
    ],
    correctAnswer: '2.5 hours',
    explanation: 'Initial 3 hours: Gen A uses 3 × 10 = 30L; Gen B uses 3 × 15 = 45L. Total used = 75L. Remaining fuel = 100 − 75 = 25L. Running Generator A alone: 25L ÷ 10L/hr = 2.5 hours.'
  },
  {
    id: 'ps_e2',
    category: 'problem_solving',
    difficulty: 'easy',
    subType: 'Multi-Decision Optimization',
    title: 'Cloud Server Resource Allocation',
    prompt: 'Configure server instances to achieve at least 300,000 requests/hour with minimum hourly cost.',
    contextInfo: 'Scenario: Budget capacity is flexible, but you need at least 300k req/hr. Instance Types:\n• Micro ($2/hr, handles 50k req/hr)\n• Standard ($5/hr, handles 150k req/hr)\n• Enterprise ($12/hr, handles 350k req/hr)',
    kind: 'problem_solving_multi_step',
    problemSolvingConfig: {
      scenario: 'Select the instance configuration that meets the minimum 300k requests/hour requirement at the absolute lowest cost.',
      constraints: ['Total throughput >= 300k req/hr', 'Minimize total cost'],
      budgetOrCapacity: 20,
      budgetLabel: 'Hourly Budget ($)',
      minTargetYield: 300,
      items: [
        { id: 'micro', name: 'Micro Instance (50k req)', cost: 2, yield: 50, unit: 'units' },
        { id: 'standard', name: 'Standard Instance (150k req)', cost: 5, yield: 150, unit: 'units' },
        { id: 'enterprise', name: 'Enterprise Instance (350k req)', cost: 12, yield: 350, unit: 'units' }
      ],
      optimalSolutionSummary: 'Two Standard Instances = 2 × 150k = 300k req/hr for 2 × $5 = $10/hr. (Enterprise is $12; 6 Micros is $12).'
    },
    options: [
      '2 Standard Instances ($10/hr, 300k req/hr)',
      '1 Enterprise Instance ($12/hr, 350k req/hr)',
      '6 Micro Instances ($12/hr, 300k req/hr)',
      '1 Standard + 3 Micro Instances ($11/hr, 300k req/hr)'
    ],
    correctAnswer: '2 Standard Instances ($10/hr, 300k req/hr)',
    explanation: '2 Standard instances exactly satisfy the 300k req/hr requirement at only $10/hour ($5 each), which is cheaper than Enterprise ($12) or 6 Micros ($12).'
  },
  {
    id: 'ps_m1',
    category: 'problem_solving',
    difficulty: 'medium',
    subType: 'Task Scheduling & Bottlenecks',
    title: 'Assembly Pipeline Bottleneck',
    prompt: 'What is the minimum total minutes required to finish 3 units from start to finish?',
    contextInfo: 'A manufacturing pipeline has 3 sequential stations: Cutting (4 min/unit), Welding (7 min/unit), Inspection (3 min/unit). Each station can process only 1 unit at a time. A unit must finish Cutting before Welding, and finish Welding before Inspection.',
    kind: 'standard_choice',
    options: [
      '28 minutes',
      '25 minutes',
      '30 minutes',
      '35 minutes'
    ],
    correctAnswer: '28 minutes',
    explanation: 'Welding is the pipeline bottleneck (7 min/unit). Unit 1 finishes Cutting at min 4, Welding at min 11, Inspection at min 14. Unit 2 finishes Welding at min 18. Unit 3 finishes Welding at min 25, and finishes Inspection at min 28.'
  },
  {
    id: 'ps_m2',
    category: 'problem_solving',
    difficulty: 'medium',
    subType: 'Knapsack Optimization',
    title: 'Cargo Payload Weight & Value Tradeoff',
    prompt: 'Which payload selection yields the highest total utility value without exceeding the 40 kg limit?',
    contextInfo: 'Drone payload limit is strictly 40 kg. Available Cargo:\n• Item A: 15 kg, Value 45 (Ratio: 3.0)\n• Item B: 20 kg, Value 58 (Ratio: 2.9)\n• Item C: 10 kg, Value 32 (Ratio: 3.2)\n• Item D: 25 kg, Value 70 (Ratio: 2.8)',
    kind: 'standard_choice',
    options: [
      'Items A + B + C (Weight: 45 kg - Exceeds limit)',
      'Items A + B (Weight: 35 kg, Value: 103)',
      'Items A + C + (none remaining) (Weight: 25 kg, Value: 77)',
      'Items B + C + (none) (Weight: 30 kg, Value: 90)'
    ],
    correctAnswer: 'Items A + B (Weight: 35 kg, Value: 103)',
    explanation: 'Items A + B weigh 15 + 20 = 35 kg (≤ 40 kg limit) and deliver 45 + 58 = 103 value. Choosing B + C yields 90; C + D weighs 35 kg but yields only 102 value.'
  },
  {
    id: 'ps_h1',
    category: 'problem_solving',
    difficulty: 'hard',
    subType: 'Network Flow Optimization',
    title: 'Data Center Water Cooling Loop',
    prompt: 'What is the maximum liters/minute of coolant that can safely flow from Primary Pump S to Terminal Sink T?',
    contextInfo: 'Network capacities: Pipe S→A: 20 L/min, Pipe S→B: 30 L/min. From node A: A→B can carry 10 L/min, A→T can carry 15 L/min. From node B: B→T can carry 25 L/min.',
    kind: 'standard_choice',
    options: [
      '40 L/min',
      '35 L/min',
      '45 L/min',
      '50 L/min'
    ],
    correctAnswer: '40 L/min',
    explanation: 'Calculate cut at terminal T: pipes arriving at T are A→T (capacity 15) and B→T (capacity 25). The total capacity entering T cannot exceed 15 + 25 = 40 L/min. S can deliver 20 to A (15 goes to T, 5 goes to B), and S delivers 20 to B, so B has 20 + 5 = 25 which exactly fills B→T. Maximum flow = 40 L/min.'
  },

  // =========================================================================
  // 3. WORKING MEMORY
  // =========================================================================
  {
    id: 'wm_e1',
    category: 'working_memory',
    difficulty: 'easy',
    subType: 'Sequence Recall',
    title: '5-Digit Numeric Stream',
    prompt: 'Memorize the 5-digit security code before it disappears, then select the exact sequence.',
    contextInfo: 'Focus carefully on the sequence and digit order.',
    kind: 'working_memory',
    memoryConfig: {
      items: ['7', '3', '9', '2', '5'],
      displayDurationMs: 3500,
      manipulationType: 'recall',
      promptInstructions: 'Recall the 5 numbers in their exact order of appearance.'
    },
    options: [
      '7 → 3 → 9 → 2 → 5',
      '7 → 9 → 3 → 2 → 5',
      '7 → 3 → 2 → 9 → 5',
      '3 → 7 → 9 → 5 → 2'
    ],
    correctAnswer: '7 → 3 → 9 → 2 → 5',
    explanation: 'The original sequence displayed was 7 → 3 → 9 → 2 → 5.'
  },
  {
    id: 'wm_e2',
    category: 'working_memory',
    difficulty: 'easy',
    subType: 'Positional Retrieval',
    title: 'Spatial Letter Array',
    prompt: 'Memorize the 5 letters and their exact positions.',
    contextInfo: 'Identify the letter that occupied the 4th position.',
    kind: 'working_memory',
    memoryConfig: {
      items: ['M', 'R', 'K', 'T', 'B'],
      displayDurationMs: 3500,
      manipulationType: 'position_recall',
      promptInstructions: 'Which letter was in the 4th position (from left to right)?'
    },
    options: ['T', 'K', 'R', 'B'],
    correctAnswer: 'T',
    explanation: 'The sequence was [1:M, 2:R, 3:K, 4:T, 5:B]. The 4th position was T.'
  },
  {
    id: 'wm_m1',
    category: 'working_memory',
    difficulty: 'medium',
    subType: 'Reverse Manipulation',
    title: 'Backward Numeric Manipulation',
    prompt: 'Memorize the numbers, then mentally reverse their order.',
    contextInfo: 'You must output the sequence in reverse order (last number first).',
    kind: 'working_memory',
    memoryConfig: {
      items: ['4', '1', '8', '3', '9', '6'],
      displayDurationMs: 4000,
      manipulationType: 'reverse',
      promptInstructions: 'What is the sequence reversed (from end to start)?'
    },
    options: [
      '6 → 9 → 3 → 8 → 1 → 4',
      '6 → 3 → 9 → 8 → 1 → 4',
      '9 → 6 → 3 → 8 → 4 → 1',
      '6 → 9 → 8 → 3 → 1 → 4'
    ],
    correctAnswer: '6 → 9 → 3 → 8 → 1 → 4',
    explanation: 'Original: 4 → 1 → 8 → 3 → 9 → 6. Mental reverse: 6 → 9 → 3 → 8 → 1 → 4.'
  },
  {
    id: 'wm_m2',
    category: 'working_memory',
    difficulty: 'medium',
    subType: 'Sort Manipulation',
    title: 'Numerical Sorting in Memory',
    prompt: 'Memorize the unsorted digits, then mentally sort them from lowest to highest.',
    contextInfo: 'Hold all 6 digits and arrange them ascending.',
    kind: 'working_memory',
    memoryConfig: {
      items: ['8', '2', '9', '1', '6', '4'],
      displayDurationMs: 4000,
      manipulationType: 'sort_numeric',
      promptInstructions: 'Arrange the remembered digits in ascending order (lowest to highest):'
    },
    options: [
      '1 → 2 → 4 → 6 → 8 → 9',
      '1 → 2 → 6 → 4 → 8 → 9',
      '1 → 4 → 2 → 6 → 8 → 9',
      '2 → 1 → 4 → 6 → 8 → 9'
    ],
    correctAnswer: '1 → 2 → 4 → 6 → 8 → 9',
    explanation: 'The digits were 8, 2, 9, 1, 6, 4. Sorted ascending: 1, 2, 4, 6, 8, 9.'
  },
  {
    id: 'wm_h1',
    category: 'working_memory',
    difficulty: 'hard',
    subType: 'Dual-Stream Symbol & Number Recall',
    title: 'Interleaved Symbol-Number Filter',
    prompt: 'Memorize the 7-item mixed sequence and isolate the symbols.',
    contextInfo: 'Filter out the numbers and recall only the geometric symbols in order.',
    kind: 'working_memory',
    memoryConfig: {
      items: ['▲', '8', '■', '3', '★', '7', '●'],
      displayDurationMs: 4500,
      manipulationType: 'recall',
      promptInstructions: 'Recall ONLY the geometric symbols in their exact order of appearance:'
    },
    options: [
      '▲ → ■ → ★ → ●',
      '▲ → ★ → ■ → ●',
      '■ → ▲ → ★ → ●',
      '▲ → ■ → ● → ★'
    ],
    correctAnswer: '▲ → ■ → ★ → ●',
    explanation: 'The original sequence was ▲, 8, ■, 3, ★, 7, ●. Suppressing the numeric distractors leaves ▲ → ■ → ★ → ●.'
  },

  // =========================================================================
  // 4. SUSTAINED ATTENTION
  // =========================================================================
  {
    id: 'sa_e1',
    category: 'sustained_attention',
    difficulty: 'easy',
    subType: 'Target Vigilance',
    title: 'Gold Star Vigilance Task',
    prompt: 'React as fast as possible whenever the Gold Star (★) appears, while ignoring distractors.',
    contextInfo: 'Rule: Target = ★. Distractors = ▲, ■, ●. Click "TARGET HIT" immediately when the target appears.',
    kind: 'sustained_attention',
    attentionConfig: {
      targetDescription: 'Gold Star (★)',
      targetSymbol: '★',
      targetColor: 'text-amber-400',
      trialDurationMs: 1200,
      trials: [
        { id: 't1', symbol: '▲', color: 'text-sky-400', isTarget: false },
        { id: 't2', symbol: '★', color: 'text-amber-400', isTarget: true },
        { id: 't3', symbol: '■', color: 'text-purple-400', isTarget: false },
        { id: 't4', symbol: '●', color: 'text-emerald-400', isTarget: false },
        { id: 't5', symbol: '★', color: 'text-amber-400', isTarget: true },
        { id: 't6', symbol: '▲', color: 'text-sky-400', isTarget: false },
        { id: 't7', symbol: '■', color: 'text-purple-400', isTarget: false },
        { id: 't8', symbol: '★', color: 'text-amber-400', isTarget: true }
      ]
    },
    explanation: 'Sustained attention requires selective vigilance to target stimuli (★) while inhibiting motor responses to frequent distractors.'
  },
  {
    id: 'sa_m1',
    category: 'sustained_attention',
    difficulty: 'medium',
    subType: 'Conjunction Search',
    title: 'Blue Triangle Conjunction Task',
    prompt: 'Respond ONLY to the Blue Triangle (▲). Do not react to Red Triangles or Blue Squares.',
    contextInfo: 'Conjunction rule: Both Shape (Triangle ▲) AND Color (Blue) must match.',
    kind: 'sustained_attention',
    attentionConfig: {
      targetDescription: 'Blue Triangle (▲)',
      targetSymbol: '▲',
      targetColor: 'text-blue-400',
      trialDurationMs: 950,
      trials: [
        { id: 't1', symbol: '▲', color: 'text-red-400', isTarget: false },
        { id: 't2', symbol: '■', color: 'text-blue-400', isTarget: false },
        { id: 't3', symbol: '▲', color: 'text-blue-400', isTarget: true },
        { id: 't4', symbol: '●', color: 'text-blue-400', isTarget: false },
        { id: 't5', symbol: '▲', color: 'text-red-400', isTarget: false },
        { id: 't6', symbol: '▲', color: 'text-blue-400', isTarget: true },
        { id: 't7', symbol: '■', color: 'text-emerald-400', isTarget: false },
        { id: 't8', symbol: '▲', color: 'text-blue-400', isTarget: true },
        { id: 't9', symbol: '★', color: 'text-blue-400', isTarget: false }
      ]
    },
    explanation: 'Conjunction search forces the brain to bind color and shape features simultaneously before executing a response.'
  },
  {
    id: 'sa_h1',
    category: 'sustained_attention',
    difficulty: 'hard',
    subType: 'Continuous Go/No-Go Interference',
    title: 'High-Paced Even-Cyan Rapid Filter',
    prompt: 'React strictly to EVEN numbers colored CYAN. Suppress reactions to Odd Cyan or Even Pink numbers.',
    contextInfo: 'Rule: Value % 2 === 0 AND Color === Cyan. Display is rapid (750ms).',
    kind: 'sustained_attention',
    attentionConfig: {
      targetDescription: 'Even Cyan Number (e.g. 2, 4, 8 in Cyan)',
      targetSymbol: '4',
      targetColor: 'text-cyan-400',
      trialDurationMs: 800,
      trials: [
        { id: 't1', symbol: '3', color: 'text-cyan-400', isTarget: false },
        { id: 't2', symbol: '6', color: 'text-pink-400', isTarget: false },
        { id: 't3', symbol: '8', color: 'text-cyan-400', isTarget: true },
        { id: 't4', symbol: '7', color: 'text-cyan-400', isTarget: false },
        { id: 't5', symbol: '2', color: 'text-cyan-400', isTarget: true },
        { id: 't6', symbol: '4', color: 'text-pink-400', isTarget: false },
        { id: 't7', symbol: '6', color: 'text-cyan-400', isTarget: true },
        { id: 't8', symbol: '9', color: 'text-cyan-400', isTarget: false },
        { id: 't9', symbol: '4', color: 'text-cyan-400', isTarget: true },
        { id: 't10', symbol: '8', color: 'text-pink-400', isTarget: false }
      ]
    },
    explanation: 'Requires intense cognitive control: inhibiting dominant impulse responses when one feature matches but the second feature fails.'
  },

  // =========================================================================
  // 5. LOGICAL THINKING
  // =========================================================================
  {
    id: 'lt_e1',
    category: 'logical_thinking',
    difficulty: 'easy',
    subType: 'Deductive Syllogism',
    title: 'Categorical Syllogism',
    prompt: 'Which conclusion must be true based strictly on the premises?',
    contextInfo: 'Premise 1: All conifers are perennial plants.\nPremise 2: All cedar trees are conifers.\nPremise 3: The tree in the front courtyard is a cedar.',
    kind: 'standard_choice',
    options: [
      'The tree in the front courtyard is a perennial plant.',
      'All perennial plants are cedar trees.',
      'Some conifers are not perennial plants.',
      'The courtyard tree is the tallest tree on the property.'
    ],
    correctAnswer: 'The tree in the front courtyard is a perennial plant.',
    explanation: 'Transitive deduction: Cedar → Conifer → Perennial. Since courtyard tree is a Cedar, it is conclusively a Perennial plant.'
  },
  {
    id: 'lt_e2',
    category: 'logical_thinking',
    difficulty: 'easy',
    subType: 'Relational Ordering',
    title: 'Office Floor Order',
    prompt: 'Which floor does David work on?',
    contextInfo: 'Five colleagues (Alice, Bob, Carol, David, Elena) work on floors 1 through 5 of a building.\n• Elena works on floor 5.\n• Alice works immediately above Bob.\n• Bob works on floor 2.\n• Carol works on a lower floor than David.',
    kind: 'standard_choice',
    options: ['Floor 4', 'Floor 1', 'Floor 3', 'Floor 2'],
    correctAnswer: 'Floor 4',
    explanation: 'Elena = Floor 5. Bob = Floor 2. Alice is immediately above Bob, so Alice = Floor 3. Remaining floors are 1 and 4. Since Carol works on a lower floor than David, Carol = Floor 1 and David = Floor 4.'
  },
  {
    id: 'lt_m1',
    category: 'logical_thinking',
    difficulty: 'medium',
    subType: 'Conditional Modus Tollens',
    title: 'Automated Facility Security Protocol',
    prompt: 'What valid logical conclusion follows from these statements?',
    contextInfo: 'Rule: "If the perimeter pressure sensor detects breach, the containment gates lock automatically within 5 seconds."\nFact: "At 03:00, the containment gates were verified to be completely unlocked."',
    kind: 'standard_choice',
    options: [
      'The perimeter pressure sensor did not detect a breach within the preceding 5 seconds.',
      'The perimeter pressure sensor must be malfunctioning.',
      'The containment gates will lock in the next 10 seconds.',
      'An intruder has successfully bypassed the facility gates.'
    ],
    correctAnswer: 'The perimeter pressure sensor did not detect a breach within the preceding 5 seconds.',
    explanation: 'Modus Tollens (If P then Q; Not Q; Therefore Not P). Breach → Locked. Since Not Locked, Not Breach.'
  },
  {
    id: 'lt_m2',
    category: 'logical_thinking',
    difficulty: 'medium',
    subType: 'Truth-Teller / Liar Logic',
    title: 'The Island of Veracity',
    prompt: 'What are the true identities of Knight X and Knight Y?',
    contextInfo: 'Knights always tell the truth; Knaves always lie.\nPerson X says: "At least one of us is a Knave."\nPerson Y remains silent.',
    kind: 'standard_choice',
    options: [
      'X is a Knight and Y is a Knave.',
      'Both X and Y are Knaves.',
      'Both X and Y are Knights.',
      'X is a Knave and Y is a Knight.'
    ],
    correctAnswer: 'X is a Knight and Y is a Knave.',
    explanation: 'If X were a Knave, his statement ("at least one is a Knave") would be true, which contradicts a Knave lying. Thus X must be a Knight telling the truth. Since his statement is true, someone must be a Knave; since X is a Knight, Y must be the Knave.'
  },
  {
    id: 'lt_h1',
    category: 'logical_thinking',
    difficulty: 'hard',
    subType: 'Compound Multi-Condition Chains',
    title: 'Project Lead Selection Matrix',
    prompt: 'Which candidate must be selected as the Project Lead?',
    contextInfo: 'Exactly one candidate (P, Q, R, or S) is chosen.\nRule 1: If P is chosen, then Q is not chosen.\nRule 2: Either R is chosen or S is chosen, but not both.\nRule 3: If Q is not chosen, then R is not chosen.\nRule 4: S is disqualified due to a scheduling conflict.',
    kind: 'standard_choice',
    options: ['Candidate Q', 'Candidate P', 'Candidate R', 'None can be chosen'],
    correctAnswer: 'Candidate Q',
    explanation: 'From Rule 4: S is not chosen. By Rule 2 (R or S, not both), since S is not chosen, R must be chosen. By Rule 3 contrapositive (If R is chosen, then Q must be chosen), Q must be chosen! Checking Rule 1: if Q is chosen, P is not chosen. Candidate Q is validly selected.'
  },

  // =========================================================================
  // 6. WORD PUZZLES
  // =========================================================================
  {
    id: 'wp_e1',
    category: 'word_puzzles',
    difficulty: 'easy',
    subType: 'Verbal Analogy',
    title: 'Architectural Functional Analogy',
    prompt: 'Complete the relationship analogy:',
    contextInfo: 'Architect : Building :: Sculptor : ?',
    kind: 'standard_choice',
    options: ['Statue', 'Chisel', 'Museum', 'Clay'],
    correctAnswer: 'Statue',
    explanation: 'An architect designs/creates a building; a sculptor creates a statue. (Creator to primary finished creation).'
  },
  {
    id: 'wp_e2',
    category: 'word_puzzles',
    difficulty: 'easy',
    subType: 'Anagram Deciphering',
    title: 'Auditory Anagram',
    prompt: 'Rearrange the letters in "LISTEN" to form a common adjective describing quietness.',
    contextInfo: 'Letters: L - I - S - T - E - N',
    kind: 'standard_choice',
    options: ['SILENT', 'TINSEL', 'ENLIST', 'NESTLE'],
    correctAnswer: 'SILENT',
    explanation: 'Rearranging the letters L-I-S-T-E-N yields SILENT, which precisely describes quietness.'
  },
  {
    id: 'wp_m1',
    category: 'word_puzzles',
    difficulty: 'medium',
    subType: 'Antonym Reasoning',
    title: 'Dual Semantic Relational Pair',
    prompt: 'Complete the proportional analogy:',
    contextInfo: 'EPHEMERAL : PERPETUAL :: DISCORDANT : ?',
    kind: 'standard_choice',
    options: ['HARMONIOUS', 'TEMPORARY', 'STRIDENT', 'CHAOTIC'],
    correctAnswer: 'HARMONIOUS',
    explanation: 'Ephemeral (short-lived) is the direct antonym of Perpetual (everlasting). Therefore, Discordant (harsh/clashing) pairs with its antonym Harmonious.'
  },
  {
    id: 'wp_m2',
    category: 'word_puzzles',
    difficulty: 'medium',
    subType: 'Missing Letter Pattern',
    title: 'Lexical Sequence Deduction',
    prompt: 'Identify the missing letter that completes a valid word in both directions or fits the root:',
    contextInfo: 'Sequence: P - H - I - L - O - S - O - ? - H - Y',
    kind: 'standard_choice',
    options: ['P', 'T', 'N', 'R'],
    correctAnswer: 'P',
    explanation: 'The word is PHILOSOPHY. The missing letter between O and H is P.'
  },
  {
    id: 'wp_h1',
    category: 'word_puzzles',
    difficulty: 'hard',
    subType: 'Higher-Order Semantic Bridge',
    title: 'Abstract Epistemological Analogy',
    prompt: 'Identify the word that completes the cognitive relationship:',
    contextInfo: 'SYLLOGISM : LOGIC :: HYPOTHESIS : ?',
    kind: 'standard_choice',
    options: ['EMPIRICISM', 'INTUITION', 'DOGMA', 'ANECDOTE'],
    correctAnswer: 'EMPIRICISM',
    explanation: 'A syllogism is the fundamental deductive structure within formal logic; a hypothesis is the fundamental inductive premise tested within scientific empiricism.'
  },

  // =========================================================================
  // 7. PATTERN RECOGNITION
  // =========================================================================
  {
    id: 'pr_e1',
    category: 'pattern_recognition',
    difficulty: 'easy',
    subType: 'Geometric Progression',
    title: 'Exponential Doubling Sequence',
    prompt: 'Identify the next term in the sequence:',
    contextInfo: '2 → 4 → 8 → 16 → ?',
    kind: 'standard_choice',
    options: ['32', '24', '30', '36'],
    correctAnswer: '32',
    explanation: 'Each number is multiplied by 2 (doubled). 16 × 2 = 32.'
  },
  {
    id: 'pr_e2',
    category: 'pattern_recognition',
    difficulty: 'easy',
    subType: 'Arithmetic Progression',
    title: 'Constant Difference Step',
    prompt: 'Identify the missing term:',
    contextInfo: '3 → 7 → 11 → 15 → ?',
    kind: 'standard_choice',
    options: ['19', '18', '20', '21'],
    correctAnswer: '19',
    explanation: 'The common difference is +4 at each step. 15 + 4 = 19.'
  },
  {
    id: 'pr_m1',
    category: 'pattern_recognition',
    difficulty: 'medium',
    subType: 'Fibonacci Sequence',
    title: 'Sum of Previous Two',
    prompt: 'Identify the next number in the progression:',
    contextInfo: '2 → 3 → 5 → 8 → 13 → ?',
    kind: 'standard_choice',
    options: ['21', '18', '20', '23'],
    correctAnswer: '21',
    explanation: 'Each term is the sum of the two preceding terms: 2+3=5, 3+5=8, 5+8=13, so 8 + 13 = 21.'
  },
  {
    id: 'pr_m2',
    category: 'pattern_recognition',
    difficulty: 'medium',
    subType: 'Alternating Operations',
    title: 'Alternating Multiplier & Subtraction',
    prompt: 'Find the next term:',
    contextInfo: '3 → 6 → 5 → 10 → 9 → 18 → ?',
    kind: 'standard_choice',
    options: ['17', '16', '19', '36'],
    correctAnswer: '17',
    explanation: 'Alternating operations: ×2 then −1 (3×2=6, 6−1=5, 5×2=10, 10−1=9, 9×2=18). Next step is 18 − 1 = 17.'
  },
  {
    id: 'pr_h1',
    category: 'pattern_recognition',
    difficulty: 'hard',
    subType: 'Interleaved Dual Sequences',
    title: 'Interwoven Compound Progression',
    prompt: 'Determine the missing term in this interleaved sequence:',
    contextInfo: '2 → 10 → 4 → 20 → 8 → 40 → ?',
    kind: 'standard_choice',
    options: ['16', '12', '50', '80'],
    correctAnswer: '16',
    explanation: 'Two interleaved sequences: Odd positions (2, 4, 8, ...) double. Even positions (10, 20, 40, ...) double. Next is 7th position (odd): 8 × 2 = 16.'
  },
  {
    id: 'pr_h2',
    category: 'pattern_recognition',
    difficulty: 'hard',
    subType: 'Digital Sum Self-Addition',
    title: 'Recursive Digit-Sum Progression',
    prompt: 'Identify the next number in the sequence:',
    contextInfo: '11 → 13 → 17 → 25 → 32 → 37 → ?',
    kind: 'standard_choice',
    options: ['47', '42', '45', '49'],
    correctAnswer: '47',
    explanation: 'Each term adds the sum of its own digits: 11+(1+1)=13; 13+(1+3)=17; 17+(1+7)=25; 25+(2+5)=32; 32+(3+2)=37; 37+(3+7) = 47.'
  }
];
