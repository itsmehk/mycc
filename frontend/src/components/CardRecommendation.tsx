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
          <div className={`badge ${getEligibilityColor(card.eligibility)}`}>
            <i className="fas fa-check-circle"></i>
            {getEligibilityText(card.eligibility)}
          </div>
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

          {/* Annual Fee & Value */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="text-xs text-gray-600 font-semibold uppercase">Annual Fee</div>
              <div className="text-lg font-bold text-gray-900">
                {card.annualFee === 0 ? 'FREE' : formatCurrency(card.annualFee)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 font-semibold uppercase">Est. Value</div>
              <div className="text-lg font-bold text-green-600">{formatCurrency(card.estimatedValue)}</div>
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
