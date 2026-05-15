import { MOCK_SUBMISSIONS } from '@/data/submissions';

const STORAGE_KEYS = {
  SCREENINGS: 'screenings',
  SUBMISSIONS: 'phone_screening_submissions',
  THEME: 'theme',
} as const;

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return null;
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
  }
}

export function updateLocalStorage<T extends Record<string, any>>(
  key: string,
  updates: Partial<T>
): T | null {
  const current = getFromLocalStorage<T>(key);
  if (!current) return null;

  const updated = { ...current, ...updates };
  setToLocalStorage(key, updated);
  return updated;
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error);
  }
}

export function getAllScreenings(): Record<string, any> {
  return getFromLocalStorage<Record<string, any>>(STORAGE_KEYS.SCREENINGS) || {};
}

export function getAllSubmissions(): Record<string, any> {
  const local = getFromLocalStorage<Record<string, any>>(STORAGE_KEYS.SUBMISSIONS);
  if (!local || Object.keys(local).length === 0) {
    setToLocalStorage(STORAGE_KEYS.SUBMISSIONS, MOCK_SUBMISSIONS);
    return MOCK_SUBMISSIONS;
  }
  return local;
}

export function saveScreening(jobId: string, screening: any) {
  const screenings = getAllScreenings();
  const updated = { ...screenings, [jobId]: screening };
  setToLocalStorage(STORAGE_KEYS.SCREENINGS, updated);
}

export function getScreening(jobId: string) {
  const screenings: Record<string, any> = getAllScreenings();
  return screenings[jobId] || null;
}

export function saveSubmission(submission: any) {
  const submissions = getAllSubmissions();
  const updated = { ...submissions, [submission.id]: submission };
  setToLocalStorage(STORAGE_KEYS.SUBMISSIONS, updated);
}

export function getSubmissionsForJob(jobId: string) {
  const submissions = getAllSubmissions();
  return Object.values(submissions).filter((sub: any) => sub.jobId === jobId);
}

export function getSubmission(submissionId: string) {
  const submissions: Record<string, any> = getAllSubmissions();
  return submissions[submissionId] || null;
}

export const storageKeys = STORAGE_KEYS;
