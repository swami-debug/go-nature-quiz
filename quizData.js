// Quiz Data Structure
// GoNature Health & Lifestyle Assessment

const quizData = {
    aboutYou: {
        id: 'about-you',
        title: 'About You',
        subtitle: 'Tell us a bit about yourself',
        icon: '\u{1F44B}',
        scored: false,
        questions: [
            {
                id: 'userName',
                type: 'text',
                text: "What's your name?",
                placeholder: 'Enter your name'
            },
            {
                id: 'userAge',
                type: 'single',
                text: 'What is your age range?',
                options: [
                    { value: '18-24', label: '18\u201324 years' },
                    { value: '25-34', label: '25\u201334 years' },
                    { value: '35-44', label: '35\u201344 years' },
                    { value: '45-54', label: '45\u201354 years' },
                    { value: '55+', label: '55+ years' }
                ]
            },
            {
                id: 'userRole',
                type: 'single',
                text: 'What is your primary role?',
                options: [
                    { value: 'employee', label: 'Employee / Professional' },
                    { value: 'entrepreneur', label: 'Entrepreneur / Business Owner' },
                    { value: 'homemaker', label: 'Homemaker' },
                    { value: 'student', label: 'Student' },
                    { value: 'retired', label: 'Retired' },
                    { value: 'other', label: 'Other' }
                ]
            },
            {
                id: 'userPeople',
                type: 'single',
                text: 'How many people are you responsible for daily?',
                options: [
                    { value: 'myself', label: 'Just myself' },
                    { value: '1-2', label: '1\u20132 people' },
                    { value: '3-4', label: '3\u20134 people' },
                    { value: '5+', label: '5 or more people' }
                ]
            }
        ]
    },

    dailyRoutine: {
        id: 'daily-routine',
        title: 'Daily Routine & Sleep',
        subtitle: 'Your rest and daily rhythm',
        icon: '\u{1F634}',
        scored: true,
        dimension: 'DAILY_ROUTINE',
        questions: [
            {
                id: 'Q1',
                type: 'scored',
                text: 'What time do you usually go to sleep?',
                options: [
                    { value: 'a', label: 'Before 10:30 PM', score: 4 },
                    { value: 'b', label: 'Between 11 PM \u2013 12 AM', score: 3 },
                    { value: 'c', label: 'After midnight', score: 2 },
                    { value: 'd', label: 'No fixed sleep time \u2014 it keeps changing', score: 1 }
                ]
            },
            {
                id: 'Q2',
                type: 'scored',
                text: 'How many hours do you sleep on most nights?',
                options: [
                    { value: 'a', label: '7 to 9 hours \u2014 I feel well rested', score: 4 },
                    { value: 'b', label: '5 to 6 hours \u2014 I feel tired sometimes', score: 3 },
                    { value: 'c', label: 'Less than 5 hours \u2014 I\'m often sleep deprived', score: 1 },
                    { value: 'd', label: 'More than 9 hours but still feel tired', score: 2 }
                ]
            },
            {
                id: 'Q3',
                type: 'scored',
                text: 'How do you feel when you wake up in the morning?',
                options: [
                    { value: 'a', label: 'Fresh and energetic', score: 4 },
                    { value: 'b', label: 'Okay \u2014 takes a few minutes to get going', score: 3 },
                    { value: 'c', label: 'Groggy \u2014 I need tea or coffee to start', score: 2 },
                    { value: 'd', label: 'Drained \u2014 I feel tired from the moment I wake up', score: 1 }
                ]
            },
            {
                id: 'Q4',
                type: 'scored',
                text: 'How much time do you spend in sunlight or outdoors daily?',
                options: [
                    { value: 'a', label: 'More than 1 hour', score: 4 },
                    { value: 'b', label: '30 to 60 minutes', score: 3 },
                    { value: 'c', label: 'Less than 30 minutes', score: 2 },
                    { value: 'd', label: 'Rarely go outside during the day', score: 1 }
                ]
            },
            {
                id: 'Q5',
                type: 'scored',
                text: 'How often do you use your phone or screen right before sleeping?',
                options: [
                    { value: 'a', label: 'Never \u2014 I switch off screens at least 1 hour before bed', score: 4 },
                    { value: 'b', label: 'Sometimes \u2014 I try to limit it', score: 3 },
                    { value: 'c', label: 'Most nights \u2014 I scroll until I fall asleep', score: 2 },
                    { value: 'd', label: 'Every night \u2014 my phone is the last thing I look at', score: 1 }
                ]
            }
        ]
    },

    dietHabits: {
        id: 'diet-habits',
        title: 'Diet & Eating Habits',
        subtitle: 'Your daily nutrition patterns',
        icon: '\u{1F34E}',
        scored: true,
        dimension: 'DIET',
        questions: [
            {
                id: 'Q6',
                type: 'scored',
                text: 'How much water do you drink in a day?',
                options: [
                    { value: 'a', label: '2.5 litres or more', score: 4 },
                    { value: 'b', label: '1.5 to 2 litres', score: 3 },
                    { value: 'c', label: 'Less than 1 litre', score: 2 },
                    { value: 'd', label: 'Mostly tea, coffee, or packaged drinks', score: 1 }
                ]
            },
            {
                id: 'Q7',
                type: 'scored',
                text: 'How often do you eat packaged, processed, or outside food?',
                options: [
                    { value: 'a', label: 'Rarely \u2014 mostly home-cooked meals', score: 4 },
                    { value: 'b', label: 'Once or twice a week', score: 3 },
                    { value: 'c', label: 'Several times a week', score: 2 },
                    { value: 'd', label: 'Almost every day', score: 1 }
                ]
            },
            {
                id: 'Q8',
                type: 'scored',
                text: 'Do you eat fresh fruits or vegetables daily?',
                options: [
                    { value: 'a', label: 'Yes \u2014 in every meal', score: 4 },
                    { value: 'b', label: 'Yes \u2014 at least once a day', score: 3 },
                    { value: 'c', label: 'Occasionally \u2014 a few times a week', score: 2 },
                    { value: 'd', label: 'Rarely \u2014 I don\'t focus on this', score: 1 }
                ]
            },
            {
                id: 'Q9',
                type: 'scored',
                text: 'How much dairy (milk, curd, cheese, paneer) do you consume daily?',
                options: [
                    { value: 'a', label: 'Multiple servings every day', score: 1 },
                    { value: 'b', label: 'Once a day \u2014 like milk in tea or curd with meals', score: 3 },
                    { value: 'c', label: 'Occasionally \u2014 not every day', score: 4 },
                    { value: 'd', label: 'Rarely or never', score: 4 }
                ]
            },
            {
                id: 'Q10',
                type: 'scored',
                text: 'How regular are your meal timings?',
                options: [
                    { value: 'a', label: 'Fixed meal times with proper gaps', score: 4 },
                    { value: 'b', label: 'Mostly regular with occasional late eating', score: 3 },
                    { value: 'c', label: 'Irregular \u2014 I eat whenever I feel like it', score: 2 },
                    { value: 'd', label: 'I often skip meals or eat very late at night', score: 1 }
                ]
            }
        ]
    },

    gutHealth: {
        id: 'gut-health',
        title: 'Gut Health & Digestion',
        subtitle: 'Your digestive wellness',
        icon: '\u{1F33F}',
        scored: true,
        dimension: 'GUT_HEALTH',
        questions: [
            {
                id: 'Q11',
                type: 'scored',
                text: 'How often do you feel bloated or heavy after eating?',
                options: [
                    { value: 'a', label: 'Rarely or never', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 once or twice a week', score: 3 },
                    { value: 'c', label: 'Often \u2014 happens most days', score: 2 },
                    { value: 'd', label: 'Almost every meal leaves me uncomfortable', score: 1 }
                ]
            },
            {
                id: 'Q12',
                type: 'scored',
                text: 'How would you describe your digestion overall?',
                options: [
                    { value: 'a', label: 'Smooth and regular \u2014 no issues', score: 4 },
                    { value: 'b', label: 'Mostly okay with occasional discomfort', score: 3 },
                    { value: 'c', label: 'I often feel acidity, gas, or indigestion', score: 2 },
                    { value: 'd', label: 'I have regular constipation or loose motions', score: 1 }
                ]
            },
            {
                id: 'Q13',
                type: 'scored',
                text: 'How often do you have a clear bowel movement in the morning?',
                options: [
                    { value: 'a', label: 'Every day \u2014 regular and comfortable', score: 4 },
                    { value: 'b', label: 'Most days \u2014 occasionally delayed', score: 3 },
                    { value: 'c', label: 'Irregular \u2014 every 2 to 3 days', score: 2 },
                    { value: 'd', label: 'I struggle with constipation or loose stools often', score: 1 }
                ]
            },
            {
                id: 'Q14',
                type: 'scored',
                text: 'Do you experience acidity or acid reflux?',
                options: [
                    { value: 'a', label: 'Never', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 only with certain foods', score: 3 },
                    { value: 'c', label: 'Frequently \u2014 several times a week', score: 2 },
                    { value: 'd', label: 'Almost daily \u2014 it\'s an ongoing problem', score: 1 }
                ]
            },
            {
                id: 'Q15',
                type: 'scored',
                text: 'Do you notice a coated tongue, bad breath, or nausea in the morning?',
                options: [
                    { value: 'a', label: 'Rarely or never', score: 4 },
                    { value: 'b', label: 'Sometimes \u2014 once or twice a week', score: 3 },
                    { value: 'c', label: 'Often \u2014 most mornings', score: 2 },
                    { value: 'd', label: 'Almost every day', score: 1 }
                ]
            }
        ]
    },

    breathingMovement: {
        id: 'breathing-movement',
        title: 'Breathing & Movement',
        subtitle: 'Your physical activity and breath',
        icon: '\u{1F3C3}',
        scored: true,
        dimension: 'BREATHING',
        questions: [
            {
                id: 'Q16',
                type: 'scored',
                text: 'Do you practice any breathing exercises (like pranayama or deep breathing)?',
                options: [
                    { value: 'a', label: 'Yes \u2014 daily practice', score: 4 },
                    { value: 'b', label: 'Yes \u2014 a few times a week', score: 3 },
                    { value: 'c', label: 'Occasionally \u2014 not consistent', score: 2 },
                    { value: 'd', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q17',
                type: 'scored',
                text: 'How does your breathing feel throughout the day?',
                options: [
                    { value: 'a', label: 'Deep and relaxed', score: 4 },
                    { value: 'b', label: 'Normal \u2014 I don\'t notice anything unusual', score: 3 },
                    { value: 'c', label: 'Shallow \u2014 I sometimes feel short of breath', score: 2 },
                    { value: 'd', label: 'Tight or restricted, especially when stressed', score: 1 }
                ]
            },
            {
                id: 'Q18',
                type: 'scored',
                text: 'How often do you exercise or move your body?',
                options: [
                    { value: 'a', label: 'Every day \u2014 walking, yoga, cycling, or similar', score: 4 },
                    { value: 'b', label: '3 to 4 times a week', score: 3 },
                    { value: 'c', label: '1 to 2 times a week', score: 2 },
                    { value: 'd', label: 'Rarely or never', score: 1 }
                ]
            },
            {
                id: 'Q19',
                type: 'scored',
                text: 'How many hours a day do you sit without moving?',
                options: [
                    { value: 'a', label: 'Less than 3 hours \u2014 I take regular breaks', score: 4 },
                    { value: 'b', label: '3 to 5 hours \u2014 I try to move every hour', score: 3 },
                    { value: 'c', label: '5 to 8 hours \u2014 mostly seated at work', score: 2 },
                    { value: 'd', label: 'More than 8 hours \u2014 sedentary most of the day', score: 1 }
                ]
            },
            {
                id: 'Q20',
                type: 'scored',
                text: 'Do you get tired or breathless during mild activity (like climbing stairs)?',
                options: [
                    { value: 'a', label: 'No \u2014 my energy levels are consistently good', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 after more effort than usual', score: 3 },
                    { value: 'c', label: 'Often \u2014 I get breathless or fatigued easily', score: 2 },
                    { value: 'd', label: 'Always \u2014 even small tasks drain me', score: 1 }
                ]
            }
        ]
    },

    weightBody: {
        id: 'weight-body',
        title: 'Weight & Body Goals',
        subtitle: 'Your body and weight patterns',
        icon: '\u2696\uFE0F',
        scored: true,
        dimension: 'WEIGHT',
        questions: [
            {
                id: 'Q21',
                type: 'scored',
                text: 'How would you describe your current weight?',
                options: [
                    { value: 'a', label: 'Healthy \u2014 I\'m comfortable with my weight', score: 4 },
                    { value: 'b', label: 'Slightly above where I\'d like to be', score: 3 },
                    { value: 'c', label: 'Overweight \u2014 it\'s affecting my energy or health', score: 2 },
                    { value: 'd', label: 'I\'ve struggled with weight for a long time', score: 1 }
                ]
            },
            {
                id: 'Q22',
                type: 'scored',
                text: 'Have you gained weight in the last 1 to 2 years?',
                options: [
                    { value: 'a', label: 'No \u2014 my weight has stayed the same', score: 4 },
                    { value: 'b', label: 'A little \u2014 around 2 to 5 kg', score: 3 },
                    { value: 'c', label: 'Yes \u2014 around 5 to 10 kg', score: 2 },
                    { value: 'd', label: 'Significant gain \u2014 more than 10 kg', score: 1 }
                ]
            },
            {
                id: 'Q23',
                type: 'scored',
                text: 'Do you feel puffiness, water retention, or bloating in your body?',
                options: [
                    { value: 'a', label: 'No \u2014 I feel light and normal', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 especially after certain foods', score: 3 },
                    { value: 'c', label: 'Often \u2014 I frequently feel heavy or puffy', score: 2 },
                    { value: 'd', label: 'Almost always \u2014 it\'s a persistent issue', score: 1 }
                ]
            },
            {
                id: 'Q24',
                type: 'scored',
                text: 'Has your weight affected your daily life or confidence?',
                options: [
                    { value: 'a', label: 'Not at all', score: 4 },
                    { value: 'b', label: 'Mildly \u2014 I notice it but manage well', score: 3 },
                    { value: 'c', label: 'Moderately \u2014 it affects my energy and comfort', score: 2 },
                    { value: 'd', label: 'Significantly \u2014 it impacts my daily life and mood', score: 1 }
                ]
            },
            {
                id: 'Q25',
                type: 'scored',
                text: 'What is your main goal around your body?',
                options: [
                    { value: 'a', label: 'Maintain my current healthy weight', score: 4 },
                    { value: 'b', label: 'Lose some weight and feel lighter', score: 3 },
                    { value: 'c', label: 'Lose significant weight and improve my health', score: 2 },
                    { value: 'd', label: 'Build strength and improve overall fitness', score: 3 }
                ]
            }
        ]
    },

    medicationHistory: {
        id: 'medication-history',
        title: 'Medication & Health History',
        subtitle: 'Your health background',
        icon: '\u{1FA7A}',
        scored: true,
        dimension: 'MEDICATION',
        questions: [
            {
                id: 'Q26',
                type: 'scored',
                text: 'Are you currently taking any medications daily?',
                options: [
                    { value: 'a', label: 'No \u2014 I am completely medication-free', score: 4 },
                    { value: 'b', label: 'Only occasionally \u2014 for specific situations', score: 3 },
                    { value: 'c', label: 'Yes \u2014 for one ongoing condition (BP, thyroid, diabetes, etc.)', score: 2 },
                    { value: 'd', label: 'Yes \u2014 multiple medicines for multiple conditions', score: 1 }
                ]
            },
            {
                id: 'Q27',
                type: 'scored',
                text: 'How often do you take antibiotics or painkillers in a year?',
                options: [
                    { value: 'a', label: 'Rarely or never', score: 4 },
                    { value: 'b', label: 'Once a year \u2014 only when essential', score: 3 },
                    { value: 'c', label: '2 to 4 times a year', score: 2 },
                    { value: 'd', label: 'Frequently \u2014 I take them without much thought', score: 1 }
                ]
            },
            {
                id: 'Q28',
                type: 'scored',
                text: 'Which of these best describes your current health?',
                options: [
                    { value: 'a', label: 'No significant issues \u2014 I feel generally well', score: 4 },
                    { value: 'b', label: 'Mild issues: frequent cold, fatigue, headaches, or bloating', score: 3 },
                    { value: 'c', label: 'Ongoing condition: thyroid, diabetes, BP, or skin problems', score: 2 },
                    { value: 'd', label: 'Serious concern: heart issues, chronic inflammation, or similar', score: 1 }
                ]
            },
            {
                id: 'Q29',
                type: 'scored',
                text: 'How long have you been managing your current health condition (if any)?',
                options: [
                    { value: 'a', label: 'No major condition to manage', score: 4 },
                    { value: 'b', label: 'Less than a year', score: 3 },
                    { value: 'c', label: '1 to 5 years', score: 2 },
                    { value: 'd', label: 'More than 5 years', score: 1 }
                ]
            },
            {
                id: 'Q30',
                type: 'scored',
                text: 'Have you ever tried reducing or stopping medication under a doctor\'s guidance?',
                options: [
                    { value: 'a', label: 'Yes \u2014 I\'ve successfully reduced or stopped medication', score: 4 },
                    { value: 'b', label: 'I\'ve discussed it but haven\'t made changes yet', score: 3 },
                    { value: 'c', label: 'No \u2014 my doctor has never suggested this', score: 2 },
                    { value: 'd', label: 'Not applicable \u2014 I\'m not on any regular medication', score: 4 }
                ]
            }
        ]
    },

    mindEmotions: {
        id: 'mind-emotions',
        title: 'Mind & Emotions',
        subtitle: 'Your emotional and mental patterns',
        icon: '\u{1F9E0}',
        scored: true,
        dimension: 'MIND',
        questions: [
            {
                id: 'Q31',
                type: 'scored',
                text: 'How would you rate your stress levels on most days?',
                options: [
                    { value: 'a', label: 'Low \u2014 I feel calm and balanced', score: 4 },
                    { value: 'b', label: 'Moderate \u2014 I have some stress but manage it', score: 3 },
                    { value: 'c', label: 'High \u2014 stress affects my sleep, digestion, or mood', score: 2 },
                    { value: 'd', label: 'Very high \u2014 I feel overwhelmed most of the time', score: 1 }
                ]
            },
            {
                id: 'Q32',
                type: 'scored',
                text: 'How often do you feel anxious, restless, or on edge?',
                options: [
                    { value: 'a', label: 'Rarely or never', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 during specific situations', score: 3 },
                    { value: 'c', label: 'Often \u2014 it affects my focus and sense of calm', score: 2 },
                    { value: 'd', label: 'Almost every day \u2014 it\'s a persistent feeling', score: 1 }
                ]
            },
            {
                id: 'Q33',
                type: 'scored',
                text: 'Do you experience brain fog, poor concentration, or forgetfulness?',
                options: [
                    { value: 'a', label: 'Rarely \u2014 my mind feels clear most of the time', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 usually when tired or stressed', score: 3 },
                    { value: 'c', label: 'Often \u2014 I struggle to focus or remember things', score: 2 },
                    { value: 'd', label: 'Almost daily \u2014 it significantly affects my work or life', score: 1 }
                ]
            },
            {
                id: 'Q34',
                type: 'scored',
                text: 'How often do you feel emotionally low or have mood swings?',
                options: [
                    { value: 'a', label: 'Rarely \u2014 I feel emotionally balanced', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 tied to specific events', score: 3 },
                    { value: 'c', label: 'Often \u2014 my mood shifts without a clear reason', score: 2 },
                    { value: 'd', label: 'Almost daily \u2014 I frequently feel low or irritable', score: 1 }
                ]
            },
            {
                id: 'Q35',
                type: 'scored',
                text: 'How well do you recover after a stressful day?',
                options: [
                    { value: 'a', label: 'Quickly \u2014 I feel fine by evening', score: 4 },
                    { value: 'b', label: 'Takes a few hours \u2014 I need some quiet time', score: 3 },
                    { value: 'c', label: 'I carry it into the next day \u2014 it lingers', score: 2 },
                    { value: 'd', label: 'Stress keeps building \u2014 I rarely feel fully recovered', score: 1 }
                ]
            }
        ]
    },

    mindsetAwareness: {
        id: 'mindset-awareness',
        title: 'Mindset & Awareness',
        subtitle: 'Your readiness for natural health',
        icon: '\u{1F331}',
        scored: true,
        dimension: 'MINDSET',
        questions: [
            {
                id: 'Q36',
                type: 'scored',
                text: 'How much do you trust your body\'s ability to heal on its own?',
                options: [
                    { value: 'a', label: 'Completely \u2014 I believe the body is self-healing', score: 4 },
                    { value: 'b', label: 'Mostly \u2014 with some support from nature', score: 3 },
                    { value: 'c', label: 'Somewhat \u2014 I think medicine is still necessary', score: 2 },
                    { value: 'd', label: 'Not much \u2014 I rely heavily on doctors and medicines', score: 1 }
                ]
            },
            {
                id: 'Q37',
                type: 'scored',
                text: 'When you get a cough, cold, or mild fever, what do you usually do?',
                options: [
                    { value: 'a', label: 'Let it pass naturally \u2014 rest, warm water, and care', score: 4 },
                    { value: 'b', label: 'Try home remedies before taking any medicine', score: 3 },
                    { value: 'c', label: 'Take OTC medicine right away', score: 2 },
                    { value: 'd', label: 'Visit a doctor for medication right away', score: 1 }
                ]
            },
            {
                id: 'Q38',
                type: 'scored',
                text: 'How open are you to making lifestyle changes for better health?',
                options: [
                    { value: 'a', label: 'Fully ready \u2014 I\'m committed to whatever changes are needed', score: 4 },
                    { value: 'b', label: 'Mostly open \u2014 willing to try with some guidance', score: 3 },
                    { value: 'c', label: 'Partially \u2014 interested but have some hesitation', score: 2 },
                    { value: 'd', label: 'Not sure \u2014 I need more convincing', score: 1 }
                ]
            },
            {
                id: 'Q39',
                type: 'scored',
                text: 'How do you currently learn about health?',
                options: [
                    { value: 'a', label: 'Actively \u2014 I read, watch, and research natural health', score: 4 },
                    { value: 'b', label: 'Occasionally \u2014 when I face a health issue', score: 3 },
                    { value: 'c', label: 'Rarely \u2014 I depend on my doctor for guidance', score: 2 },
                    { value: 'd', label: 'I don\'t research \u2014 I follow what\'s prescribed', score: 1 }
                ]
            },
            {
                id: 'Q40',
                type: 'scored',
                text: 'What is your main reason for taking this quiz?',
                options: [
                    { value: 'a', label: 'I want to understand my overall health better', score: 4 },
                    { value: 'b', label: 'I\'m looking to reverse or manage a specific condition', score: 3 },
                    { value: 'c', label: 'I want to reduce or get off medications', score: 3 },
                    { value: 'd', label: 'I want to lose weight and feel healthier overall', score: 3 }
                ]
            }
        ]
    }
};

const sectionOrder = [
    'aboutYou',
    'dailyRoutine',
    'dietHabits',
    'gutHealth',
    'breathingMovement',
    'weightBody',
    'medicationHistory',
    'mindEmotions',
    'mindsetAwareness'
];

const dimensionInfo = {
    DAILY_ROUTINE: { name: 'Daily Routine & Sleep', icon: '\u{1F634}', label: 'DAILY ROUTINE', color: '#8b5cf6' },
    DIET:          { name: 'Diet & Eating Habits',  icon: '\u{1F34E}', label: 'DIET',          color: '#ef4444' },
    GUT_HEALTH:    { name: 'Gut Health & Digestion', icon: '\u{1F33F}', label: 'GUT HEALTH',   color: '#22c55e' },
    BREATHING:     { name: 'Breathing & Movement',  icon: '\u{1F3C3}', label: 'BREATHING',     color: '#f97316' },
    WEIGHT:        { name: 'Weight & Body',          icon: '\u2696\uFE0F', label: 'WEIGHT',    color: '#14b8a6' },
    MEDICATION:    { name: 'Medication History',     icon: '\u{1FA7A}', label: 'MEDICATION',   color: '#3b82f6' },
    MIND:          { name: 'Mind & Emotions',        icon: '\u{1F9E0}', label: 'MIND',          color: '#ec4899' },
    MINDSET:       { name: 'Mindset & Awareness',    icon: '\u{1F331}', label: 'MINDSET',       color: '#eab308' }
};
