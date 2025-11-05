// Card Database with comprehensive information
const cardDatabase = [
    {
        id: 'hdfc-infinia',
        name: 'HDFC Bank Infinia',
        bank: 'HDFC',
        category: 'premium',
        annualFee: 12500,
        feeWaiver: false,
        rewards: {
            dining: 5.0,
            travel: 5.0,
            shopping: 3.3,
            groceries: 3.3,
            fuel: 1.0,
            entertainment: 3.3,
            utilities: 1.0,
            default: 3.3
        },
        benefits: {
            loungeAccess: 'Unlimited domestic and international',
            milestone: 12500,
            insurance: 'Travel and purchase protection'
        },
        minIncome: 2400000,
        minCreditScore: 'excellent'
    },
    {
        id: 'axis-magnus',
        name: 'Axis Bank Magnus',
        bank: 'Axis',
        category: 'premium',
        annualFee: 12500,
        feeWaiver: false,
        rewards: {
            dining: 4.8,
            travel: 6.0,
            shopping: 2.4,
            groceries: 2.4,
            fuel: 2.4,
            entertainment: 4.0,
            utilities: 1.2,
            default: 2.4
        },
        benefits: {
            loungeAccess: 'Unlimited domestic, 8 international',
            milestone: 25000,
            insurance: 'Comprehensive travel insurance'
        },
        minIncome: 1800000,
        minCreditScore: 'excellent'
    },
    {
        id: 'amex-platinum',
        name: 'American Express Platinum Travel',
        bank: 'Amex',
        category: 'premium',
        annualFee: 5000,
        feeWaiver: true,
        rewards: {
            dining: 5.0,
            travel: 10.0,
            shopping: 1.5,
            groceries: 1.5,
            fuel: 1.0,
            entertainment: 3.0,
            utilities: 1.0,
            default: 1.5
        },
        benefits: {
            loungeAccess: '8 complimentary per year',
            milestone: 8000,
            insurance: 'Travel insurance and concierge'
        },
        minIncome: 900000,
        minCreditScore: 'good'
    },
    {
        id: 'sbi-simplyclick',
        name: 'SBI SimplyCLICK',
        bank: 'SBI',
        category: 'standard',
        annualFee: 499,
        feeWaiver: true,
        rewards: {
            dining: 2.5,
            travel: 2.5,
            shopping: 10.0,
            groceries: 1.0,
            fuel: 0.25,
            entertainment: 2.5,
            utilities: 1.0,
            default: 1.0
        },
        benefits: {
            loungeAccess: 'None',
            milestone: 2000,
            insurance: 'Basic protection'
        },
        minIncome: 300000,
        minCreditScore: 'fair'
    },
    {
        id: 'icici-amazonpay',
        name: 'ICICI Amazon Pay',
        bank: 'ICICI',
        category: 'standard',
        annualFee: 500,
        feeWaiver: true,
        rewards: {
            dining: 1.0,
            travel: 1.0,
            shopping: 5.0,
            groceries: 2.0,
            fuel: 1.0,
            entertainment: 2.0,
            utilities: 1.0,
            default: 1.0
        },
        benefits: {
            loungeAccess: 'None',
            milestone: 1500,
            insurance: 'Purchase protection'
        },
        minIncome: 360000,
        minCreditScore: 'fair'
    },
    {
        id: 'hsbc-cashback',
        name: 'HSBC Cashback',
        bank: 'HSBC',
        category: 'standard',
        annualFee: 999,
        feeWaiver: false,
        rewards: {
            dining: 1.5,
            travel: 1.5,
            shopping: 1.5,
            groceries: 10.0,
            fuel: 5.0,
            entertainment: 1.5,
            utilities: 1.5,
            default: 1.5
        },
        benefits: {
            loungeAccess: 'None',
            milestone: 0,
            insurance: 'Basic insurance'
        },
        minIncome: 500000,
        minCreditScore: 'good'
    },
    {
        id: 'kotak-royale',
        name: 'Kotak Royale Signature',
        bank: 'Kotak',
        category: 'premium',
        annualFee: 999,
        feeWaiver: true,
        rewards: {
            dining: 4.0,
            travel: 4.0,
            shopping: 2.0,
            groceries: 2.0,
            fuel: 2.5,
            entertainment: 3.0,
            utilities: 1.0,
            default: 2.0
        },
        benefits: {
            loungeAccess: '8 complimentary per year',
            milestone: 5000,
            insurance: 'Travel insurance'
        },
        minIncome: 600000,
        minCreditScore: 'good'
    },
    {
        id: 'idfc-select',
        name: 'IDFC FIRST SELECT',
        bank: 'IDFC',
        category: 'standard',
        annualFee: 500,
        feeWaiver: true,
        rewards: {
            dining: 10.0,
            travel: 3.0,
            shopping: 3.0,
            groceries: 2.0,
            fuel: 6.0,
            entertainment: 6.0,
            utilities: 1.5,
            default: 1.5
        },
        benefits: {
            loungeAccess: '4 complimentary per year',
            milestone: 2500,
            insurance: 'Air accident cover'
        },
        minIncome: 300000,
        minCreditScore: 'fair'
    }
];

// Calculate estimated reward range based on user's spending
function calculateEstimatedRange(card, userData) {
    const monthlySpend = userData.monthlySpend || 50000;
    const categories = userData.spendingCategories || [];

    // Distribute spending across categories
    const spendDistribution = {
        dining: categories.includes('dining') ? 0.20 : 0.05,
        travel: categories.includes('travel') ? 0.15 : 0.03,
        shopping: categories.includes('shopping') ? 0.25 : 0.10,
        groceries: categories.includes('groceries') ? 0.15 : 0.05,
        fuel: categories.includes('fuel') ? 0.10 : 0.03,
        entertainment: categories.includes('entertainment') ? 0.10 : 0.05,
        utilities: categories.includes('utilities') ? 0.05 : 0.02
    };

    // Calculate rewards for each category
    let monthlyRewards = 0;
    Object.keys(spendDistribution).forEach(category => {
        const categorySpend = monthlySpend * spendDistribution[category];
        const rewardRate = card.rewards[category] || card.rewards.default;
        monthlyRewards += (categorySpend * rewardRate) / 100;
    });

    // Annual rewards
    const annualRewards = monthlyRewards * 12;

    // Add milestone benefits
    const milestoneBonus = card.benefits.milestone || 0;

    // Calculate range (±15% variation to account for spending fluctuations)
    const minRewards = Math.round((annualRewards * 0.85) + milestoneBonus - card.annualFee);
    const maxRewards = Math.round((annualRewards * 1.15) + milestoneBonus - card.annualFee);

    // Calculate spend required to break even
    const breakEvenSpend = card.annualFee / (monthlyRewards / monthlySpend);
    const minMonthlySpend = Math.round(breakEvenSpend * 0.85);
    const maxMonthlySpend = Math.round(breakEvenSpend * 1.15);

    return {
        minBenefit: Math.max(minRewards, 0),
        maxBenefit: Math.max(maxRewards, 0),
        minSpendRequired: minMonthlySpend,
        maxSpendRequired: maxMonthlySpend,
        breakEvenSpend: Math.round(breakEvenSpend)
    };
}

// Filter cards based on user preferences
function filterCards(userData) {
    let eligible = cardDatabase.filter(card => {
        // Income eligibility
        if (userData.income < card.minIncome) return false;

        // Credit score eligibility
        const scoreMap = { 'building': 1, 'fair': 2, 'good': 3, 'excellent': 4 };
        const userScore = scoreMap[userData.creditScore] || 2;
        const requiredScore = scoreMap[card.minCreditScore] || 2;
        if (userScore < requiredScore) return false;

        // Card preference filter
        const pref = userData.cardPreference;
        if (pref === 'lifetime-free' && card.annualFee > 0 && !card.feeWaiver) return false;
        if (pref === 'low-fee' && card.annualFee > 5000) return false;
        if (pref === 'premium' && card.category !== 'premium') return false;

        return true;
    });

    // Calculate value for each card
    eligible = eligible.map(card => {
        const range = calculateEstimatedRange(card, userData);
        return {
            ...card,
            calculatedRange: range,
            netValue: (range.minBenefit + range.maxBenefit) / 2
        };
    });

    // Sort by net value
    eligible.sort((a, b) => b.netValue - a.netValue);

    // Return top 6 cards
    return eligible.slice(0, 6);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Get fee badge class
function getFeeBadge(fee, feeWaiver) {
    if (fee === 0 || (feeWaiver && fee <= 500)) {
        return { class: 'free', label: 'Lifetime Free' };
    } else if (fee <= 2000) {
        return { class: 'moderate', label: 'Low Fee' };
    } else {
        return { class: 'premium', label: 'Premium Segment' };
    }
}

// Render a single card
function renderCard(card, rank) {
    const range = card.calculatedRange;
    const feeBadge = getFeeBadge(card.annualFee, card.feeWaiver);

    return `
        <div class="card-item">
            <div class="card-header">
                <div class="card-logos">
                    <img src="/images/banks/${card.bank.toLowerCase()}.svg"
                         alt="${card.bank}"
                         class="card-bank-logo"
                         onerror="this.style.display='none'">
                </div>
                <div class="card-image-container">
                    <img src="/images/cards/${card.id}.png"
                         alt="${card.name}"
                         class="card-image"
                         onerror="this.style.display='none'">
                    <div class="card-rank">${rank}</div>
                </div>
            </div>

            <div class="card-content">
                <h3 class="card-name">${card.name}</h3>
                <span class="card-category ${card.category}">${
                    card.category === 'premium' ? 'Premium Segment Card' : 'High Value Card'
                }</span>

                <div class="card-metrics">
                    <div class="card-metric">
                        <div class="card-metric-label">
                            Expected Annual Benefit
                            <span class="card-tooltip" data-tooltip="Net benefit after annual fee, based on your spending">
                                <i class="fas fa-info-circle"></i>
                            </span>
                        </div>
                        <div class="card-metric-value highlight">
                            ${formatCurrency(range.minBenefit)} – ${formatCurrency(range.maxBenefit)}
                        </div>
                    </div>

                    <div class="card-metric">
                        <div class="card-metric-label">
                            Monthly Spend Required
                            <span class="card-tooltip" data-tooltip="Spending needed to reach the benefit range">
                                <i class="fas fa-info-circle"></i>
                            </span>
                        </div>
                        <div class="card-metric-value">
                            ${formatCurrency(range.minSpendRequired)} – ${formatCurrency(range.maxSpendRequired)}/mo
                        </div>
                        <div class="card-metric-subtext">
                            Based on your spending pattern
                        </div>
                    </div>
                </div>

                <div class="card-fee">
                    <span class="card-fee-label">Annual Fee</span>
                    <span class="card-fee-value">${formatCurrency(card.annualFee)}</span>
                    <span class="card-fee-badge ${feeBadge.class}">${feeBadge.label}</span>
                </div>

                ${card.feeWaiver ? '<p class="card-metric-subtext" style="margin: -0.75rem 0 1rem; padding: 0 1rem;">Fee waived on meeting spend criteria</p>' : ''}
            </div>

            <div class="card-actions">
                <button class="btn-apply" onclick="handleApply('${card.id}')">
                    Apply Now
                </button>
                <button class="btn-learn" onclick="handleLearnMore('${card.id}')">
                    Learn More
                </button>
            </div>
        </div>
    `;
}

// Generate and display results
function generateResults(answers) {
    const userData = {
        name: answers.name || 'there',
        income: answers.income,
        creditScore: answers.creditScore,
        monthlySpend: answers.monthlySpend,
        spendingCategories: answers.spendingCategories || [],
        cardPreference: answers.cardPreference || 'any',
        travelFrequency: answers.travelFrequency,
        primaryGoal: answers.primaryGoal
    };

    // Get recommended cards
    const recommendations = filterCards(userData);

    // Render results
    const resultsContent = document.getElementById('resultsContent');

    if (recommendations.length === 0) {
        resultsContent.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem; grid-column: 1 / -1;">
                <i class="fas fa-info-circle" style="font-size: 4rem; color: var(--primary-500); margin-bottom: 1.5rem;"></i>
                <h3 style="font-size: 1.75rem; font-weight: 700; color: var(--gray-900); margin-bottom: 1rem;">
                    No Perfect Match Yet
                </h3>
                <p style="font-size: 1.125rem; color: var(--gray-600); margin-bottom: 2rem;">
                    Based on your profile, we couldn't find cards that meet all your criteria.
                    Try adjusting your preferences or building your credit score.
                </p>
                <button class="btn-primary" onclick="location.reload()">
                    Start Over
                </button>
            </div>
        `;
        return;
    }

    let html = '';
    recommendations.forEach((card, index) => {
        html += renderCard(card, index + 1);
    });

    resultsContent.innerHTML = html;

    // Update results description with personalization
    const resultsDesc = document.querySelector('.results-description');
    if (resultsDesc) {
        resultsDesc.textContent = `Hey ${userData.name}! Based on your ₹${formatCurrency(userData.monthlySpend).replace('₹', '')} monthly spending, here are your best matches`;
    }
}

// Handle apply button click
function handleApply(cardId) {
    const card = cardDatabase.find(c => c.id === cardId);
    if (card) {
        alert(`This would redirect to ${card.bank} bank's application page for ${card.name}.\n\nIn production, this would open the bank's official application form.`);
        // In production: window.open(card.applyUrl, '_blank');
    }
}

// Handle learn more button click
function handleLearnMore(cardId) {
    const card = cardDatabase.find(c => c.id === cardId);
    if (card) {
        alert(`This would show detailed information about ${card.name}.\n\nFeatures include:\n- ${card.benefits.loungeAccess}\n- ${card.benefits.insurance}\n- Milestone bonus: ₹${card.benefits.milestone}`);
        // In production: Open modal or navigate to details page
    }
}

// Make generateResults available globally
window.generateResults = generateResults;
