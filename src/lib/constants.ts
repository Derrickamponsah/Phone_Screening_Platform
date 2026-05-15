export const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Internship', 'NSS'] as const;

export const RESPONSE_TYPES = ['text', 'audio'] as const;

export const RECOMMENDATION_STYLES = {
  advance: {
    color: 'bg-green-100',
    textColor: 'text-green-800',
    badgeColor: 'bg-green-500',
  },
  hold: {
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    badgeColor: 'bg-yellow-500',
  },
  reject: {
    color: 'bg-red-100',
    textColor: 'text-red-800',
    badgeColor: 'bg-red-500',
  },
} as const;

export const LOADING_DELAY = {
  SHORT: 600,
  MEDIUM: 1000,
  LONG: 2000,
} as const;

export const QUESTION_GENERATION_DELAY = 800;
export const AI_ANALYSIS_DELAY = 1500;
