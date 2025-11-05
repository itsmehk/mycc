import type { QuizProgress } from '@/types';

const STORAGE_KEY = 'cardmatch_quiz_progress';

export const saveQuizProgress = (progress: QuizProgress): void => {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save quiz progress:', error);
  }
};

export const loadQuizProgress = (): QuizProgress | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load quiz progress:', error);
  }

  return null;
};

export const clearQuizProgress = (): void => {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz progress:', error);
  }
};
