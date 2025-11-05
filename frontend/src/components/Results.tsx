'use client';

import React, { useState } from 'react';
import type { CardRecommendation as CardRecommendationType, UserData, Question } from '@/types';
import CardRecommendation from './CardRecommendation';

interface ResultsProps {
  recommendations: CardRecommendationType[];
  userData: UserData;
  questions: Question[];
  gamifiedTagline: string;
  onRestart: () => void;
}

export default function Results({ recommendations, userData, questions, gamifiedTagline, onRestart }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'premium' | 'standard'>('all');

  const filteredCards = activeTab === 'all'
    ? recommendations
    : recommendations.filter((card) => card.type === activeTab);

  const getProfileOverview = () => {
    return questions.map((q) => {
      const field = q.field as keyof UserData;
      const value = userData[field];

      if (q.type === 'input') {
        return { label: q.displayName, value: String(value) };
      } else if (q.type === 'multiple' && q.options) {
        const values = Array.isArray(value) ? value : [value];
        const labels = values
          .map((v) => {
            const option = q.options?.find((o) => o.value === v);
            return option ? option.label : v;
          })
          .filter(Boolean);
        return { label: q.displayName, values: labels };
      }
      return null;
    }).filter(Boolean);
  };

  const profileOverview = getProfileOverview();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full border border-green-300">
            <i className="fas fa-circle-check text-lg"></i>
            <span className="font-bold">Your Smart Match Is Ready</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Your Personalized Credit Card Picks, <span className="gradient-text">{userData.name}</span>!
          </h1>
          <p className="text-xl text-gray-600 font-semibold">{gamifiedTagline}</p>
        </div>

        {/* Profile Overview */}
        <div className="card space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <i className="fas fa-clipboard-check text-3xl text-primary-500"></i>
            <h2 className="text-2xl font-bold text-gray-900">Your Profile Overview - Recommendation Basis</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileOverview.map((item: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="text-sm font-bold text-gray-600 uppercase tracking-wide">{item.label}</div>
                {item.value ? (
                  <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {item.values?.map((val: string, vidx: number) => (
                      <span key={vidx} className="badge bg-primary-50 text-primary-800 border border-primary-200">
                        {val}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-4">
          {[
            { id: 'all', label: 'All Cards', count: recommendations.length },
            { id: 'premium', label: 'Premium', count: recommendations.filter((c) => c.type === 'premium').length },
            { id: 'standard', label: 'Standard', count: recommendations.filter((c) => c.type === 'standard').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-800 to-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-500'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredCards.map((card, idx) => (
            <CardRecommendation key={card.name} card={card} rank={idx + 1} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="card space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <i className="fas fa-circle-question text-3xl text-primary-500"></i>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                question: 'Does applying impact my credit score?',
                answer:
                  'Most banks perform a "hard inquiry" when you apply for a credit card, which may temporarily lower your credit score by a few points. However, checking your eligibility through bank pre-qualification tools (soft inquiry) does not impact your score.',
              },
              {
                question: 'Can I get multiple cards?',
                answer:
                  "Yes! Many users have multiple credit cards to maximize benefits across different spending categories. However, it's recommended to space out applications by 2-3 months to minimize credit score impact.",
              },
              {
                question: 'Why were these cards chosen for me?',
                answer:
                  'Our algorithm analyzes your income, credit score, spending categories, payment preferences, and financial goals to match you with cards offering the best value. We also factor in your approval likelihood and break-even potential.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary-500 transition-all">
                <summary className="cursor-pointer p-5 font-bold text-gray-900 flex items-center justify-between group-open:bg-gradient-to-br group-open:from-blue-50 group-open:to-indigo-50 group-open:text-primary-800">
                  <span className="flex items-center gap-3">
                    <i className="fas fa-shield-halved text-primary-500"></i>
                    {faq.question}
                  </span>
                  <i className="fas fa-chevron-down transition-transform group-open:rotate-180"></i>
                </summary>
                <div className="p-5 bg-gray-50 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="card space-y-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">What would you like to do next?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn-secondary py-4">
              <i className="fas fa-envelope mr-2"></i>
              Email Results
            </button>
            <button className="btn-secondary py-4">
              <i className="fas fa-bell mr-2"></i>
              Get Alerts
            </button>
            <button className="btn-secondary py-4">
              <i className="fas fa-bookmark mr-2"></i>
              Save for Later
            </button>
            <button onClick={onRestart} className="bg-gray-100 text-gray-700 border-2 border-gray-300 font-bold py-4 px-6 rounded-xl hover:bg-gray-200">
              <i className="fas fa-rotate-right mr-2"></i>
              Start Over
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
