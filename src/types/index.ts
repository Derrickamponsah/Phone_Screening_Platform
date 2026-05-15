export type ResponseType = 'text' | 'audio';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Internship' | 'NSS';
export type RecommendationType = 'advance' | 'reject' | 'hold';

export interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: EmploymentType;
  description: string;
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  responseType: ResponseType;
  isCustom: boolean;
}

export interface Screening {
  id: string;
  jobId: string;
  questions: Question[];
  createdAt: string;
}

export interface Answer {
  questionId: string;
  responseType: 'text' | 'audio';
  value: string;
}

export interface Submission {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  answers: Answer[];
  submittedAt: string;
}

export interface AnalysisResult {
  summary: string;
  strengths: string[];
  concerns: string[];
  recommendation: RecommendationType;
}

export interface ScreeningState {
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  currentQuestionIndex: number;
  answers: Answer[];
  isComplete: boolean;
}
