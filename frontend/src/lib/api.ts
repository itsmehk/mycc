import axios from 'axios';
import type { RecommendationRequest, RecommendationResponse, Question, CreditCard } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Health check
export const healthCheck = async (): Promise<{ status: string; version: string }> => {
  const response = await api.get('/health');
  return response.data;
};

// Get all questions
export const getQuestions = async (): Promise<Question[]> => {
  const response = await api.get('/api/v1/questions');
  return response.data;
};

// Get all credit cards
export const getAllCards = async (): Promise<CreditCard[]> => {
  const response = await api.get('/api/v1/cards');
  return response.data;
};

// Get card recommendations
export const getRecommendations = async (
  request: RecommendationRequest
): Promise<RecommendationResponse> => {
  const response = await api.post('/api/v1/recommendations', request);
  return response.data;
};

// Analytics endpoint (optional)
export const trackEvent = async (event: string, data: Record<string, any>): Promise<void> => {
  try {
    await api.post('/api/v1/analytics/track', { event, data });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

export default api;
