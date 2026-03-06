// GoNature Health & Lifestyle Assessment - Scoring Engine

const ScoringEngine = {
    calculateResults(answers) {
        const dimensions = {};

        // Calculate score for each scored section
        sectionOrder.forEach(sectionKey => {
            const section = quizData[sectionKey];
            if (!section.scored) return;

            let totalScore = 0;
            let maxPossible = 0;

            section.questions.forEach(question => {
                const answer = answers[question.id];
                if (!answer) return;

                if (question.type === 'likert') {
                    const val = parseInt(answer);
                    if (val >= 1 && val <= 5) {
                        if (question.reverse) {
                            totalScore += (6 - val);
                        } else {
                            totalScore += val;
                        }
                        maxPossible += 5;
                    }
                } else if (question.type === 'scored') {
                    const option = question.options.find(o => o.value === answer);
                    if (option) {
                        totalScore += option.score;
                        const maxOptionScore = Math.max(...question.options.map(o => o.score));
                        maxPossible += maxOptionScore;
                    }
                }
            });

            const percentage = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

            if (section.dimension) {
                dimensions[section.dimension] = percentage;
            }
        });

        // All dimension keys except SELF_AWARENESS (used as readiness)
        const healthDimensions = ['HYDRATION', 'FOOD', 'SLEEP', 'ACTIVITY', 'STRESS', 'NATURAL', 'AWARENESS'];
        const healthScores = healthDimensions.map(d => dimensions[d] || 0);
        const overallScore = Math.round(healthScores.reduce((a, b) => a + b, 0) / healthScores.length);

        // Readiness/Self Awareness score
        const readinessScore = dimensions['SELF_AWARENESS'] || 0;

        // Composite scores for Quick Snapshot
        const physicalHealth = Math.round(
            ((dimensions.HYDRATION || 0) + (dimensions.FOOD || 0) + (dimensions.SLEEP || 0) + (dimensions.ACTIVITY || 0)) / 4
        );
        const mentalWellness = Math.round(
            ((dimensions.STRESS || 0) + (dimensions.AWARENESS || 0)) / 2
        );
        const naturalAlignment = Math.round(
            ((dimensions.NATURAL || 0) + (dimensions.SELF_AWARENESS || 0)) / 2
        );

        // Sort health dimensions by score (lowest first = needs most attention)
        const sortedDimensions = healthDimensions
            .map(d => ({ key: d, score: dimensions[d] || 0, info: dimensionInfo[d] }))
            .sort((a, b) => a.score - b.score);

        // All dimensions for radar chart
        const allDimensionsList = [...healthDimensions, 'SELF_AWARENESS']
            .map(d => ({ key: d, score: dimensions[d] || 0, info: dimensionInfo[d] }));

        // Top concerns (lowest scoring)
        const topConcerns = sortedDimensions.slice(0, 3);

        // Strongest areas (highest scoring)
        const strongestAreas = [...sortedDimensions].reverse().slice(0, 2);

        // Determine phase
        let phase, phaseDescription, phaseColor;
        if (overallScore <= 40) {
            phase = 'THE FOUNDATION PHASE';
            phaseDescription = 'Your body is calling for attention and care. This is not a weakness \u2014 it\u2019s awareness. Small, consistent changes in your daily habits will create the biggest impact. Think of this as planting seeds that will grow into lasting health.';
            phaseColor = '#ef4444';
        } else if (overallScore <= 70) {
            phase = 'THE BUILDING PHASE';
            phaseDescription = 'You\u2019re on the right track with some healthy habits already in place. A few key areas need more focus to help you reach your optimal health. With targeted improvements, you can accelerate your wellness journey significantly.';
            phaseColor = '#f97316';
        } else {
            phase = 'THE THRIVING PHASE';
            phaseDescription = 'Excellent! Your lifestyle habits are well-aligned with natural health principles. Continue nurturing what\u2019s working and fine-tune the smaller areas. You\u2019re an inspiration for others on their health journey.';
            phaseColor = '#22c55e';
        }

        // Generate 7-day plan based on weakest areas
        const sevenDayPlan = this.generate7DayPlan(topConcerns, strongestAreas);

        // Generate core pattern insight
        const corePattern = this.generateCorePattern(topConcerns, strongestAreas, overallScore);

        return {
            dimensions,
            overallScore,
            readinessScore,
            physicalHealth,
            mentalWellness,
            naturalAlignment,
            phase,
            phaseDescription,
            phaseColor,
            allDimensions: allDimensionsList,
            sortedDimensions,
            topConcerns,
            strongestAreas,
            sevenDayPlan,
            corePattern,
            userName: answers['userName'] || 'Friend'
        };
    },

    generate7DayPlan(topConcerns, strongestAreas) {
        const planItems = {
            HYDRATION: {
                label: 'HYDRATION',
                color: '#3b82f6',
                task: 'Start your morning with a glass of warm water before anything else. Carry a water bottle and aim for 8 glasses today.'
            },
            FOOD: {
                label: 'NUTRITION',
                color: '#ef4444',
                task: 'Add one fresh fruit and one serving of vegetables to your meals today. Eat slowly and without distractions.'
            },
            SLEEP: {
                label: 'SLEEP',
                color: '#8b5cf6',
                task: 'Set a bedtime alarm for 10 PM. Put your phone away 30 minutes before bed and practice 5 minutes of deep breathing.'
            },
            ACTIVITY: {
                label: 'MOVEMENT',
                color: '#f97316',
                task: 'Take a 20-minute walk in nature. Stretch your body for 5 minutes in the morning. Move every hour.'
            },
            STRESS: {
                label: 'MENTAL PEACE',
                color: '#ec4899',
                task: 'Practice 5 minutes of meditation or deep breathing. Take a short break every hour during work.'
            },
            NATURAL: {
                label: 'NATURE',
                color: '#22c55e',
                task: 'Spend 15 minutes in direct sunlight. Try walking barefoot on grass. Replace one processed item with a natural alternative.'
            },
            AWARENESS: {
                label: 'AWARENESS',
                color: '#14b8a6',
                task: 'Spend 30 minutes without any screen. Do one activity that makes you genuinely laugh or smile.'
            }
        };

        const days = [
            { day: 1, ...planItems[topConcerns[0]?.key] || planItems.HYDRATION },
            { day: 2, ...planItems[topConcerns[1]?.key] || planItems.FOOD },
            { day: 3, ...planItems[topConcerns[2]?.key] || planItems.SLEEP },
            { day: 4, ...planItems.ACTIVITY },
            { day: 5, ...planItems.NATURAL },
            { day: 6, ...planItems.STRESS },
            { day: 7, label: 'INTEGRATION', color: '#22c55e', task: 'Review your week. What felt different? Journal for 10 minutes about the changes you noticed in your body and mind.' }
        ];

        return days;
    },

    generateCorePattern(topConcerns, strongestAreas, overallScore) {
        const weakest = topConcerns[0]?.info?.name || 'health habits';
        const secondWeakest = topConcerns[1]?.info?.name || 'lifestyle patterns';
        const strongest = strongestAreas[0]?.info?.name || 'self awareness';

        let pattern, dailyLife;

        if (overallScore <= 40) {
            pattern = `Your daily habits have gradually drifted away from what your body naturally needs. The areas of ${weakest} and ${secondWeakest} are where your body is asking for the most support right now.`;
            dailyLife = [
                'You may feel low on energy or tired even after rest, because your body\'s basic needs aren\'t being fully met.',
                'Small discomforts like bloating, headaches, or poor sleep have become so routine that they feel "normal."',
                'You know you should make changes but feel unsure about where to start or how to sustain them.',
                'Your strongest area is ' + strongest + ' \u2014 this shows you already have the foundation to build upon.'
            ];
        } else if (overallScore <= 70) {
            pattern = `You have a good foundation in some areas, but ${weakest} and ${secondWeakest} are creating an imbalance that may be holding you back from feeling your best.`;
            dailyLife = [
                'You have good intentions but inconsistency in certain habits prevents you from reaching optimal health.',
                'Some days feel great while others feel draining \u2014 this fluctuation reflects the gaps in your routine.',
                'You are already doing well in ' + strongest + ' \u2014 building on this strength will naturally improve other areas.',
                'With focused attention on your weaker areas, you can experience a significant shift in energy and well-being.'
            ];
        } else {
            pattern = `Your lifestyle is well-aligned with natural health principles. Your consistent habits in ${strongest} set a great example. Fine-tuning ${weakest} will help you reach peak vitality.`;
            dailyLife = [
                'You generally feel good and energetic, with minor areas that could be optimized further.',
                'Your healthy habits have become second nature \u2014 keep nurturing them.',
                'You are a natural role model for those around you when it comes to health-conscious living.',
                'Small refinements in ' + weakest + ' can take you from good health to exceptional vitality.'
            ];
        }

        return { pattern, dailyLife };
    }
};
