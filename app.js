// GoNature Health & Mindset Audit - Main Application Logic
// One-question-at-a-time premium experience

// App State
const AppState = {
    currentScreen: 'welcome',
    currentQuestionIndex: 0,
    allQuestions: [],
    answers: {},
    results: null
};

// DOM Elements
const DOM = {
    screens: {
        welcome: document.getElementById('welcome-screen'),
        quiz: document.getElementById('quiz-screen'),
        results: document.getElementById('results-screen')
    },
    startBtn: document.getElementById('start-quiz'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    quizContent: document.getElementById('quiz-content'),
    resultsContainer: document.querySelector('.results-container')
};

// Initialize App
function init() {
    AppState.allQuestions = getAllQuestions();
    DOM.startBtn.addEventListener('click', startQuiz);
    DOM.prevBtn.addEventListener('click', prevQuestion);
    DOM.nextBtn.addEventListener('click', nextQuestion);
}

// Flatten all questions from sections into single array
function getAllQuestions() {
    const questions = [];
    sectionOrder.forEach(sectionKey => {
        const section = quizData[sectionKey];
        section.questions.forEach(question => {
            questions.push({
                ...question,
                sectionKey: sectionKey,
                sectionTitle: section.title,
                sectionIcon: section.icon,
                sectionSubtitle: section.subtitle
            });
        });
    });
    return questions;
}

// Navigation Functions
function showScreen(screenName) {
    Object.values(DOM.screens).forEach(screen => {
        screen.classList.remove('active');
    });
    DOM.screens[screenName].classList.add('active');
    AppState.currentScreen = screenName;
    window.scrollTo(0, 0);
}

function startQuiz() {
    AppState.currentQuestionIndex = 0;
    AppState.answers = {};
    showScreen('quiz');
    renderQuestion();
}

function prevQuestion() {
    if (AppState.currentQuestionIndex > 0) {
        AppState.currentQuestionIndex--;
        renderQuestion('prev');
    }
}

function nextQuestion() {
    if (!validateCurrentQuestion()) {
        return;
    }

    if (AppState.currentQuestionIndex < AppState.allQuestions.length - 1) {
        AppState.currentQuestionIndex++;
        renderQuestion('next');
    } else {
        calculateAndShowResults();
    }
}

// Validation
function validateCurrentQuestion() {
    const question = AppState.allQuestions[AppState.currentQuestionIndex];
    const answer = AppState.answers[question.id];
    const questionCard = document.querySelector('.question-card');

    if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
        if (questionCard) {
            questionCard.classList.add('invalid');
            shakeElement(questionCard);
        }
        return false;
    }

    if (questionCard) {
        questionCard.classList.remove('invalid');
    }
    return true;
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .question-card.invalid {
        border-color: var(--error) !important;
    }
`;
document.head.appendChild(style);

// Render Functions
function renderQuestion(direction = 'none') {
    const question = AppState.allQuestions[AppState.currentQuestionIndex];
    const questionNumber = AppState.currentQuestionIndex + 1;
    const totalQuestions = AppState.allQuestions.length;

    updateProgress();
    updateNavigation();

    let animationClass = 'fade-in';
    if (direction === 'next') animationClass = 'slide-in-right';
    if (direction === 'prev') animationClass = 'slide-in-left';

    const html = `
        <div class="question-wrapper ${animationClass}">
            <div class="section-indicator">
                <span class="section-icon">${question.sectionIcon}</span>
                <span class="section-name">${question.sectionTitle}</span>
            </div>
            <div class="question-card" data-question-id="${question.id}">
                <p class="question-text">
                    <span class="question-number">${questionNumber}.</span>
                    ${question.text}
                </p>
                ${renderQuestionInput(question)}
            </div>
        </div>
    `;

    DOM.quizContent.innerHTML = html;
    attachQuestionListeners(question);
    window.scrollTo(0, 0);
}

function renderQuestionInput(question) {
    const currentAnswer = AppState.answers[question.id];

    switch (question.type) {
        case 'text':
            return `
                <input type="text"
                    class="text-input"
                    id="${question.id}"
                    placeholder="${question.placeholder || ''}"
                    value="${currentAnswer || ''}">
            `;

        case 'single':
        case 'categorical':
            return `
                <div class="options-grid">
                    ${question.options.map(opt => `
                        <label class="option-label ${currentAnswer === opt.value ? 'selected' : ''}" data-value="${opt.value}">
                            <input type="radio" class="option-radio" name="${question.id}" value="${opt.value}" ${currentAnswer === opt.value ? 'checked' : ''}>
                            <span class="option-indicator"></span>
                            <span class="option-text">${opt.label}</span>
                        </label>
                    `).join('')}
                </div>
            `;

        case 'likert':
            const selectedValue = parseInt(currentAnswer) || 0;
            return `
                <div class="personality-scale">
                    <span class="scale-label scale-label-left">Disagree</span>
                    <div class="scale-circles">
                        ${[1, 2, 3, 4, 5].map(val => {
                const sizeClass = val === 1 || val === 5 ? 'size-lg' :
                    val === 2 || val === 4 ? 'size-md' : 'size-sm';
                const colorClass = val <= 2 ? 'color-disagree' :
                    val >= 4 ? 'color-agree' : 'color-neutral';
                return `
                                <div class="scale-circle ${sizeClass} ${colorClass} ${selectedValue === val ? 'selected' : ''}"
                                     data-value="${val}">
                                </div>
                            `;
            }).join('')}
                    </div>
                    <span class="scale-label scale-label-right">Agree</span>
                </div>
            `;

        default:
            return '';
    }
}

function attachQuestionListeners(question) {
    // Text inputs
    const textInput = document.querySelector('.text-input');
    if (textInput) {
        textInput.addEventListener('input', (e) => {
            AppState.answers[e.target.id] = e.target.value;
            removeInvalidState();
        });
        textInput.focus();
    }

    // Radio options (single, categorical)
    document.querySelectorAll('.option-label').forEach(label => {
        label.addEventListener('click', (e) => {
            const radio = label.querySelector('.option-radio');
            const questionId = radio.name;
            const value = radio.value;

            AppState.answers[questionId] = value;

            const siblings = label.parentElement.querySelectorAll('.option-label');
            siblings.forEach(sib => sib.classList.remove('selected'));
            label.classList.add('selected');

            removeInvalidState();

            setTimeout(() => {
                nextQuestion();
            }, 600);
        });
    });

    // Personality scale circles (likert)
    const scaleCircles = document.querySelectorAll('.scale-circle');
    if (scaleCircles.length > 0) {
        scaleCircles.forEach(circle => {
            circle.addEventListener('click', () => {
                const value = circle.dataset.value;

                AppState.answers[question.id] = value;

                scaleCircles.forEach(c => c.classList.remove('selected'));
                circle.classList.add('selected');

                removeInvalidState();

                setTimeout(() => {
                    nextQuestion();
                }, 600);
            });
        });
    }
}

function removeInvalidState() {
    const card = document.querySelector('.question-card');
    if (card) card.classList.remove('invalid');
}

function updateProgress() {
    const totalQuestions = AppState.allQuestions.length;
    const progress = ((AppState.currentQuestionIndex + 1) / totalQuestions) * 100;
    DOM.progressFill.style.width = `${progress}%`;
    DOM.progressText.textContent = `Question ${AppState.currentQuestionIndex + 1} of ${totalQuestions}`;
}

function updateNavigation() {
    DOM.prevBtn.disabled = AppState.currentQuestionIndex === 0;

    const isLastQuestion = AppState.currentQuestionIndex === AppState.allQuestions.length - 1;
    DOM.nextBtn.innerHTML = isLastQuestion
        ? `<span>See My Results</span>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M5 12h14M12 5l7 7-7 7"/>
           </svg>`
        : `<span>Next</span>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M5 12h14M12 5l7 7-7 7"/>
           </svg>`;
}

// Results Functions
function calculateAndShowResults() {
    AppState.results = ScoringEngine.calculateResults(AppState.answers);
    showScreen('results');
    renderResults();
}

function getScoreLevel(score) {
    if (score >= 80) return { label: 'Critical', color: '#e74c3c' };
    if (score >= 60) return { label: 'High', color: '#ff5722' };
    if (score >= 40) return { label: 'Moderate', color: '#ff9800' };
    if (score >= 20) return { label: 'Low', color: '#4caf50' };
    return { label: 'Minimal', color: '#4db89a' };
}

function getReadinessLevel(score) {
    if (score >= 80) return { label: 'Highly Ready', color: '#4db89a' };
    if (score >= 60) return { label: 'Ready', color: '#4caf50' };
    if (score >= 40) return { label: 'Somewhat Ready', color: '#ff9800' };
    return { label: 'Exploring', color: '#94a3b8' };
}

function renderResults() {
    const { results } = AppState;
    const overallLevel = getScoreLevel(results.overallConcern);
    const readinessLevel = getReadinessLevel(results.readinessScore);

    const html = `
        <div class="blueprint-header">
            <h1 class="blueprint-title">${results.userName}, Here Is Your Health & Mindset Report</h1>
            <p class="blueprint-subtitle">
                Your answers reveal important patterns about your brain signals, body alignment, and lifestyle habits.
                Understanding these patterns is the <strong>first step toward transformation</strong>.
            </p>
        </div>

        <!-- Overall Score -->
        <div class="dimension-breakdown" style="text-align: center; margin-bottom: 30px;">
            <h2 class="section-title">Overall Health Concern Level</h2>
            <div style="display: flex; justify-content: center; align-items: center; gap: 30px; flex-wrap: wrap; margin: 20px 0;">
                <div style="text-align: center;">
                    <div style="width: 120px; height: 120px; border-radius: 50%; border: 6px solid ${overallLevel.color}; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                        <span style="font-size: 2rem; font-weight: 800; color: ${overallLevel.color};">${results.overallConcern}%</span>
                    </div>
                    <span style="font-weight: 600; color: ${overallLevel.color}; font-size: 1rem;">${overallLevel.label} Concern</span>
                </div>
                <div style="text-align: center;">
                    <div style="width: 120px; height: 120px; border-radius: 50%; border: 6px solid ${readinessLevel.color}; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
                        <span style="font-size: 2rem; font-weight: 800; color: ${readinessLevel.color};">${results.readinessScore}%</span>
                    </div>
                    <span style="font-weight: 600; color: ${readinessLevel.color}; font-size: 1rem;">${readinessLevel.label}</span>
                </div>
            </div>
        </div>

        <!-- Dimension Breakdown Bars -->
        <div class="dimension-breakdown">
            <h2 class="section-title">Your Health Dimension Breakdown</h2>
            <div class="health-bars" style="max-width: 600px; margin: 20px auto;">
                ${results.allDimensions.map(d => {
                    const level = getScoreLevel(d.score);
                    return `
                    <div style="margin-bottom: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">${d.info.icon} ${d.info.name}</span>
                            <span style="font-weight: 700; color: ${level.color}; font-size: 0.9rem;">${d.score}% - ${level.label}</span>
                        </div>
                        <div style="width: 100%; height: 12px; background: var(--bg-input); border-radius: 6px; overflow: hidden;">
                            <div class="dim-bar-fill-3" style="width: ${d.score}%; height: 100%; background: ${d.info.color}; border-radius: 6px;"></div>
                        </div>
                    </div>
                `;
                }).join('')}
                <!-- Readiness bar -->
                <div style="margin-bottom: 16px; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">${dimensionInfo.READINESS.icon} ${dimensionInfo.READINESS.name}</span>
                        <span style="font-weight: 700; color: ${readinessLevel.color}; font-size: 0.9rem;">${results.readinessScore}% - ${readinessLevel.label}</span>
                    </div>
                    <div style="width: 100%; height: 12px; background: var(--bg-input); border-radius: 6px; overflow: hidden;">
                        <div class="dim-bar-fill-3" style="width: ${results.readinessScore}%; height: 100%; background: ${dimensionInfo.READINESS.color}; border-radius: 6px;"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Primary Finding / Archetype -->
        <div class="oto-section" style="background: linear-gradient(135deg, ${results.archetype.color}11, ${results.archetype.color}22); border: 1px solid ${results.archetype.color}33; border-radius: var(--radius-xl); padding: 30px; margin: 30px 0;">
            <div style="text-align: center; max-width: 700px; margin: 0 auto;">
                <span style="font-size: 3rem;">${results.archetype.icon}</span>
                <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin: 10px 0; color: ${results.archetype.color};">${results.archetype.name}</h2>
                <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7;">
                    ${results.archetype.description}
                </p>
                <p style="font-weight: 700; margin-top: 16px; color: ${results.archetype.color}; font-size: 1.1rem;">
                    The secret you need most: ${results.archetype.secret}
                </p>
            </div>
        </div>

        <!-- Top 3 Concerns -->
        <div class="dimension-breakdown" style="margin: 30px 0;">
            <h2 class="section-title">Your Top 3 Areas of Concern</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 20px;">
                ${results.topConcerns.map((concern, index) => `
                    <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 20px; text-align: center; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-soft);">
                        <div style="font-size: 2rem; margin-bottom: 8px;">${concern.info.icon}</div>
                        <div style="font-weight: 700; color: var(--text-primary); font-size: 1rem;">#${index + 1} ${concern.info.name}</div>
                        <div style="font-weight: 800; color: ${concern.info.color}; font-size: 1.5rem; margin-top: 8px;">${concern.score}%</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- 4 Secrets Teaser -->
        <div class="roadmap-section" style="margin: 40px 0;">
            <h2 class="section-title">The 4 Secrets You Need to Come Out of Lifestyle Diseases</h2>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: 24px;">
                In the 3-hour workshop, Vishal will reveal these powerful secrets tailored to people with your exact profile:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
                <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 20px; border-left: 4px solid #e74c3c; box-shadow: var(--shadow-soft);">
                    <div style="font-weight: 700; color: #e74c3c; margin-bottom: 8px;">\u{1F9E0} Secret #1</div>
                    <div style="font-weight: 600; color: var(--text-primary);">Neuroscience of Brain Healing</div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 6px;">Learn the signaling language of your brain. Understand the signs & symptoms before a big problem comes.</p>
                </div>
                <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 20px; border-left: 4px solid #ff9800; box-shadow: var(--shadow-soft);">
                    <div style="font-weight: 700; color: #ff9800; margin-bottom: 8px;">\u{1F3C3} Secret #2</div>
                    <div style="font-weight: 600; color: var(--text-primary);">Simplified Human Anatomy</div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 6px;">Your body needs simplicity. Learn what you can do from home to restore your natural energy and rhythm.</p>
                </div>
                <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 20px; border-left: 4px solid #2196f3; box-shadow: var(--shadow-soft);">
                    <div style="font-weight: 700; color: #2196f3; margin-bottom: 8px;">\u{1F48A} Secret #3</div>
                    <div style="font-weight: 600; color: var(--text-primary);">Preventing Medication Errors</div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 6px;">The side effects of medications and supplements are rising every day. Learn how to protect yourself.</p>
                </div>
                <div style="background: var(--bg-card); border-radius: var(--radius-lg); padding: 20px; border-left: 4px solid #9c27b0; box-shadow: var(--shadow-soft);">
                    <div style="font-weight: 700; color: #9c27b0; margin-bottom: 8px;">\u{1F4A1} Secret #4</div>
                    <div style="font-weight: 600; color: var(--text-primary);">One-Word Treatment</div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 6px;">A single approach accepted by Allopathy, Homeopathy, Ayurveda, Unani & Siddha that you can start from day one.</p>
                </div>
            </div>
        </div>

        <!-- Workshop CTA -->
        <div class="oto-section diamond-program" style="text-align: center; padding: 40px 20px;">
            <div style="max-width: 700px; margin: 0 auto;">
                <span style="display: inline-block; background: var(--accent-mint-dim); color: var(--accent-mint); font-weight: 600; padding: 6px 16px; border-radius: var(--radius-full); font-size: 0.9rem; margin-bottom: 16px;">\u{1F33F} Your Next Step</span>
                <h2 style="font-family: var(--font-display); font-size: 1.75rem; margin-bottom: 16px; color: var(--text-primary);">Join Vishal's 3-Hour Health Transformation Workshop</h2>
                <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.7; margin-bottom: 20px;">
                    The most saddest thing on planet Earth is living your life with diseases and hoping someday you will be out of it.
                    Stop hoping. Start acting. This workshop will change the way you look at health forever.
                </p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 24px 0; text-align: left;">
                    <div style="display: flex; align-items: flex-start; gap: 8px;">
                        <span style="color: var(--accent-mint); font-weight: 700; font-size: 1.2rem;">&#10004;</span>
                        <span style="font-size: 0.95rem;">Brain Healing Neuroscience</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 8px;">
                        <span style="color: var(--accent-mint); font-weight: 700; font-size: 1.2rem;">&#10004;</span>
                        <span style="font-size: 0.95rem;">Simplified Human Anatomy</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 8px;">
                        <span style="color: var(--accent-mint); font-weight: 700; font-size: 1.2rem;">&#10004;</span>
                        <span style="font-size: 0.95rem;">Medication Error Prevention</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 8px;">
                        <span style="color: var(--accent-mint); font-weight: 700; font-size: 1.2rem;">&#10004;</span>
                        <span style="font-size: 0.95rem;">One-Word Treatment Method</span>
                    </div>
                </div>

                <p style="font-weight: 700; color: var(--accent-gold); font-size: 1.1rem; margin: 20px 0;">
                    By Vishal \u2014 India's Leading Naturopath & Nutritionist
                </p>

                <button class="oto-cta" onclick="window.open('https://example.com/workshop', '_blank')">
                    <span>Enroll in the Workshop Now</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>

        <div style="text-align: center; margin: 40px 0;">
            <button class="btn-secondary" onclick="retakeQuiz()">Retake Audit</button>
        </div>
    `;

    DOM.resultsContainer.innerHTML = html;

    // Animate bars after rendering
    setTimeout(() => {
        document.querySelectorAll('.dim-bar-fill-3').forEach(bar => {
            bar.style.transition = 'width 1s ease-out';
        });
    }, 100);
}

function retakeQuiz() {
    AppState.currentScreen = 'welcome';
    AppState.currentQuestionIndex = 0;
    AppState.answers = {};
    showScreen('welcome');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
