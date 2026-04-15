// GoNature Health & Lifestyle Assessment - Main Application Logic

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
    progressSectionIcon: document.getElementById('progress-section-icon'),
    progressSectionName: document.getElementById('progress-section-name'),
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

// Build flat question list with section intro items inserted
function getAllQuestions() {
    const questions = [];
    sectionOrder.forEach((sectionKey, sectionNumber) => {
        const section = quizData[sectionKey];
        // Section intro card before each section's questions
        questions.push({
            id: `section-intro-${sectionKey}`,
            type: 'section-intro',
            sectionKey,
            sectionTitle: section.title,
            sectionIcon: section.icon,
            sectionSubtitle: section.subtitle,
            sectionNumber
        });
        section.questions.forEach(question => {
            questions.push({
                ...question,
                sectionKey,
                sectionTitle: section.title,
                sectionIcon: section.icon,
                sectionSubtitle: section.subtitle
            });
        });
    });
    return questions;
}

// Screen navigation
function showScreen(screenName) {
    Object.values(DOM.screens).forEach(s => s.classList.remove('active'));
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
    if (!validateCurrentQuestion()) return;

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
    if (question.type === 'section-intro') return true;

    const answer = AppState.answers[question.id];
    const questionCard = document.querySelector('.question-card');

    if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
        if (questionCard) {
            questionCard.classList.add('shake');
            questionCard.classList.add('invalid');
            setTimeout(() => questionCard.classList.remove('shake'), 500);
        }
        return false;
    }

    if (questionCard) questionCard.classList.remove('invalid');
    return true;
}

// Section helpers
function sectionQuestionCount(sectionKey) {
    return AppState.allQuestions.filter(q => q.sectionKey === sectionKey && q.type !== 'section-intro').length;
}

function sectionQuestionIndex(idx) {
    const q = AppState.allQuestions[idx];
    let count = 0;
    for (let i = 0; i <= idx; i++) {
        const qi = AppState.allQuestions[i];
        if (qi.sectionKey === q.sectionKey && qi.type !== 'section-intro') count++;
    }
    return count;
}

// Progress bar update
function updateProgress() {
    const totalActual = AppState.allQuestions.filter(q => q.type !== 'section-intro').length;
    const answeredActual = AppState.allQuestions
        .slice(0, AppState.currentQuestionIndex)
        .filter(q => q.type !== 'section-intro').length;
    const progress = Math.round((answeredActual / totalActual) * 100);

    DOM.progressFill.style.width = `${progress}%`;
    DOM.progressText.textContent = `${progress}% Complete`;

    const question = AppState.allQuestions[AppState.currentQuestionIndex];
    if (DOM.progressSectionIcon) DOM.progressSectionIcon.textContent = question.sectionIcon;
    if (DOM.progressSectionName) DOM.progressSectionName.textContent = question.sectionTitle;
}

// Navigation buttons update
function updateNavigation() {
    const question = AppState.allQuestions[AppState.currentQuestionIndex];
    const isLastItem = AppState.currentQuestionIndex === AppState.allQuestions.length - 1;
    const isFirstItem = AppState.currentQuestionIndex === 0;

    if (isFirstItem) {
        DOM.prevBtn.style.display = 'none';
    } else {
        DOM.prevBtn.style.display = '';
        DOM.prevBtn.disabled = false;
    }

    if (question.type === 'section-intro') {
        DOM.nextBtn.textContent = "Let's Begin \u2192";
    } else if (isLastItem) {
        DOM.nextBtn.textContent = 'See My Results \u279C';
    } else {
        DOM.nextBtn.textContent = 'Next \u2192';
    }
}

// Section intro rendering
function renderSectionIntro(question, direction = 'none') {
    const sectionIndex = sectionOrder.indexOf(question.sectionKey);
    let animClass = 'fade-in';
    if (direction === 'next') animClass = 'slide-in-right';
    if (direction === 'prev') animClass = 'slide-in-left';

    DOM.quizContent.innerHTML = `
        <div class="section-intro-card ${animClass}">
            <span class="section-intro-icon">${question.sectionIcon}</span>
            <span class="section-intro-badge">Section ${sectionIndex + 1}</span>
            <h2 class="section-intro-title">${question.sectionTitle}</h2>
            <p class="section-intro-subtitle">${question.sectionSubtitle}</p>
        </div>
    `;
    window.scrollTo(0, 0);
}

// Main render function
function renderQuestion(direction = 'none') {
    const question = AppState.allQuestions[AppState.currentQuestionIndex];

    updateProgress();
    updateNavigation();

    if (question.type === 'section-intro') {
        renderSectionIntro(question, direction);
        return;
    }

    let animClass = 'fade-in';
    if (direction === 'next') animClass = 'slide-in-right';
    if (direction === 'prev') animClass = 'slide-in-left';

    const secQ = sectionQuestionIndex(AppState.currentQuestionIndex);
    const secTotal = sectionQuestionCount(question.sectionKey);

    DOM.quizContent.innerHTML = `
        <div class="question-card ${animClass}" id="questionCard" data-question-id="${question.id}">
            <div class="question-number">Question ${secQ} of ${secTotal}</div>
            <h2 class="question-text">${question.text}</h2>
            ${renderQuestionInput(question)}
        </div>
    `;

    attachQuestionListeners(question);
    window.scrollTo(0, 0);
}

// Input rendering
function renderQuestionInput(question) {
    const currentAnswer = AppState.answers[question.id];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    switch (question.type) {
        case 'text':
            return `
                <input type="text"
                    class="text-input"
                    id="${question.id}"
                    placeholder="${question.placeholder || 'Type your answer...'}"
                    value="${currentAnswer || ''}"
                    autocomplete="off">
            `;

        case 'single':
        case 'categorical':
        case 'scored':
            return `
                <div class="options-list">
                    ${question.options.map((opt, i) => `
                        <div class="option-card ${currentAnswer === opt.value ? 'selected' : ''}" data-value="${opt.value}">
                            <span class="option-letter">${letters[i] !== undefined ? letters[i] : i + 1}</span>
                            <span class="option-text">${opt.label}</span>
                            <span class="option-check">&#10003;</span>
                        </div>
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
                            return `<div class="scale-circle ${sizeClass} ${colorClass} ${selectedValue === val ? 'selected' : ''}" data-value="${val}"></div>`;
                        }).join('')}
                    </div>
                    <span class="scale-label scale-label-right">Agree</span>
                </div>
            `;

        default:
            return '';
    }
}

// Event listeners for question interactions
function attachQuestionListeners(question) {
    const textInput = document.querySelector('.text-input');
    if (textInput) {
        textInput.addEventListener('input', (e) => {
            AppState.answers[e.target.id] = e.target.value;
            removeInvalidState();
        });
        textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.value.trim()) nextQuestion();
        });
        setTimeout(() => textInput.focus(), 200);
    }

    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
            const value = card.dataset.value;
            AppState.answers[question.id] = value;

            card.closest('.options-list').querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            removeInvalidState();
            setTimeout(() => nextQuestion(), 500);
        });
    });

    const scaleCircles = document.querySelectorAll('.scale-circle');
    scaleCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            AppState.answers[question.id] = circle.dataset.value;
            scaleCircles.forEach(c => c.classList.remove('selected'));
            circle.classList.add('selected');
            removeInvalidState();
            setTimeout(() => nextQuestion(), 500);
        });
    });
}

function removeInvalidState() {
    const card = document.querySelector('.question-card');
    if (card) card.classList.remove('invalid');
}

// ============================
// Results Functions
// ============================
function calculateAndShowResults() {
    AppState.results = ScoringEngine.calculateResults(AppState.answers);
    showScreen('results');
    renderResults();
}

function getScoreLevel(score) {
    if (score >= 75) return { label: 'Excellent', color: '#22c55e' };
    if (score >= 50) return { label: 'Good', color: '#f97316' };
    if (score >= 25) return { label: 'Needs Attention', color: '#ef4444' };
    return { label: 'Critical', color: '#dc2626' };
}

function getSnapshotLabel(score) {
    if (score >= 75) return { label: 'Strong', color: '#22c55e' };
    if (score >= 50) return { label: 'Transitioning', color: '#3b82f6' };
    return { label: 'Needs Focus', color: '#ef4444' };
}

function renderResults() {
    const { results } = AppState;
    const phaseLabel = results.overallScore <= 40 ? 'Depleted' : results.overallScore <= 70 ? 'Transitioning' : 'Flowing';

    const physLabel = getSnapshotLabel(results.physicalHealth);
    const mentLabel = getSnapshotLabel(results.mentalWellness);
    const natLabel = getSnapshotLabel(results.naturalAlignment);

    const html = `
        <!-- Header -->
        <div class="report-header">
            <div class="report-badge">PERSONALIZED HEALTH & LIFESTYLE BLUEPRINT</div>
            <h1 class="report-title">Health Report for ${results.userName}</h1>
            <p class="report-intro">
                You are neither broken nor behind. This report is a <span class="text-highlight">thoughtful
                reflection</span> of where your <span class="text-highlight">body, mind</span>, and
                <span class="text-highlight">habits</span> may have shifted out of balance \u2014 and a clear path to restore
                wellness and vitality.
            </p>
            <div class="report-callout">
                <span class="callout-dot"></span>
                YOUR JOURNEY TO BETTER HEALTH STARTS WITH AWARENESS. GENTLE, CONSISTENT STEPS ARE THE MOST EFFECTIVE PATH FORWARD.
            </div>
        </div>

        <!-- Overall Score Card -->
        <div class="report-card overall-score-card">
            <div class="score-card-header">
                <span class="card-dot"></span>
                <span class="card-label">Overall Alignment</span>
            </div>
            <div class="overall-score-layout">
                <div class="score-text-side">
                    <div class="score-label-small">HEALTH ALIGNMENT SCORE</div>
                    <div class="score-big-number" style="color: ${results.phaseColor};">${results.overallScore}</div>
                    <div class="score-ranges">
                        <span>0\u201340: Needs Attention</span>
                        <span>41\u201370: Building</span>
                        <span>71\u2013100: Thriving</span>
                    </div>
                    <div class="phase-section">
                        <p class="phase-prefix">${results.userName}, you are currently in the</p>
                        <h3 class="phase-name" style="color: ${results.phaseColor};">${results.phase}</h3>
                        <p class="phase-description">${results.phaseDescription}</p>
                    </div>
                </div>
                <div class="score-ring-side">
                    <div class="donut-ring" id="overall-donut"></div>
                </div>
            </div>
        </div>

        <!-- Quick Snapshot -->
        <div class="report-card">
            <h2 class="card-title">Quick Snapshot</h2>
            <p class="card-subtitle">A closer look at how your health systems are functioning beneath the surface.</p>
            <div class="snapshot-tags">
                <span class="snapshot-tag" style="border-color: ${physLabel.color}; color: ${physLabel.color};">Physical: ${physLabel.label}</span>
                <span class="snapshot-tag" style="border-color: ${mentLabel.color}; color: ${mentLabel.color};">Mental: ${mentLabel.label}</span>
                <span class="snapshot-tag" style="border-color: ${natLabel.color}; color: ${natLabel.color};">Natural Living: ${natLabel.label}</span>
            </div>
            <div class="snapshot-bars">
                <div class="snapshot-bar-row">
                    <span class="bar-label">Physical Health</span>
                    <div class="bar-track">
                        <div class="bar-fill bar-fill-animate" style="width: 0%; --target-width: ${results.physicalHealth}%; background: linear-gradient(90deg, #ef4444, #f97316);"></div>
                    </div>
                    <span class="bar-value">${results.physicalHealth}</span>
                </div>
                <div class="snapshot-bar-row">
                    <span class="bar-label">Mental Wellness</span>
                    <div class="bar-track">
                        <div class="bar-fill bar-fill-animate" style="width: 0%; --target-width: ${results.mentalWellness}%; background: linear-gradient(90deg, #3b82f6, #8b5cf6);"></div>
                    </div>
                    <span class="bar-value">${results.mentalWellness}</span>
                </div>
                <div class="snapshot-bar-row">
                    <span class="bar-label">Natural Alignment</span>
                    <div class="bar-track">
                        <div class="bar-fill bar-fill-animate" style="width: 0%; --target-width: ${results.naturalAlignment}%; background: linear-gradient(90deg, #22c55e, #14b8a6);"></div>
                    </div>
                    <span class="bar-value">${results.naturalAlignment}</span>
                </div>
            </div>
        </div>

        <!-- Health Wheel (Radar Chart) -->
        <div class="report-card">
            <h2 class="card-title">Your Health Wheel</h2>
            <p class="card-subtitle">This radar shows how evenly your health is distributed across all core dimensions.</p>
            <div class="radar-chart-container">
                <canvas id="healthRadarChart" width="350" height="350"></canvas>
            </div>
        </div>

        <!-- Dimension Scores -->
        <div class="report-card">
            <h2 class="card-title">Dimension Scores</h2>
            <p class="card-subtitle">Each bar is a 0\u2013100 score based on your answers. Lower scores are where your body is asking for more care.</p>
            <div class="dimension-pills">
                ${results.allDimensions.map(d => {
                    const pct = d.score;
                    return `
                    <div class="dimension-pill-item">
                        <div class="pill-bar-container">
                            <div class="pill-bar-bg">
                                <div class="pill-bar-fill pill-fill-animate" style="height: 0%; --target-height: ${pct}%; background: ${d.info.color};"></div>
                            </div>
                        </div>
                        <span class="pill-label">${d.info.icon} ${d.info.name}</span>
                        <span class="pill-score" style="color: ${d.info.color};">${pct}%</span>
                    </div>
                `;
                }).join('')}
            </div>
            <div class="dimension-insight">
                <p>Your strongest area is <strong style="color: ${results.strongestAreas[0]?.info?.color || '#22c55e'};">${results.strongestAreas[0]?.info?.name || 'Self Awareness'}</strong>.
                Continue nurturing this strength \u2014 it serves as the foundation that will support improvement across other dimensions.</p>
            </div>
        </div>

        <!-- Areas Needing Attention -->
        <div class="report-card attention-card">
            <p>The areas requiring your most immediate attention are
            <strong>${results.topConcerns[0]?.info?.name || ''}</strong> and
            <strong>${results.topConcerns[1]?.info?.name || ''}</strong>.
            These are where focused care and intention will yield the most meaningful results.</p>
        </div>

        <!-- Core Pattern -->
        <div class="report-card pattern-card">
            <div class="pattern-badge">WHAT'S REALLY GOING ON</div>
            <h2 class="card-title">Your Core Health Pattern</h2>
            <p class="pattern-description">${results.corePattern.pattern}</p>
            <h3 class="pattern-subtitle">How this shows up in daily life</h3>
            <ul class="pattern-list">
                ${results.corePattern.dailyLife.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>

        <!-- Root Cause -->
        <div class="report-card">
            <h3 class="root-cause-title">Root cause in health terms</h3>
            <p class="root-cause-text">At its core, your body still operates on patterns that have accumulated over time.
            Until these patterns shift through consistent, natural lifestyle changes, your health reserves will continue to deplete under pressure.</p>
        </div>

        <!-- 7-Day Plan -->
        <div class="report-card plan-card">
            <div class="plan-badge">YOUR NEXT 7 DAYS</div>
            <h2 class="card-title">7-Day Health Reset</h2>
            <p class="card-subtitle">This structured 7-day programme is designed to help you translate awareness into consistent
            action \u2014 gentle, repeatable practices your body can rely upon, even during life\u2019s most demanding moments.</p>
            <div class="plan-timeline">
                ${results.sevenDayPlan.map(day => `
                    <div class="plan-day">
                        <div class="plan-dot" style="background: ${day.color};"></div>
                        <div class="plan-day-content">
                            <div class="plan-day-label">DAY ${day.day}</div>
                            <div class="plan-day-text">
                                <strong style="color: ${day.color};">${day.label}:</strong> ${day.task}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Personal Note -->
        <div class="report-card note-card">
            <div class="note-header">
                <div class="note-avatar">V</div>
                <div>
                    <div class="note-badge">A PERSONAL NOTE FROM VISHAL</div>
                </div>
            </div>
            <p class="note-text">I understand what it means to feel stuck in unhealthy patterns \u2014 while quietly knowing you deserve better.
            This report is not a judgement; it is a compassionate guide showing you precisely where your body is calling for attention, better habits,
            and genuine support. Take even one meaningful step from this report today, and you will already be on the path to a more balanced, fulfilling life.</p>
            <p class="note-signature">With care, Vishal</p>
        </div>

        <!-- Disclaimer -->
        <p class="report-disclaimer">This report is not a medical diagnosis. It is a reflective assessment designed to illuminate
        where your lifestyle may benefit from thoughtful, sustained support.</p>

        <!-- CTA Section -->
        <div class="report-card cta-card">
            <div class="cta-label">SPECIAL OFFER FOR YOU</div>
            <h2 class="cta-title">21-Day Health Reset Program</h2>
            <p class="cta-description">It\u2019s time to honor your need for restoration. The 21-Day Health Reset is designed specifically
            for people like you who are ready to transform their health with natural, sustainable habits.</p>
            <div class="cta-features">
                <div class="cta-feature">
                    <span class="cta-feature-icon">\u{1F33F}</span>
                    <div>
                        <div class="cta-feature-title">Daily Health Practices</div>
                        <div class="cta-feature-desc">5-10 minute rituals designed for busy lifestyles</div>
                    </div>
                </div>
                <div class="cta-feature">
                    <span class="cta-feature-icon">\u{1F9D8}</span>
                    <div>
                        <div class="cta-feature-title">Guided Wellness</div>
                        <div class="cta-feature-desc">Customized for your health phase</div>
                    </div>
                </div>
                <div class="cta-feature">
                    <span class="cta-feature-icon">\u{1F4F1}</span>
                    <div>
                        <div class="cta-feature-title">WhatsApp Community</div>
                        <div class="cta-feature-desc">Connect with like-minded people</div>
                    </div>
                </div>
                <div class="cta-feature">
                    <span class="cta-feature-icon">\u{1F4D3}</span>
                    <div>
                        <div class="cta-feature-title">Health Tracking Journal</div>
                        <div class="cta-feature-desc">Monitor your transformation daily</div>
                    </div>
                </div>
            </div>
            <button class="cta-button" onclick="window.open('https://example.com/program', '_blank')">
                <span>Yes! I Want to Reset My Health</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
            <p class="cta-guarantee">100% Satisfaction Guarantee | Start transforming today</p>
        </div>

        <!-- Retake -->
        <div class="retake-section">
            <button class="btn-secondary retake-btn" onclick="retakeQuiz()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 4v6h6M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/>
                </svg>
                <span>Retake Quiz</span>
            </button>
        </div>
    `;

    DOM.resultsContainer.innerHTML = html;

    setTimeout(() => {
        renderDonutChart(results.overallScore, results.phaseColor);
        renderRadarChart(results);
        animateBars();
    }, 200);
}

function renderDonutChart(score, color) {
    const container = document.getElementById('overall-donut');
    if (!container) return;

    const size = 160;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    container.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="donut-svg">
            <circle cx="${size/2}" cy="${size/2}" r="${radius}"
                fill="none" stroke="#e5e7eb" stroke-width="${strokeWidth}"/>
            <circle cx="${size/2}" cy="${size/2}" r="${radius}"
                fill="none" stroke="${color}" stroke-width="${strokeWidth}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                stroke-linecap="round"
                transform="rotate(-90 ${size/2} ${size/2})"
                class="donut-progress"
                style="--target-offset: ${offset}; --circumference: ${circumference};" />
            <text x="${size/2}" y="${size/2 + 8}" text-anchor="middle"
                font-size="2.2rem" font-weight="800" fill="${color}" font-family="var(--font-display)">${score}</text>
        </svg>
    `;

    setTimeout(() => {
        const progressCircle = container.querySelector('.donut-progress');
        if (progressCircle) {
            progressCircle.style.transition = 'stroke-dashoffset 1.5s ease-out';
            progressCircle.style.strokeDashoffset = offset;
        }
    }, 100);
}

function renderRadarChart(results) {
    const canvas = document.getElementById('healthRadarChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    const labels = results.allDimensions.map(d => d.info.name);
    const data = results.allDimensions.map(d => d.score);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [{
                label: 'Your Score',
                data,
                backgroundColor: 'rgba(77, 184, 154, 0.2)',
                borderColor: 'rgba(77, 184, 154, 0.8)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(77, 184, 154, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 25, display: false },
                    grid: { color: 'rgba(0,0,0,0.06)' },
                    angleLines: { color: 'rgba(0,0,0,0.06)' },
                    pointLabels: {
                        font: { family: "'Inter', sans-serif", size: 11, weight: '500' },
                        color: '#475569'
                    }
                }
            }
        }
    });
}

function animateBars() {
    document.querySelectorAll('.bar-fill-animate').forEach(bar => {
        const targetWidth = bar.style.getPropertyValue('--target-width');
        setTimeout(() => {
            bar.style.transition = 'width 1.2s ease-out';
            bar.style.width = targetWidth;
        }, 100);
    });

    document.querySelectorAll('.pill-fill-animate').forEach(bar => {
        const targetHeight = bar.style.getPropertyValue('--target-height');
        setTimeout(() => {
            bar.style.transition = 'height 1.2s ease-out';
            bar.style.height = targetHeight;
        }, 100);
    });
}

function retakeQuiz() {
    AppState.currentScreen = 'welcome';
    AppState.currentQuestionIndex = 0;
    AppState.answers = {};
    showScreen('welcome');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
