'use client';

import React from 'react';
import type { UserData, Question } from '@/types';

interface ProgressTrackerProps {
  visible: boolean;
  userData: UserData;
  questions: Question[];
  currentIndex: number;
}

export default function ProgressTracker({ visible, userData, questions, currentIndex }: ProgressTrackerProps) {
  if (!visible) return null;

  const getSelectedItems = () => {
    const items: React.ReactNode[] = [];

    questions.forEach((q, idx) => {
      if (idx < currentIndex && q.type === 'multiple' && q.options) {
        const field = q.field as keyof UserData;
        const value = userData[field];

        if (Array.isArray(value)) {
          value.forEach((v) => {
            const option = q.options?.find((o) => o.value === v);
            if (option) {
              items.push(
                <div key={`${q.id}-${v}`} className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 text-primary-800 px-3 py-1.5 rounded-full text-sm font-semibold border border-primary-300">
                  <i className={option.icon}></i>
                  <span>{option.label}</span>
                </div>
              );
            }
          });
        }
      }
    });

    return items;
  };

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
        <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">Your Selections:</span>
        {getSelectedItems()}
      </div>
    </div>
  );
}
