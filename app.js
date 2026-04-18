const app = {
    currentScreen: 'welcome',
    currentStepIndex: 0,
    allSteps: [],
    answers: {},
    results: null,
    direction: 'right',

    init() {
        this.allSteps = this.buildSteps();
    },

    buildSteps() {
        const steps = [];
        const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
        const totalQuestions = sectionOrder.reduce((sum, key) => sum + quizData[key].questions.length, 0);
        let overallQuestionNumber = 0;

        sectionOrder.forEach(sectionKey => {
            const section = quizData[sectionKey];
            const sectionTotalQuestions = section.questions.length;
            let sectionQuestionNumber = 0;

            section.questions.forEach(q => {
                overallQuestionNumber++;
                sectionQuestionNumber++;

                let options = null;
                if (q.options) {
                    options = q.options.map((opt, idx) => ({
                        value: opt.value,
                        score: opt.score,
                        letter: labels[idx],
                        text: opt.text || opt.label
                    }));
                }

                steps.push({
                    stepType: 'question',
                    qType: q.type === 'text' ? 'text' : 'single',
                    id: q.id,
                    text: q.text,
                    options,
                    placeholder: q.placeholder || null,
                    sectionKey,
                    sectionTitle: section.title,
                    sectionIcon: section.icon,
                    overallQuestionNumber,
                    totalQuestions,
                    sectionQuestionNumber,
                    sectionTotalQuestions
                });
            });
        });
        return steps;
    },

    start() {
        this.showScreen('quiz');
        this.renderStep();
    },

    showScreen(name) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-' + name).classList.add('active');
        this.currentScreen = name;
        window.scrollTo(0, 0);
    },

    updateProgress(step) {
        const pct = Math.round((step.overallQuestionNumber / step.totalQuestions) * 100);
        document.getElementById('progressFill').style.width = pct + '%';
        document.getElementById('progressCount').textContent = pct + '% Complete';
        document.getElementById('progressSection').textContent = step.sectionIcon + ' ' + step.sectionTitle;
    },

    renderStep() {
        const step = this.allSteps[this.currentStepIndex];
        const container = document.getElementById('quiz-content');
        const anim = this.direction === 'right' ? 'slide-in-right' : 'slide-in-left';

        document.getElementById('btnBack').style.display = '';
        this.updateProgress(step);

        let html = `<div class="question-card ${anim}" id="questionCard">`;
        html += `<div class="question-number">Question ${step.sectionQuestionNumber} of ${step.sectionTotalQuestions}</div>`;
        html += `<h2 class="question-text">${step.text}</h2>`;

        if (step.qType === 'text') {
            const val = this.answers[step.id] || '';
            html += `<div class="input-group">
                <input type="text" class="text-input" id="textInput"
                    placeholder="${step.placeholder || 'Type your answer...'}"
                    value="${this.escapeHtml(val)}" autocomplete="off" maxlength="80">
            </div>`;
        } else {
            html += '<div class="options-list">';
            step.options.forEach(opt => {
                const isSel = this.answers[step.id] === opt.value;
                html += `<div class="option-card ${isSel ? 'selected' : ''}"
                    onclick="app.selectOption('${step.id}', '${opt.value}', this)">
                    <span class="option-letter">${opt.letter}</span>
                    <span class="option-text">${opt.text}</span>
                    <span class="option-check">&#10003;</span>
                </div>`;
            });
            html += '</div>';
        }

        html += '</div>';
        container.innerHTML = html;

        if (step.qType === 'text') {
            const input = document.getElementById('textInput');
            input.addEventListener('input', () => {
                this.answers[step.id] = input.value.trim();
                this.updateNavButtons();
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && input.value.trim()) this.nextStep();
            });
            setTimeout(() => input.focus(), 300);
        }

        this.updateNavButtons();
    },

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    selectOption(qId, value, el) {
        this.answers[qId] = value;
        el.closest('.options-list').querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        this.updateNavButtons();
        setTimeout(() => this.nextStep(), 350);
    },

    updateNavButtons() {
        const step = this.allSteps[this.currentStepIndex];
        const btnNext = document.getElementById('btnNext');
        const btnBack = document.getElementById('btnBack');

        btnBack.style.display = '';
        const answer = this.answers[step.id];
        const hasAnswer = step.qType === 'text'
            ? !!(answer && answer.trim().length > 0)
            : !!answer;

        if (step.qType === 'single') {
            btnNext.style.display = 'none';
        } else {
            btnNext.style.display = '';
            btnNext.disabled = !hasAnswer;
            const isLast = this.currentStepIndex === this.allSteps.length - 1;
            btnNext.innerHTML = isLast ? 'See My Results &#10148;' : 'Next &#8594;';
        }
        document.querySelector('.quiz-nav').style.justifyContent = 'space-between';
    },

    nextStep() {
        const step = this.allSteps[this.currentStepIndex];
        const answer = this.answers[step.id];
        const hasAnswer = step.qType === 'text'
            ? !!(answer && answer.trim().length > 0)
            : !!answer;

        if (!hasAnswer) {
            const card = document.getElementById('questionCard');
            if (card) { card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 500); }
            return;
        }

        if (this.currentStepIndex < this.allSteps.length - 1) {
            this.direction = 'right';
            this.currentStepIndex++;
            this.renderStep();
        } else {
            this.showContactCapture();
        }
    },

    nextQuestion() {
        if (this._contactMode) {
            this.showResults();
            return;
        }
        this.nextStep();
    },

    prevQuestion() {
        if (this._contactMode) {
            this._contactMode = false;
            this.direction = 'left';
            this.renderStep();
            return;
        }
        if (this.currentStepIndex > 0) {
            this.direction = 'left';
            this.currentStepIndex--;
            this.renderStep();
        } else {
            this.showScreen('welcome');
        }
    },

    showContactCapture() {
        const container = document.getElementById('quiz-content');
        const btnNext = document.getElementById('btnNext');
        const btnBack = document.getElementById('btnBack');

        btnBack.style.display = '';
        btnNext.style.display = '';
        btnNext.innerHTML = 'See My Results &#10148;';
        btnNext.disabled = true;
        document.querySelector('.quiz-nav').style.justifyContent = 'space-between';

        document.getElementById('progressFill').style.width = '100%';
        document.getElementById('progressCount').textContent = '100% Complete';
        document.getElementById('progressSection').textContent = 'Almost There!';

        const emailVal = this.answers._email || '';
        const phoneVal = this.answers._phone || '';

        container.innerHTML = `
            <div class="question-card slide-in-right" id="questionCard">
                <div class="contact-capture-header">
                    <span class="contact-icon">&#127881;</span>
                    <h2 class="question-text">Your health blueprint is ready!</h2>
                    <p class="contact-subtitle">Enter your details below to unlock your personalised report.</p>
                </div>
                <div class="input-group" style="margin-bottom: 1rem;">
                    <label class="input-label">Email Address <span class="required">*</span></label>
                    <input type="email" class="text-input" id="contactEmail"
                        placeholder="your@email.com"
                        value="${this.escapeHtml(emailVal)}" autocomplete="email">
                </div>
                <div class="input-group">
                    <label class="input-label">Phone Number <span class="optional-label">(optional)</span></label>
                    <input type="tel" class="text-input" id="contactPhone"
                        placeholder="+91 98765 43210"
                        value="${this.escapeHtml(phoneVal)}" autocomplete="tel">
                </div>
                <p class="contact-privacy">&#128274; Your information is 100% private and will never be shared.</p>
            </div>`;

        this._contactMode = true;
        this.currentScreen = 'contact';

        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');

        const validate = () => {
            const email = emailInput.value.trim();
            this.answers._email = email;
            this.answers._phone = phoneInput.value.trim();
            btnNext.disabled = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        emailInput.addEventListener('input', validate);
        phoneInput.addEventListener('input', validate);
        emailInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !btnNext.disabled) this.showResults();
        });
        phoneInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !btnNext.disabled) this.showResults();
        });

        setTimeout(() => emailInput.focus(), 300);
        validate();
    },

    showResults() {
        this._contactMode = false;
        const emailInput = document.getElementById('contactEmail');
        const phoneInput = document.getElementById('contactPhone');
        if (emailInput) this.answers._email = emailInput.value.trim();
        if (phoneInput) this.answers._phone = phoneInput.value.trim();

        this.results = ScoringEngine.calculateResults(this.answers);
        this.renderResults();
        this.showScreen('results');
        setTimeout(() => this.renderRadarChart(), 200);
    },

    renderResults() {
        const r = this.results;
        const container = document.getElementById('resultsContainer');
        const name = r.userName;

        const statusFor = (pct) => pct >= 80 ? 'strength' : pct >= 50 ? 'growth' : 'priority';
        const statusLabel = (s) => s === 'strength' ? 'Strength' : s === 'growth' ? 'Growth Area' : 'Priority Gap';

        const sectionBarsHTML = r.allDimensions.map(d => {
            const status = statusFor(d.score);
            return `<div class="result-bar-item">
                <div class="bar-label">${d.info.icon}</div>
                <div class="bar-track">
                    <div class="bar-fill" style="width: ${d.score}%; background: ${d.info.color};">${d.score}%</div>
                </div>
                <div class="bar-title">${d.info.name}</div>
                <div class="bar-status status-${status}">${statusLabel(status)}</div>
            </div>`;
        }).join('');

        const strongest = r.strongestAreas[0];
        const weakest = r.topConcerns[0];

        const dailyLifeHTML = r.corePattern.dailyLife.map(line => `<li>${line}</li>`).join('');

        const planHTML = r.sevenDayPlan.map(day => `
            <div class="plan-day">
                <div class="plan-day-num">Day ${day.day}</div>
                <div>
                    <div class="plan-day-label" style="color: ${day.color};">${day.label}</div>
                    <div class="plan-day-task">${day.task}</div>
                </div>
            </div>`).join('');

        container.innerHTML = `
            <div class="report-section report-header fade-in">
                <div class="report-icon-large">&#127793;</div>
                <h1>Your Personalised Health Blueprint</h1>
                <p class="report-greeting">Dear <strong>${name}</strong>,</p>
                <p>Before you read this&hellip; take a deep breath.</p>
                <p>The fact that you took time to reflect on your health today says something beautiful &mdash; you care about how you feel, and you're ready for something to shift.</p>
            </div>

            <div class="report-section report-score fade-in" style="animation-delay:0.1s">
                <h2>Your Health Alignment Score</h2>
                <div class="score-circle-wrapper">
                    <div class="score-circle">
                        <svg viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="54" fill="none" stroke="#e8e4de" stroke-width="8"/>
                            <circle cx="60" cy="60" r="54" fill="none" stroke="url(#scoreGradient)" stroke-width="8" stroke-linecap="round"
                                stroke-dasharray="${(r.overallScore / 100) * 339.3} 339.3" transform="rotate(-90 60 60)" class="score-ring"/>
                            <defs><linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#4db89a"/><stop offset="100%" stop-color="#d4a853"/>
                            </linearGradient></defs>
                        </svg>
                        <div class="score-value">
                            <span class="score-num">${r.overallScore}</span>
                            <span class="score-max">/ 100</span>
                        </div>
                    </div>
                </div>
                <div class="category-badge">${r.phase}</div>
                <p class="category-desc">${r.phaseDescription}</p>
            </div>

            <div class="report-section report-breakdown fade-in" style="animation-delay:0.2s">
                <h2>Your 8 Health Dimensions</h2>
                <div class="section-bars">${sectionBarsHTML}</div>
                <div class="legend">
                    <span class="legend-item"><span class="legend-dot strength"></span> Strength (80&ndash;100%)</span>
                    <span class="legend-item"><span class="legend-dot growth"></span> Growth Area (50&ndash;79%)</span>
                    <span class="legend-item"><span class="legend-dot priority"></span> Priority Gap (&lt;50%)</span>
                </div>
                <div class="radar-wrapper" style="margin-top:1.5rem;">
                    <canvas id="healthRadarChart"></canvas>
                </div>
            </div>

            ${strongest ? `
            <div class="report-section fade-in" style="animation-delay:0.3s">
                <div class="insight-card insight-positive">
                    <div class="insight-icon">&#127775;</div>
                    <h3>Your Beautiful Strength</h3>
                    <p>One of your most powerful areas is <strong>${strongest.info.name}</strong> (${strongest.score}%).</p>
                    <p>This shows you already have a foundation to build upon. Keep nurturing this &mdash; it's the anchor your other habits can grow from.</p>
                </div>
            </div>` : ''}

            ${weakest ? `
            <div class="report-section fade-in" style="animation-delay:0.4s">
                <div class="insight-card insight-gap">
                    <div class="insight-icon">&#128161;</div>
                    <h3>Your Silent Gap</h3>
                    <p>Your body is quietly asking for support in <strong>${weakest.info.name}</strong> (${weakest.score}%).</p>
                    <p>This isn't a flaw, ${name}. It's simply an area that hasn't received enough attention yet &mdash; and small, consistent changes here will create the biggest impact.</p>
                </div>
            </div>` : ''}

            <div class="report-section report-mirror fade-in" style="animation-delay:0.5s">
                <h2>Your Core Pattern</h2>
                <p>${r.corePattern.pattern}</p>
                <ul class="mirror-list">${dailyLifeHTML}</ul>
            </div>

            <div class="report-section fade-in" style="animation-delay:0.6s">
                <div class="truth-card">
                    <h3>The Truth About Your Health</h3>
                    <p>This isn't about perfection.</p>
                    <p>It's about <strong>alignment &mdash; listening to what your body already knows</strong>.</p>
                    <p>The moment you give it the right rhythm, food, rest, and care&hellip; everything else starts to fall into place.</p>
                </div>
            </div>

            <div class="report-section report-need fade-in" style="animation-delay:0.65s">
                <h2>What You Need Now</h2>
                <p>Right now, your body is not asking for more information. It's asking for:</p>
                <div class="needs-grid">
                    <div class="need-item"><span>&#128218;</span> Simple daily habits</div>
                    <div class="need-item"><span>&#127793;</span> Natural, whole foods</div>
                    <div class="need-item"><span>&#128164;</span> Restful, consistent sleep</div>
                    <div class="need-item"><span>&#129504;</span> A calm, focused mind</div>
                </div>
            </div>

            <div class="report-section report-plan fade-in" style="animation-delay:0.7s">
                <h2>Your 7-Day Starter Plan</h2>
                <p>Begin with these small, focused steps &mdash; one day at a time.</p>
                <div class="plan-days">${planHTML}</div>
            </div>

            <div class="report-section report-cta fade-in" style="animation-delay:0.8s">
                <div class="cta-card">
                    <h2>Your Next Step</h2>
                    <p>${name}, you now have a clear picture of where you are &mdash; and where your body is guiding you next.</p>
                    <p>If you're ready to go deeper, I'd like to personally walk you through:</p>
                    <ul>
                        <li>How to build daily habits that align with your body</li>
                        <li>How to reverse lifestyle patterns naturally</li>
                        <li>How to create lasting energy, clarity, and calm</li>
                    </ul>
                    <p><strong>This is your moment. Small consistent steps are where real change begins.</strong></p>
                    <button class="btn btn-cta" onclick="window.open('https://gonature.in/', '_blank')">Book Your Free Consultation</button>
                </div>
            </div>

            <div class="report-section report-retake fade-in" style="animation-delay:0.9s">
                <button class="btn btn-secondary" onclick="app.restart()">&#8634; Retake Assessment</button>
            </div>
        `;
    },

    renderRadarChart() {
        const canvas = document.getElementById('healthRadarChart');
        if (!canvas || typeof Chart === 'undefined') return;
        const r = this.results;
        new Chart(canvas.getContext('2d'), {
            type: 'radar',
            data: {
                labels: r.allDimensions.map(d => d.info.label),
                datasets: [{
                    label: 'Your Score',
                    data: r.allDimensions.map(d => d.score),
                    backgroundColor: 'rgba(77, 184, 154, 0.18)',
                    borderColor: 'rgba(77, 184, 154, 0.9)',
                    borderWidth: 2,
                    pointBackgroundColor: '#d4a853',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: { stepSize: 25, color: '#94a3b8', backdropColor: 'transparent', font: { size: 10 } },
                        grid: { color: '#e8e4de' },
                        angleLines: { color: '#e8e4de' },
                        pointLabels: { color: '#475569', font: { size: 10, weight: '600' } }
                    }
                }
            }
        });
    },

    restart() {
        this.answers = {};
        this.currentStepIndex = 0;
        this.results = null;
        this.direction = 'right';
        this.allSteps = this.buildSteps();
        this.showScreen('welcome');
    }
};

app.init();
