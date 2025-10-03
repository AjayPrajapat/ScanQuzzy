// Shared TypeScript interfaces used across the ScanQuzzy app.

export type QuestionType = 'mcq' | 'true_false' | 'cloze' | 'short_answer' | 'matching';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  options?: QuestionOption[];
  answer?: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
  estimatedTime?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization?: string;
  preferredLanguage: string;
}

export interface AnalyticsSummary {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  attempts: number;
  streak: number;
  lastUpdated: string;
}
