'use client';

import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: 'fas fa-user-check', text: 'Analyzing your profile' },
    { icon: 'fas fa-calculator', text: 'Computing eligibility scores' },
    { icon: 'fas fa-chart-line', text: 'Calculating reward potential' },
    { icon: 'fas fa-star', text: 'Ranking best matches' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-800 to-primary-500 flex items-center justify-center z-[9999] animate-fade-in">
      <div className="text-center space-y-8 text-white max-w-md px-6">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-6 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-6 border-white/20 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className={`${steps[currentStep].icon} text-3xl`}></i>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Finding Your Perfect Match
          </h2>
          <div className="space-y-2">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center gap-3 text-base transition-all duration-300 ${
                  idx <= currentStep ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                }`}
              >
                <i className={`${step.icon} ${idx === currentStep ? 'animate-pulse' : ''}`}></i>
                <span className="font-medium">{step.text}</span>
                {idx < currentStep && <i className="fas fa-check-circle text-green-300"></i>}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
