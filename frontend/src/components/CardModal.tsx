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

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-800 to-primary-500 text-white p-8 rounded-t-3xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          <h2 className="text-3xl font-extrabold mb-2">{card.name}</h2>
          <p className="text-lg opacity-95">{card.bank}</p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Detailed Perks */}
          <div>
            <h3 className="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
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
