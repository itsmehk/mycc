'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-800 to-primary-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center shadow-md">
            <span className="text-2xl font-black text-primary-800">C</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CardMatch Pro</h1>
        </div>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full border border-white/30">
          <i className="fas fa-shield-halved"></i>
          <span className="text-sm font-semibold hidden sm:inline">Secure & Private</span>
        </div>
      </div>
    </header>
  );
}
