'use client';

import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-800 to-primary-500 flex items-center justify-center z-[9999] animate-fade-in">
      <div className="text-center space-y-8 text-white">
        <div className="w-20 h-20 border-6 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Analyzing Your Spending Pattern
            <span className="animate-pulse inline-block ml-1">...</span>
          </h2>
          <p className="text-lg opacity-90 font-medium">Matching you with the best credit cards</p>
        </div>
      </div>
    </div>
  );
}
