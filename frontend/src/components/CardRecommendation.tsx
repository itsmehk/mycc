'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { CardRecommendation as CardRecommendationType } from '@/types';
import { formatCurrency, getEligibilityColor, getEligibilityText } from '@/lib/utils';
import CardModal from './CardModal';

interface CardRecommendationProps {
  card: CardRecommendationType;
  rank: number;
}

// Card images mapping - using local optimized SVG images
const cardImages: Record<string, string> = {
  hdfc_infinia: '/images/cards/hdfc_infinia.svg',
  sbi_cashback: '/images/cards/sbi_cashback.svg',
  axis_magnus: '/images/cards/axis_magnus.svg',
  amazon_icici: '/images/cards/amazon_icici.svg',
  hdfc_swiggy: '/images/cards/hdfc_swiggy.svg',
  amex_platinum: '/images/cards/amex_platinum.svg',
  hsbc_live: '/images/cards/hsbc_live.svg',
};

const bankLogos: Record<string, string> = {
  hdfc: '/images/banks/hdfc.svg',
  sbi: '/images/banks/sbi.svg',
  axis: '/images/banks/axis.svg',
  icici: '/images/banks/icici.svg',
  amex: '/images/banks/amex.svg',
  hsbc: '/images/banks/hsbc.svg',
  kotak: '/images/banks/kotak.svg',
  idfc: '/images/banks/idfc.svg',
  standardchartered: '/images/banks/standardchartered.svg',
};

export default function CardRecommendation({ card, rank }: CardRecommendationProps) {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const cardImageUrl = cardImages[card.cardImageKey] || 'https://via.placeholder.com/350x220?text=Card+Image';
  const bankLogoUrl = bankLogos[card.bankCode] || '';

  return (
    <>
      <div className="card space-y-6 hover:shadow-xl transition-shadow animate-slide-up">
        {/* Rank Badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shadow-md ${
              rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
              rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
              rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
              'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800'
            }`}>
              #{rank}
            </div>
            {bankLogoUrl && (
              <Image src={bankLogoUrl} alt={card.bank} width={80} height={40} className="h-8 w-auto object-contain" />
            )}
          </div>
          <div className="text-lg font-bold text-green-600">{Math.round(card.matchScore)}% Match</div>
        </div>

        {/* Card Image */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
          <Image
            src={cardImageUrl}
            alt={card.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Card Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900">{card.name}</h3>
            <p className="text-base text-gray-600 font-semibold">{card.bank}</p>
          </div>

          {/* Match Score */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                style={{ width: `${Math.min(card.matchScore, 100)}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-green-600">{Math.round(card.matchScore)}%</span>
          </div>

          {/* Why This Card */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Why this card?</h4>
            <div className="flex flex-wrap gap-2">
              {card.matchCriteria.slice(0, 3).map((criterion, idx) => (
                <span key={idx} className="badge bg-primary-50 text-primary-800 border border-primary-200">
                  <i className="fas fa-check text-xs"></i>
                  {criterion}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Key Features</h4>
            <ul className="space-y-2">
              {card.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <i className="fas fa-star text-primary-500 mt-0.5"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Annual Benefit & Spend Details */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {/* Annual Benefit Range with Info Icon */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-700 font-bold uppercase">Annual Benefit Range</span>
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="relative text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <i className="fas fa-info-circle text-sm"></i>
                    {showTooltip && (
                      <div className="absolute left-0 top-6 w-72 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl z-50 animate-fade-in">
                        <div className="font-bold mb-1">How we calculate:</div>
                        <div className="space-y-1 text-xs leading-relaxed">
                          <div>• Annual Spend × Reward Rate = Base Value</div>
                          <div>• Range: ±20% around your personalized estimate</div>
                          <div>• Your spend: {card.monthlySpendRange ? formatCurrency(card.monthlySpendRange.monthlyMin) : 'N/A'} - {card.monthlySpendRange ? formatCurrency(card.monthlySpendRange.monthlyMax) : 'N/A'}/month</div>
                          <div>• Reward rate: {(card.effectiveRewardRate * 100).toFixed(2)}%</div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="text-2xl font-extrabold text-green-700">
                {card.estimatedValueRange ? (
                  `${formatCurrency(card.estimatedValueRange.min)} - ${formatCurrency(card.estimatedValueRange.max)}`
                ) : (
                  formatCurrency(card.estimatedValue)
                )}
              </div>
            </div>

            {/* Spend Required Section with Visual Bar */}
            {card.monthlySpendRange && (
              <div className="space-y-2">
                <div className="text-xs text-gray-700 font-bold uppercase">Monthly Spend Required</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">To achieve range:</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(card.monthlySpendRange.monthlyMin)} - {formatCurrency(card.monthlySpendRange.monthlyMax)}
                    </span>
                  </div>
                  {card.monthlySpendRange.breakEven && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Break-even spend:</span>
                      <span className="font-bold text-orange-600">
                        {formatCurrency(card.monthlySpendRange.breakEven)}/month
                      </span>
                    </div>
                  )}

                  {/* Visual Progress Bar */}
                  <div className="pt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low spend</span>
                      <span>High spend</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Annual Fee & Eligibility Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-600 font-semibold uppercase">Annual Fee</div>
                <div className="text-lg font-bold text-gray-900">
                  {card.annualFee === 0 ? 'FREE' : formatCurrency(card.annualFee)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 font-semibold uppercase">Your Eligibility</div>
                <div className={`text-sm font-bold badge ${getEligibilityColor(card.eligibility)}`}>
                  {getEligibilityText(card.eligibility)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => setShowModal(true)} className="btn-secondary text-sm py-3">
              <i className="fas fa-info-circle mr-2"></i>
              Learn More
            </button>
            <button
              onClick={() => window.open(card.applyUrl, '_blank')}
              className="btn-primary text-sm py-3"
            >
              Apply Now
              <i className="fas fa-external-link-alt ml-2"></i>
            </button>
          </div>
        </div>
      </div>

      {showModal && <CardModal card={card} onClose={() => setShowModal(false)} />}
    </>
  );
}
