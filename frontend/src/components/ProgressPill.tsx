'use client';

import React from 'react';

interface ProgressPillProps {
  currentQuestion: number;
  totalQuestions: number;
  visible: boolean;
}

export default function ProgressPill({ currentQuestion, totalQuestions, visible }: ProgressPillProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-auto bg-gradient-to-r from-primary-800 to-primary-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-up">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <i className="fas fa-clipboard-check text-xl"></i>
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-base">
            {currentQuestion} of {totalQuestions} questions answered
          </div>
          <div className="text-sm opacity-90">Keep going!</div>
        </div>
      </div>
    </div>
  );
}
