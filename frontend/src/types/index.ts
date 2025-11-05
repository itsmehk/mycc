export interface Question {
  id: string;
  type: 'input' | 'multiple';
  icon: string;
  title: string | ((name: string) => string);
  subtitle: string;
  field: string;
  displayName: string;
  min?: number;
  max?: number;
  placeholder?: string;
  options?: QuestionOption[];
}

export interface QuestionOption {
  value: string;
  label: string;
  icon: string;
  minIncome?: number;
  score?: number;
  count?: number;
  amount?: number;
}

export interface UserData {
  name?: string;
  income?: string;
  incomeValue?: number;
  creditScore?: string;
  creditScoreValue?: number;
  existingCards?: string;
  cardCount?: number;
  spendingCategories?: string[];
  monthlySpend?: string;
  monthlySpendValue?: number;
  paymentPreference?: string[];
  primaryGoal?: string | string[];
}

export interface CardPerk {
  icon: string;
  title: string;
  desc: string;
}

export interface CreditCard {
  name: string;
  bank: string;
  bankCode: string;
  cardImageKey: string;
  minIncome: number;
  minCreditScore: number;
  annualFee: number;
  estimatedValue: number;
  effectiveRewardRate: number;
  features: string[];
  detailedPerks: CardPerk[];
  type: 'standard' | 'premium';
  categories: string[];
  goals: string[];
  paymentMethods: string[];
  affiliateTag: string;
  partnerId: string;
  applyUrl: string;
}

export interface CardRecommendation extends CreditCard {
  matchScore: number;
  eligibility: 'high' | 'medium' | 'low';
  matchCriteria: string[];
  breakEvenMonthlySpend?: number;
}

export interface RecommendationRequest {
  userData: UserData;
}

export interface RecommendationResponse {
  recommendations: CardRecommendation[];
  userProfile: UserData;
  gamifiedTagline: string;
}

export interface QuizProgress {
  userData: UserData;
  currentQuestionIndex: number;
  selectedMulti: string[];
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
}
