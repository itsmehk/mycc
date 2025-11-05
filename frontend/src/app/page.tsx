'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Landing from '@/components/Landing';
import Question from '@/components/Question';
import LoadingScreen from '@/components/LoadingScreen';
import Results from '@/components/Results';
import ProgressTracker from '@/components/ProgressTracker';
import ProgressPill from '@/components/ProgressPill';
import { getRecommendations } from '@/lib/api';
import { saveQuizProgress, loadQuizProgress, clearQuizProgress } from '@/lib/storage';
import { scrollToTop } from '@/lib/utils';
import type { Question as QuestionType, UserData, CardRecommendation, QuizProgress } from '@/types';
import { questions as questionsData } from '@/lib/questions';

type AppState = 'landing' | 'quiz' | 'loading' | 'results';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [userData, setUserData] = useState<UserData>({});
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<CardRecommendation[]>([]);
  const [gamifiedTagline, setGamifiedTagline] = useState('');
  const [questions] = useState<QuestionType[]>(questionsData);

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadQuizProgress();
    if (saved) {
      setUserData(saved.userData);
      setCurrentQuestionIndex(saved.currentQuestionIndex);
      setSelectedMulti(saved.selectedMulti);
      if (saved.currentQuestionIndex >= 0) {
        setAppState('quiz');
      }
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (currentQuestionIndex >= 0 && appState === 'quiz') {
      const progress: QuizProgress = {
        userData,
        currentQuestionIndex,
        selectedMulti,
      };
      saveQuizProgress(progress);
    }
  }, [userData, currentQuestionIndex, selectedMulti, appState]);

  const startQuiz = () => {
    setAppState('quiz');
    setCurrentQuestionIndex(0);
    scrollToTop('smooth');
  };

  const handleNext = async (field: string, value: any) => {
    // Update user data
    const newUserData = { ...userData, [field]: value };

    // Update numeric values based on question options
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 'multiple' && currentQuestion.options) {
      const selectedValues = Array.isArray(value) ? value : [value];

      selectedValues.forEach((v) => {
        const option = currentQuestion.options?.find((o) => o.value === v);
        if (option) {
          if (option.minIncome) newUserData.incomeValue = option.minIncome;
          if (option.score) newUserData.creditScoreValue = option.score;
          if (option.count !== undefined) newUserData.cardCount = option.count;
          if (option.amount) newUserData.monthlySpendValue = option.amount;
        }
      });
    }

    setUserData(newUserData);
    setSelectedMulti([]);

    // Move to next question or show results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      scrollToTop('smooth');
    } else {
      // Show loading screen
      setAppState('loading');
      scrollToTop('instant');

      try {
        // Fetch recommendations from backend
        const response = await getRecommendations({ userData: newUserData });
        setRecommendations(response.recommendations);
        setGamifiedTagline(response.gamifiedTagline);

        // Show loading for at least 2 seconds
        setTimeout(() => {
          setAppState('results');
          scrollToTop('instant');
          clearQuizProgress();
        }, 2000);
      } catch (error) {
        console.error('Failed to get recommendations:', error);
        // Fallback: show error or default results
        alert('Failed to load recommendations. Please try again.');
        setAppState('quiz');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      scrollToTop('smooth');
    }
  };

  const handleRestart = () => {
    setAppState('landing');
    setCurrentQuestionIndex(-1);
    setUserData({});
    setSelectedMulti([]);
    setRecommendations([]);
    clearQuizProgress();
    scrollToTop('instant');
  };

  return (
    <div className="min-h-screen">
      <Header />

      {appState === 'quiz' && (
        <ProgressTracker
          visible={true}
          userData={userData}
          questions={questions}
          currentIndex={currentQuestionIndex}
        />
      )}

      {appState === 'landing' && <Landing onStartQuiz={startQuiz} />}

      {appState === 'quiz' && currentQuestionIndex >= 0 && (
        <>
          <Question
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onNext={handleNext}
            onBack={handleBack}
            userData={userData}
          />
          <ProgressPill
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            visible={true}
          />
        </>
      )}

      {appState === 'loading' && <LoadingScreen />}

      {appState === 'results' && (
        <Results
          recommendations={recommendations}
          userData={userData}
          questions={questions}
          gamifiedTagline={gamifiedTagline}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
