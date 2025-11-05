// Quiz State
const quizState = {
    currentStep: 0,
    answers: {},
    totalSteps: 0
};

// Quiz Questions
const questions = [
    {
        id: 'name',
        type: 'input',
        question: 'What should we call you?',
        subtitle: 'Just your first name is fine',
        placeholder: 'Enter your name',
        inputType: 'text',
        required: true
    },
    {
        id: 'income',
        type: 'input',
        question: 'What is your annual income?',
        subtitle: 'This helps us recommend cards you\'re likely to be approved for',
        placeholder: '₹8,00,000',
        inputType: 'number',
        required: true
    },
    {
        id: 'creditScore',
        type: 'choice',
        question: 'How would you describe your credit score?',
        subtitle: 'Your credit history helps determine approval likelihood',
        options: [
            { value: 'excellent', label: 'Excellent (750+)', icon: '⭐' },
            { value: 'good', label: 'Good (700-749)', icon: '👍' },
            { value: 'fair', label: 'Fair (650-699)', icon: '📊' },
            { value: 'building', label: 'Building Credit (<650)', icon: '🌱' }
        ]
    },
    {
        id: 'monthlySpend',
        type: 'input',
        question: 'What is your typical monthly credit card spending?',
        subtitle: 'This helps us calculate your actual reward potential',
        placeholder: '₹50,000',
        inputType: 'number',
        required: true
    },
    {
        id: 'spendingCategories',
        type: 'multiple',
        question: 'What are your top spending categories?',
        subtitle: 'Select all that apply - this affects reward calculations',
        options: [
            { value: 'dining', label: 'Dining & Restaurants', icon: '🍽️' },
            { value: 'travel', label: 'Travel & Hotels', icon: '✈️' },
            { value: 'shopping', label: 'Online Shopping', icon: '🛍️' },
            { value: 'groceries', label: 'Groceries & Supermarkets', icon: '🛒' },
            { value: 'fuel', label: 'Fuel & Transportation', icon: '⛽' },
            { value: 'entertainment', label: 'Entertainment & Streaming', icon: '🎬' },
            { value: 'utilities', label: 'Bills & Utilities', icon: '💡' }
        ]
    },
    {
        id: 'cardPreference',
        type: 'choice',
        question: 'What type of card are you looking for?',
        subtitle: 'This helps us filter cards based on your fee preference',
        options: [
            { value: 'lifetime-free', label: 'Lifetime Free Cards Only', icon: '🆓' },
            { value: 'low-fee', label: 'Low Annual Fee (up to ₹5,000)', icon: '💵' },
            { value: 'premium', label: 'Premium Cards (any fee if value justifies)', icon: '💎' },
            { value: 'any', label: 'Any Card Type (best value)', icon: '🎯' }
        ]
    },
    {
        id: 'travelFrequency',
        type: 'choice',
        question: 'How often do you travel?',
        subtitle: 'Travel benefits and lounge access vary by card',
        options: [
            { value: 'frequent', label: 'Frequently (4+ times/year)', icon: '🌍' },
            { value: 'occasional', label: 'Occasionally (2-3 times/year)', icon: '🏖️' },
            { value: 'rare', label: 'Rarely (once a year or less)', icon: '🏠' }
        ]
    },
    {
        id: 'primaryGoal',
        type: 'choice',
        question: 'What is your primary goal with a credit card?',
        subtitle: 'This determines which benefits matter most to you',
        options: [
            { value: 'cashback', label: 'Maximum Cashback/Rewards', icon: '💰' },
            { value: 'travel', label: 'Travel Benefits & Miles', icon: '✈️' },
            { value: 'lifestyle', label: 'Lifestyle & Dining Perks', icon: '🎭' },
            { value: 'build-credit', label: 'Build Credit History', icon: '📈' }
        ]
    }
];

// Initialize quiz
function initQuiz() {
    quizState.totalSteps = questions.length;

    // Set up event listeners
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    document.getElementById('stickyCta')?.addEventListener('click', startQuiz);
    document.getElementById('backBtn').addEventListener('click', goBack);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuToggle?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').classList.add('hidden');
            });

            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                answer.classList.remove('hidden');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Show sticky CTA on scroll
    window.addEventListener('scroll', () => {
        const stickyCta = document.getElementById('stickyCta');
        const heroSection = document.querySelector('.hero-section');

        if (stickyCta && heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom) {
                stickyCta.classList.remove('hidden');
            } else {
                stickyCta.classList.add('hidden');
            }
        }
    });
}

function startQuiz() {
    // Hide hero and other sections
    document.querySelector('.hero-section').classList.add('hidden');
    document.querySelector('.trusted-section').classList.add('hidden');
    document.querySelector('.about-section').classList.add('hidden');
    document.querySelector('.faq-section').classList.add('hidden');
    document.querySelector('.contact-section').classList.add('hidden');
    document.getElementById('stickyCta')?.classList.add('hidden');

    // Show quiz section
    document.getElementById('quiz').classList.remove('hidden');
    document.querySelector('.progress-indicator').classList.remove('hidden');

    // Reset state
    quizState.currentStep = 0;
    quizState.answers = {};

    // Render first question
    renderQuestion();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
    const question = questions[quizState.currentStep];
    const content = document.getElementById('quizContent');

    // Update progress
    updateProgress();

    // Show/hide back button
    const backBtn = document.getElementById('backBtn');
    if (quizState.currentStep > 0) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }

    let html = `
        <div class="quiz-question">
            <h2 class="quiz-question-title">${question.question}</h2>
            <p class="quiz-question-subtitle">${question.subtitle}</p>
        </div>
    `;

    if (question.type === 'input') {
        html += `
            <div class="quiz-options">
                <input
                    type="${question.inputType}"
                    class="quiz-input"
                    id="answer-input"
                    placeholder="${question.placeholder}"
                    value="${quizState.answers[question.id] || ''}"
                    ${question.required ? 'required' : ''}
                />
            </div>
            <div class="quiz-actions">
                <button class="btn-primary" onclick="handleInputAnswer()">
                    <span>Continue</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
    } else if (question.type === 'choice') {
        html += '<div class="quiz-options">';
        question.options.forEach(option => {
            const isSelected = quizState.answers[question.id] === option.value;
            html += `
                <div class="quiz-option ${isSelected ? 'selected' : ''}"
                     onclick="handleChoiceAnswer('${option.value}')">
                    <div class="quiz-option-icon">
                        ${isSelected ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <span>${option.icon} ${option.label}</span>
                </div>
            `;
        });
        html += '</div>';
    } else if (question.type === 'multiple') {
        html += '<div class="quiz-options">';
        const selectedValues = quizState.answers[question.id] || [];
        question.options.forEach(option => {
            const isSelected = selectedValues.includes(option.value);
            html += `
                <div class="quiz-option ${isSelected ? 'selected' : ''}"
                     onclick="handleMultipleAnswer('${option.value}')">
                    <div class="quiz-option-icon">
                        ${isSelected ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <span>${option.icon} ${option.label}</span>
                </div>
            `;
        });
        html += `
            </div>
            <div class="quiz-actions">
                <button class="btn-primary" onclick="nextQuestion()">
                    <span>Continue</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
    }

    content.innerHTML = html;

    // Add enter key listener for input fields
    if (question.type === 'input') {
        const input = document.getElementById('answer-input');
        input.focus();
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleInputAnswer();
            }
        });
    }
}

function handleInputAnswer() {
    const question = questions[quizState.currentStep];
    const input = document.getElementById('answer-input');
    const value = input.value.trim();

    if (question.required && !value) {
        input.style.borderColor = 'var(--error-500)';
        return;
    }

    // Clean up numeric input (remove currency symbols, commas)
    if (question.inputType === 'number') {
        quizState.answers[question.id] = parseInt(value.replace(/[₹,]/g, ''));
    } else {
        quizState.answers[question.id] = value;
    }

    nextQuestion();
}

function handleChoiceAnswer(value) {
    const question = questions[quizState.currentStep];
    quizState.answers[question.id] = value;

    // Small delay for visual feedback
    setTimeout(() => {
        nextQuestion();
    }, 200);
}

function handleMultipleAnswer(value) {
    const question = questions[quizState.currentStep];

    if (!quizState.answers[question.id]) {
        quizState.answers[question.id] = [];
    }

    const index = quizState.answers[question.id].indexOf(value);
    if (index > -1) {
        quizState.answers[question.id].splice(index, 1);
    } else {
        quizState.answers[question.id].push(value);
    }

    renderQuestion();
}

function nextQuestion() {
    if (quizState.currentStep < questions.length - 1) {
        quizState.currentStep++;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Quiz complete - show results
        showResults();
    }
}

function goBack() {
    if (quizState.currentStep > 0) {
        quizState.currentStep--;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = ((quizState.currentStep + 1) / quizState.totalSteps) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('currentStep').textContent = quizState.currentStep + 1;
    document.getElementById('totalSteps').textContent = quizState.totalSteps;
}

function showResults() {
    // Hide quiz section
    document.getElementById('quiz').classList.add('hidden');
    document.querySelector('.progress-indicator').classList.add('hidden');

    // Show results section
    document.getElementById('results').classList.remove('hidden');

    // Generate and display results
    if (window.generateResults) {
        window.generateResults(quizState.answers);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    initQuiz();
}
