'use client';

import React, { useEffect } from 'react';
import type { CardRecommendation } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CardModalProps {
  card: CardRecommendation;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: CardModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Generate recommendation reason
  const getRecommendationReason = () => {
    const reasons = [];
    if (card.matchScore >= 80) {
      reasons.push('This card is a perfect match for your spending profile');
    } else if (card.matchScore >= 60) {
      reasons.push('This card aligns well with your preferences');
    } else {
      reasons.push('This card offers good value for your needs');
    }

    if (card.eligibility === 'high') {
      reasons.push('you have excellent eligibility');
    } else if (card.eligibility === 'medium') {
      reasons.push('you meet the key requirements');
    }

    if (card.breakEvenMonthlySpend && card.monthlySpendRange) {
      reasons.push(`your spending pattern makes it worthwhile (break-even at ${formatCurrency(card.breakEvenMonthlySpend)}/month)`);
    }

    return reasons.join(', ') + '.';
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] animate-fade-in"
      onClick={onClose}
    >
      {/* Right-side drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 bg-white w-full md:w-[600px] lg:w-[700px] overflow-y-auto shadow-2xl animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-500 text-white p-6 sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <h2 className="text-2xl font-extrabold mb-1">{card.name}</h2>
          <p className="text-base opacity-95">{card.bank}</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm">
            <i className="fas fa-star"></i>
            <span>{Math.round(card.matchScore)}% Match</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Why We Recommend */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
            <h3 className="text-base font-bold text-blue-900 mb-2 flex items-center gap-2">
              <i className="fas fa-lightbulb"></i>
              Why We Recommend This Card
            </h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              {getRecommendationReason()}
            </p>
          </div>

          {/* Match Criteria */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Key Matches</h3>
            <div className="flex flex-wrap gap-2">
              {card.matchCriteria.map((criterion, idx) => (
                <span key={idx} className="badge bg-primary-50 text-primary-800 border border-primary-200">
                  <i className="fas fa-check text-xs"></i>
                  {criterion}
                </span>
              ))}
            </div>
          </div>

          {/* Detailed Perks */}
          <div>
            <h3 className="text-lg font-bold text-primary-800 mb-4 flex items-center gap-2">
              <i className="fas fa-star"></i>
              Detailed Benefits & Perks
            </h3>
            <div className="space-y-3">
              {card.detailedPerks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-l-4 border-primary-500">
                  <div className="w-10 h-10 min-w-[2.5rem] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-primary-800">
                    <i className={perk.icon}></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 mb-1">{perk.title}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{perk.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 p-6 bg-primary-50 rounded-2xl border border-primary-200">
            <div>
              <div className="text-sm font-bold text-gray-600 uppercase mb-1">Annual Fee</div>
              <div className="text-2xl font-extrabold text-gray-900">
                {card.annualFee === 0 ? 'FREE' : formatCurrency(card.annualFee)}
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-600 uppercase mb-1">Estimated Value</div>
              <div className="text-2xl font-extrabold text-green-600">{formatCurrency(card.estimatedValue)}</div>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-600 uppercase mb-1">Min Income Required</div>
              <div className="text-2xl font-extrabold text-gray-900">{formatCurrency(card.minIncome)}</div>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-600 uppercase mb-1">Min Credit Score</div>
              <div className="text-2xl font-extrabold text-gray-900">{card.minCreditScore}+</div>
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => window.open(card.applyUrl, '_blank')}
            className="btn-primary w-full text-lg"
          >
            Apply for {card.name}
            <i className="fas fa-external-link-alt ml-3"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
