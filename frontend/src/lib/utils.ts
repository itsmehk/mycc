import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function calculateBreakEvenMonthlySpend(annualFee: number, rewardRate: number): number {
  if (rewardRate === 0 || annualFee === 0) return 0;
  return Math.ceil((annualFee / rewardRate) / 12);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getEligibilityColor(eligibility: 'high' | 'medium' | 'low'): string {
  switch (eligibility) {
    case 'high':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low':
      return 'bg-red-100 text-red-800 border-red-300';
  }
}

export function getEligibilityText(eligibility: 'high' | 'medium' | 'low'): string {
  switch (eligibility) {
    case 'high':
      return 'High Approval Chance';
    case 'medium':
      return 'Moderate Approval Chance';
    case 'low':
      return 'Lower Approval Chance';
  }
}

export function scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior });
  }
}
