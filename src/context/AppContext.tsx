import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageId, 
  InterviewConfig, 
  QuestionItem, 
  RecentActivityItem, 
  AIProviderConfig 
} from '../types';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  config: InterviewConfig;
  updateConfig: (patch: Partial<InterviewConfig>) => void;
  
  // Live Interview Room State
  activeQuestionIndex: number;
  setActiveQuestionIndex: (idx: number) => void;
  questions: QuestionItem[];
  currentQuestion: QuestionItem;
  code: string;
  setCode: (code: string) => void;
  codeLanguage: string;
  setCodeLanguage: (lang: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  isMicMuted: boolean;
  setIsMicMuted: (muted: boolean) => void;
  isCameraOn: boolean;
  setIsCameraOn: (on: boolean) => void;
  sessionSeconds: number;
  formatSessionTime: () => string;
  runCodeOutput: string | null;
  setRunCodeOutput: (output: string | null) => void;
  runCode: () => void;
  nextQuestion: () => void;
  endSession: () => void;

  // Settings State
  aiConfig: AIProviderConfig;
  updateAiConfig: (patch: Partial<AIProviderConfig>) => void;

  // Subscription State
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  isProUser: boolean;
  upgradeToPro: () => void;

  // Recent Activity & Metrics
  recentActivities: RecentActivityItem[];
  addActivity: (activity: RecentActivityItem) => void;

  // Modals & UI
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  upgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
}

const defaultQuestions: QuestionItem[] = [
  {
    id: 1,
    question: "Welcome! Could you briefly introduce yourself and share a complex project where you had to make critical architectural trade-offs?",
    category: "Behavioral",
    tips: "Focus on the business problem, the alternatives evaluated, and the rationale behind your final choice using the STAR method.",
    starterCode: `# Introduction notes / quick diagram scratchpad\n`,
    score: 88,
  },
  {
    id: 2,
    question: "Great! Now, can you explain the difference between HashMap and HashSet in Java? How do they handle collisions under high load?",
    category: "Technical",
    tips: "Think about time complexity and use cases. Explain trade-offs clearly, mentioning buckets, treeification (O(log n)), and equals/hashCode contracts.",
    starterCode: `def twoSum(nums, target):\n    # Write your code here\n    pass\n`,
    score: 92,
  },
  {
    id: 3,
    question: "Let's code: Given an array of integers and a target sum, return indices of the two numbers such that they add up to target in O(n) time.",
    category: "Coding",
    tips: "A hash map lookup takes O(1) average time. Traverse once while storing complements in the dictionary.",
    starterCode: `def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n`,
    score: 85,
  },
  {
    id: 4,
    question: "How would you design a distributed rate limiter that supports 100,000 requests per second across multiple regional servers?",
    category: "System Design",
    tips: "Consider Token Bucket or Leaky Bucket with Redis clusters, Lua scripts for atomic updates, and local memory caching.",
    starterCode: `# System Architecture Outline\n# Client -> API Gateway -> Redis Cluster Rate Limiter\n`,
    score: 80,
  },
  {
    id: 5,
    question: "Tell me about a time you had a strong disagreement with a senior engineer or product lead on technical direction. How did you resolve it?",
    category: "Behavioral",
    tips: "Emphasize empathy, gathering empirical data/benchmarks, focusing on customer impact, and committing wholeheartedly once a decision was made.",
    starterCode: `# Situation:\n# Task:\n# Action:\n# Result:\n`,
    score: 89,
  }
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  
  // Config
  const [config, setConfig] = useState<InterviewConfig>({
    resumeName: 'Harish_SDE_Resume.pdf',
    resumeSize: '2.4 MB',
    jobDescription: 'Senior Full Stack Engineer - React, Node.js, Distributed Systems, Cloud Architecture',
    experienceLevel: '1 – 3 Years',
    difficultyLevel: '📊 Medium',
    targetPackage: '₹ 15 – 30 LPA',
    interviewType: 'Technical',
    enableCoding: true,
  });

  const updateConfig = (patch: Partial<InterviewConfig>) => {
    setConfig(prev => ({ ...prev, ...patch }));
  };

  // Interview Room State
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(1); // 0-indexed: 1 is Question 2 / 5
  const [questions] = useState<QuestionItem[]>(defaultQuestions);
  const currentQuestion = questions[activeQuestionIndex] || questions[0];

  const [code, setCode] = useState<string>(
    `def twoSum(nums, target):\n    # Write your code here\n    pass\n`
  );
  const [codeLanguage, setCodeLanguage] = useState<string>('Python');
  const [notes, setNotes] = useState<string>(
    `- HashMap stores key-value pairs; HashSet stores unique values.\n- HashMap uses Entry<K,V> objects internally.\n- HashSet is backed by a HashMap internally.\n- Collision resolution: Linked list until 8 elements, then converts to Red-Black tree.`
  );
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [sessionSeconds, setSessionSeconds] = useState<number>(932); // 15m 32s as shown in Stitch prototype
  const [runCodeOutput, setRunCodeOutput] = useState<string | null>(null);

  // Settings State
  const [aiConfig, setAiConfig] = useState<AIProviderConfig>({
    apiKey: 'sk-proj-9823489123849182391283',
    model: 'GPT-4o',
    voicePersona: 'Alloy (Balanced)',
    isConnected: true,
  });

  const updateAiConfig = (patch: Partial<AIProviderConfig>) => {
    setAiConfig(prev => ({ ...prev, ...patch }));
  };

  // Subscription State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isProUser, setIsProUser] = useState<boolean>(false);

  // Modals
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState<boolean>(false);

  // Recent Activities
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([
    {
      id: 'act-1',
      title: 'Technical Interview – Software Engineer',
      timeAgo: '2 hours ago',
      score: 78,
      scoreColor: 'secondary',
      icon: 'terminal',
      type: 'Technical'
    },
    {
      id: 'act-2',
      title: 'HR Round – Product Manager',
      timeAgo: '1 day ago',
      score: 85,
      scoreColor: 'success',
      icon: 'group',
      type: 'HR'
    },
    {
      id: 'act-3',
      title: 'Coding Interview – Full Stack Dev',
      timeAgo: '2 days ago',
      score: 72,
      scoreColor: 'primary',
      icon: 'code',
      type: 'Coding'
    }
  ]);

  const addActivity = (activity: RecentActivityItem) => {
    setRecentActivities(prev => [activity, ...prev]);
  };

  // Timer effect for Interview Room
  useEffect(() => {
    if (currentPage !== 'interview-room') return;
    const interval = setInterval(() => {
      setSessionSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPage]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setUpgradeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatSessionTime = () => {
    const hours = Math.floor(sessionSeconds / 3600);
    const minutes = Math.floor((sessionSeconds % 3600) / 60);
    const seconds = sessionSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
  };

  const runCode = () => {
    setRunCodeOutput('Compiling & executing test cases against AI benchmark...\n\nTest Case 1: nums=[2,7,11,15], target=9 -> Output: [0, 1] [PASSED]\nTest Case 2: nums=[3,2,4], target=6 -> Output: [1, 2] [PASSED]\nTest Case 3: nums=[3,3], target=6 -> Output: [0, 1] [PASSED]\n\nExecution Time: 34ms | Memory: 15.2MB\nStatus: 3/3 Test cases passed successfully!');
  };

  const nextQuestion = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
      setRunCodeOutput(null);
    } else {
      // Completed interview -> Go to report
      setCurrentPage('interview-report');
    }
  };

  const endSession = () => {
    setCurrentPage('interview-report');
  };

  const upgradeToPro = () => {
    setIsProUser(true);
    setUpgradeModalOpen(false);
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      config,
      updateConfig,
      activeQuestionIndex,
      setActiveQuestionIndex,
      questions,
      currentQuestion,
      code,
      setCode,
      codeLanguage,
      setCodeLanguage,
      notes,
      setNotes,
      isMicMuted,
      setIsMicMuted,
      isCameraOn,
      setIsCameraOn,
      sessionSeconds,
      formatSessionTime,
      runCodeOutput,
      setRunCodeOutput,
      runCode,
      nextQuestion,
      endSession,
      aiConfig,
      updateAiConfig,
      billingCycle,
      setBillingCycle,
      isProUser,
      upgradeToPro,
      recentActivities,
      addActivity,
      searchOpen,
      setSearchOpen,
      notificationsOpen,
      setNotificationsOpen,
      upgradeModalOpen,
      setUpgradeModalOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
