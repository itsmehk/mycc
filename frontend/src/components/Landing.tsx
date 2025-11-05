'use client';

import React from 'react';
import Image from 'next/image';

interface LandingProps {
  onStartQuiz: () => void;
}

export default function Landing({ onStartQuiz }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-100 to-indigo-100 text-primary-800 px-5 py-2.5 rounded-full border border-primary-300">
              <i className="fas fa-sparkles text-lg"></i>
              <span className="text-sm font-bold">AI-Powered • Community-Verified • 100% Free</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Find Your Perfect<br />
              <span className="gradient-text">Credit Card Match</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Get personalized recommendations based on your spending habits, income, and financial goals.
              Powered by real community insights from TechnoFino & Reddit.
            </p>

            <button
              onClick={onStartQuiz}
              className="btn-primary inline-flex items-center gap-3 text-lg shadow-xl"
            >
              Start My Card Match
              <i className="fas fa-arrow-right"></i>
            </button>

            <div className="space-y-3 text-base text-gray-600">
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-primary-500 text-lg"></i>
                <span>3-minute smart match</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-primary-500 text-lg"></i>
                <span>Eligibility transparency</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-primary-500 text-lg"></i>
                <span>No spam, ever</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
            <Image
              src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&q=80"
              alt="Person happily holding credit card"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { icon: 'fas fa-bolt', value: '3 min', label: 'Smart Match Time' },
            { icon: 'fas fa-credit-card', value: '20+', label: 'Verified Cards' },
            { icon: 'fas fa-circle-check', value: '95%', label: 'Approval Accuracy' },
          ].map((stat) => (
            <div key={stat.label} className="card text-center space-y-4 hover:shadow-lg transition-shadow">
              <i className={`${stat.icon} text-5xl text-primary-500`}></i>
              <div className="text-5xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-base font-semibold text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
