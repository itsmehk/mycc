'use client';

import React, { useState, useEffect } from 'react';
import type { Question as QuestionType, QuestionOption, UserData } from '@/types';

interface QuestionProps {
  question: QuestionType;
  currentIndex: number;
  totalQuestions: number;
  onNext: (field: string, value: any) => void;
  onBack: () => void;
  userData: UserData;
}

export default function Question({ question, currentIndex, totalQuestions, onNext, onBack, userData }: QuestionProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const title = typeof question.title === 'function' ? question.title(userData.name || '') : question.title;

  useEffect(() => {
    setSelectedOptions([]);
    setInputValue('');
  }, [question.id]);

  const handleInputSubmit = () => {
    if (!inputValue.trim()) {
      alert('Please enter a value');
      return;
    }
    onNext(question.field, inputValue.trim());
  };

  const handleOptionToggle = (value: string, option: QuestionOption) => {
    const max = question.max || 1;
    const min = question.min || 1;

    let newSelection = [...selectedOptions];

    if (newSelection.includes(value)) {
      newSelection = newSelection.filter((v) => v !== value);
    } else {
      if (newSelection.length < max) {
        newSelection.push(value);
      } else if (max === 1) {
        newSelection = [value];
      }
    }

    setSelectedOptions(newSelection);
  };

  const handleMultipleSubmit = () => {
    const min = question.min || 1;
    if (selectedOptions.length < min) {
      alert(`Please select at least ${min} option(s)`);
      return;
    }
    onNext(question.field, selectedOptions);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 animate-fade-in">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-10 space-y-3">
          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card space-y-8 p-14 shadow-xl">
          <i className={`${question.icon} text-6xl text-primary-500`}></i>

          {question.type === 'input' ? (
            <>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
              <p className="text-lg text-gray-600">{question.subtitle}</p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={question.placeholder}
                className="input text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                autoFocus
              />
              <button onClick={handleInputSubmit} className="btn-primary w-full flex items-center justify-center gap-3">
                Continue
                <i className="fas fa-arrow-right"></i>
              </button>
            </>
          ) : (
            <>
              <div className="gradient-text text-4xl font-extrabold tracking-tight">{title}</div>
              <p className="text-lg text-gray-600">{question.subtitle}</p>

              {/* Options */}
              <div className={question.options && question.options.length > 5 ? 'grid md:grid-cols-2 gap-4' : 'space-y-3'}>
                {question.options?.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionToggle(option.value, option)}
                    className={`option-btn ${selectedOptions.includes(option.value) ? 'selected' : ''} ${
                      question.options && question.options.length > 5 ? 'flex-col items-center text-center' : 'flex items-center'
                    }`}
                  >
                    <div className={`${
                      question.options && question.options.length > 5
                        ? 'w-16 h-16 mb-3 text-3xl'
                        : 'w-12 h-12 mr-4 text-2xl'
                    } bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center text-primary-800`}>
                      <i className={option.icon}></i>
                    </div>
                    <span className="font-bold">{option.label}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMultipleSubmit}
                disabled={selectedOptions.length < (question.min || 1)}
                className="btn-primary w-full flex items-center justify-center gap-3"
              >
                Continue
                <i className="fas fa-arrow-right"></i>
                {selectedOptions.length > 0 ? ` (${selectedOptions.length} selected)` : ` (Select ${question.min}${question.max !== question.min ? '-' + question.max : ''})`}
              </button>
            </>
          )}

          {currentIndex > 0 && (
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-primary-800 font-semibold mt-4">
              <i className="fas fa-arrow-left"></i>
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
