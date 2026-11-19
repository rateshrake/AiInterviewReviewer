export type PageId = 
  | 'dashboard'
  | 'interview-setup'
  | 'interview-room'
  | 'performance-analytics'
  | 'my-interviews'
  | 'subscription'
  | 'settings'
  | 'interview-report';

export type ExperienceLevel = 'Fresher – 1 Year' | '1 – 3 Years' | '3 – 5 Years' | '5+ Years';
export type DifficultyLevel = '🟢 Easy' | '📊 Medium' | '🔴 Hard';
export type TargetPackage = '₹ 4 – 8 LPA' | '₹ 8 – 15 LPA' | '₹ 15 – 30 LPA' | '₹ 30+ LPA';
export type InterviewType = 'Technical' | 'HR' | 'Behavioral' | 'Mixed';

export interface InterviewConfig {
  resumeName: string | null;
  resumeSize: string | null;
  jobDescription: string;
  experienceLevel: ExperienceLevel;
  difficultyLevel: DifficultyLevel;
  targetPackage: TargetPackage;
  interviewType: InterviewType;
  enableCoding: boolean;
}

export interface QuestionItem {
  id: number;
  question: string;
  category: 'Technical' | 'Coding' | 'System Design' | 'Behavioral';
  tips: string;
  starterCode?: string;
  sampleAnswer?: string;
  candidateCode?: string;
  score?: number;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  timeAgo: string;
  score: number;
  scoreColor: 'primary' | 'secondary' | 'success';
  icon: string;
  type: string;
}

export interface AIProviderConfig {
  apiKey: string;
  model: 'GPT-4o' | 'GPT-4o-mini' | 'Claude 3.5 Sonnet' | 'Gemini 1.5 Pro';
  voicePersona: 'Alloy (Balanced)' | 'Echo (Warm)' | 'Shimmer (Professional)';
  isConnected: boolean;
}
