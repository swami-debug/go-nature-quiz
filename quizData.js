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
                    { value: '18-24', label: '18-24 years' },
                    { value: '25-34', label: '25-34 years' },
                    { value: '35-44', label: '35-44 years' },
                    { value: '45-54', label: '45-54 years' },
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
                    { value: '1-2', label: '1-2 people' },
                    { value: '3-4', label: '3-4 people' },
                    { value: '5+', label: '5 or more people' }
                ]
            }
        ]
    },

    hydration: {
        id: 'hydration-habits',
        title: 'Hydration Habits',
        subtitle: 'Your daily water intake patterns',
        icon: '\u{1F4A7}',
        scored: true,
        dimension: 'HYDRATION',
        questions: [
            {
                id: 'Q5',
                type: 'scored',
                text: 'How many liters of water do you drink daily?',
                options: [
                    { value: 'less-1', label: 'Less than 1 liter', score: 1 },
                    { value: '1-2', label: '1\u20132 liters', score: 2 },
                    { value: '2-3', label: '2\u20133 liters', score: 3 },
                    { value: 'more-3', label: 'More than 3 liters', score: 4 }
                ]
            },
            {
                id: 'Q6',
                type: 'scored',
                text: 'When do you usually drink your first glass of water?',
                options: [
                    { value: 'immediately', label: 'Immediately after waking up', score: 4 },
                    { value: 'after-breakfast', label: 'After breakfast', score: 3 },
                    { value: 'mid-morning', label: 'Mid-morning', score: 2 },
                    { value: 'no-habit', label: "I don\u2019t have a fixed habit", score: 1 }
                ]
            },
            {
                id: 'Q7',
                type: 'scored',
                text: 'Do you drink warm water in the morning?',
                options: [
                    { value: 'always', label: 'Always', score: 4 },
                    { value: 'often', label: 'Often', score: 3 },
                    { value: 'sometimes', label: 'Sometimes', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q8',
                type: 'scored',
                text: 'How often do you drink sugary drinks or soda?',
                options: [
                    { value: 'daily', label: 'Daily', score: 1 },
                    { value: 'few-week', label: 'Few times a week', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 3 },
                    { value: 'never', label: 'Never', score: 4 }
                ]
            },
            {
                id: 'Q9',
                type: 'likert',
                text: 'I feel well hydrated during the day.'
            }
        ]
    },

    food: {
        id: 'food-habits',
        title: 'Food Habits',
        subtitle: 'Your daily nutrition patterns',
        icon: '\u{1F34E}',
        scored: true,
        dimension: 'FOOD',
        questions: [
            {
                id: 'Q10',
                type: 'scored',
                text: 'How many meals do you eat daily?',
                options: [
                    { value: '1-2', label: '1\u20132 meals', score: 2 },
                    { value: '3', label: '3 meals', score: 4 },
                    { value: '4', label: '4 meals', score: 3 },
                    { value: 'more-4', label: 'More than 4', score: 1 }
                ]
            },
            {
                id: 'Q11',
                type: 'scored',
                text: 'How often do you eat fresh fruits?',
                options: [
                    { value: 'daily', label: 'Daily', score: 4 },
                    { value: 'few-week', label: 'Few times a week', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q12',
                type: 'scored',
                text: 'How often do you eat vegetables?',
                options: [
                    { value: 'every-meal', label: 'Every meal', score: 4 },
                    { value: 'once-day', label: 'Once a day', score: 3 },
                    { value: 'few-week', label: 'Few times a week', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 1 }
                ]
            },
            {
                id: 'Q13',
                type: 'scored',
                text: 'How often do you eat processed or packaged foods?',
                options: [
                    { value: 'daily', label: 'Daily', score: 1 },
                    { value: 'few-week', label: 'Few times a week', score: 2 },
                    { value: 'occasionally', label: 'Occasionally', score: 3 },
                    { value: 'never', label: 'Never', score: 4 }
                ]
            },
            {
                id: 'Q14',
                type: 'scored',
                text: 'Do you eat breakfast regularly?',
                options: [
                    { value: 'always', label: 'Always', score: 4 },
                    { value: 'often', label: 'Often', score: 3 },
                    { value: 'sometimes', label: 'Sometimes', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q15',
                type: 'scored',
                text: 'At what time do you usually eat dinner?',
                options: [
                    { value: 'before-7', label: 'Before 7 PM', score: 4 },
                    { value: '7-8', label: '7\u20138 PM', score: 3 },
                    { value: '8-9', label: '8\u20139 PM', score: 2 },
                    { value: 'after-9', label: 'After 9 PM', score: 1 }
                ]
            },
            {
                id: 'Q16',
                type: 'likert',
                text: 'Do you eat food slowly and mindfully?'
            },
            {
                id: 'Q17',
                type: 'scored',
                text: 'How often do you eat outside food?',
                options: [
                    { value: 'daily', label: 'Daily', score: 1 },
                    { value: 'weekly', label: 'Weekly', score: 2 },
                    { value: 'occasionally', label: 'Occasionally', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 4 }
                ]
            },
            {
                id: 'Q18',
                type: 'likert',
                text: 'Do you include natural foods like sprouts, fruits, or salads in your diet?'
            },
            {
                id: 'Q19',
                type: 'scored',
                text: 'How often do you feel heavy or bloated after eating?',
                options: [
                    { value: 'often', label: 'Often', score: 1 },
                    { value: 'sometimes', label: 'Sometimes', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 3 },
                    { value: 'never', label: 'Never', score: 4 }
                ]
            }
        ]
    },

    sleep: {
        id: 'sleep-habits',
        title: 'Sleep Habits',
        subtitle: 'Your rest and recovery patterns',
        icon: '\u{1F634}',
        scored: true,
        dimension: 'SLEEP',
        questions: [
            {
                id: 'Q20',
                type: 'scored',
                text: 'How many hours do you sleep daily?',
                options: [
                    { value: 'less-5', label: 'Less than 5', score: 1 },
                    { value: '5-6', label: '5\u20136 hours', score: 2 },
                    { value: '6-7', label: '6\u20137 hours', score: 3 },
                    { value: '7-8', label: '7\u20138 hours', score: 5 },
                    { value: 'more-8', label: 'More than 8', score: 4 }
                ]
            },
            {
                id: 'Q21',
                type: 'scored',
                text: 'What time do you usually go to bed?',
                options: [
                    { value: 'before-10', label: 'Before 10 PM', score: 4 },
                    { value: '10-11', label: '10\u201311 PM', score: 3 },
                    { value: '11-12', label: '11\u201312 PM', score: 2 },
                    { value: 'after-midnight', label: 'After midnight', score: 1 }
                ]
            },
            {
                id: 'Q22',
                type: 'scored',
                text: 'How often do you wake up feeling refreshed?',
                options: [
                    { value: 'always', label: 'Always', score: 4 },
                    { value: 'often', label: 'Often', score: 3 },
                    { value: 'sometimes', label: 'Sometimes', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 1 }
                ]
            },
            {
                id: 'Q23',
                type: 'scored',
                text: 'Do you use your phone before sleeping?',
                options: [
                    { value: 'always', label: 'Always', score: 1 },
                    { value: 'often', label: 'Often', score: 2 },
                    { value: 'sometimes', label: 'Sometimes', score: 3 },
                    { value: 'never', label: 'Never', score: 4 }
                ]
            },
            {
                id: 'Q24',
                type: 'likert',
                text: 'I struggle to fall asleep quickly.',
                reverse: true
            }
        ]
    },

    activity: {
        id: 'physical-activity',
        title: 'Physical Activity',
        subtitle: 'Your movement and exercise habits',
        icon: '\u{1F3C3}',
        scored: true,
        dimension: 'ACTIVITY',
        questions: [
            {
                id: 'Q25',
                type: 'scored',
                text: 'How often do you exercise?',
                options: [
                    { value: 'daily', label: 'Daily', score: 4 },
                    { value: '3-4-week', label: '3\u20134 times a week', score: 3 },
                    { value: 'once-week', label: 'Once a week', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 1 }
                ]
            },
            {
                id: 'Q26',
                type: 'scored',
                text: 'What type of exercise do you usually do?',
                options: [
                    { value: 'walking', label: 'Walking', score: 3 },
                    { value: 'yoga', label: 'Yoga', score: 4 },
                    { value: 'gym', label: 'Gym workout', score: 3 },
                    { value: 'none', label: 'None', score: 1 }
                ]
            },
            {
                id: 'Q27',
                type: 'scored',
                text: 'How many minutes do you move or walk daily?',
                options: [
                    { value: 'less-15', label: 'Less than 15 minutes', score: 1 },
                    { value: '15-30', label: '15\u201330 minutes', score: 2 },
                    { value: '30-60', label: '30\u201360 minutes', score: 3 },
                    { value: 'more-60', label: 'More than 60 minutes', score: 4 }
                ]
            },
            {
                id: 'Q28',
                type: 'likert',
                text: 'Do you stretch your body regularly?'
            },
            {
                id: 'Q29',
                type: 'scored',
                text: 'How often do you spend time outdoors?',
                options: [
                    { value: 'daily', label: 'Daily', score: 4 },
                    { value: 'few-week', label: 'Few times a week', score: 3 },
                    { value: 'occasionally', label: 'Occasionally', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 1 }
                ]
            }
        ]
    },

    stress: {
        id: 'stress-mental-health',
        title: 'Stress & Mental Health',
        subtitle: 'Your emotional wellness patterns',
        icon: '\u{1F9E0}',
        scored: true,
        dimension: 'STRESS',
        questions: [
            {
                id: 'Q30',
                type: 'scored',
                text: 'How stressed do you feel in daily life?',
                options: [
                    { value: 'very', label: 'Very stressed', score: 1 },
                    { value: 'moderate', label: 'Moderately stressed', score: 2 },
                    { value: 'slightly', label: 'Slightly stressed', score: 3 },
                    { value: 'not', label: 'Not stressed', score: 4 }
                ]
            },
            {
                id: 'Q31',
                type: 'likert',
                text: 'How often do you feel overwhelmed with responsibilities?',
                reverse: true
            },
            {
                id: 'Q32',
                type: 'scored',
                text: 'Do you practice meditation or breathing exercises?',
                options: [
                    { value: 'daily', label: 'Daily', score: 4 },
                    { value: 'sometimes', label: 'Sometimes', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q33',
                type: 'scored',
                text: 'How often do you take breaks during work?',
                options: [
                    { value: 'every-hour', label: 'Every hour', score: 4 },
                    { value: 'few-daily', label: 'Few times daily', score: 3 },
                    { value: 'once-day', label: 'Once a day', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 1 }
                ]
            },
            {
                id: 'Q34',
                type: 'likert',
                text: 'Do you feel mentally relaxed at the end of the day?'
            }
        ]
    },

    natural: {
        id: 'natural-lifestyle',
        title: 'Natural Lifestyle',
        subtitle: 'Aligned with GoNature',
        icon: '\u{1F33F}',
        scored: true,
        dimension: 'NATURAL',
        questions: [
            {
                id: 'Q35',
                type: 'scored',
                text: 'How often do you expose yourself to sunlight?',
                options: [
                    { value: 'daily', label: 'Daily', score: 4 },
                    { value: 'few-week', label: 'Few times a week', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q36',
                type: 'scored',
                text: 'Do you walk barefoot on natural ground (grass/soil)?',
                options: [
                    { value: 'often', label: 'Often', score: 4 },
                    { value: 'sometimes', label: 'Sometimes', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q37',
                type: 'likert',
                text: 'How often do you practice deep breathing in fresh air?'
            },
            {
                id: 'Q38',
                type: 'scored',
                text: 'Do you prefer natural remedies before medicines?',
                options: [
                    { value: 'always', label: 'Always', score: 4 },
                    { value: 'often', label: 'Often', score: 3 },
                    { value: 'sometimes', label: 'Sometimes', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q39',
                type: 'scored',
                text: 'How often do you consume herbal drinks or natural juices?',
                options: [
                    { value: 'daily', label: 'Daily', score: 4 },
                    { value: 'few-week', label: 'Few times a week', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            }
        ]
    },

    awareness: {
        id: 'lifestyle-awareness',
        title: 'Lifestyle Awareness',
        subtitle: 'Your daily health consciousness',
        icon: '\u{1F9CD}',
        scored: true,
        dimension: 'AWARENESS',
        questions: [
            {
                id: 'Q40',
                type: 'scored',
                text: 'How often do you check your health indicators (weight, BP, etc.)?',
                options: [
                    { value: 'monthly', label: 'Monthly', score: 4 },
                    { value: 'few-year', label: 'Few times a year', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            },
            {
                id: 'Q41',
                type: 'likert',
                text: 'Do you feel energetic throughout the day?'
            },
            {
                id: 'Q42',
                type: 'scored',
                text: 'How often do you feel tired during the day?',
                options: [
                    { value: 'often', label: 'Often', score: 1 },
                    { value: 'sometimes', label: 'Sometimes', score: 2 },
                    { value: 'rarely', label: 'Rarely', score: 3 },
                    { value: 'never', label: 'Never', score: 4 }
                ]
            },
            {
                id: 'Q43',
                type: 'likert',
                text: 'Do you spend time relaxing without screens?'
            },
            {
                id: 'Q44',
                type: 'scored',
                text: 'How often do you laugh or engage in enjoyable activities?',
                options: [
                    { value: 'daily', label: 'Daily', score: 4 },
                    { value: 'few-week', label: 'Few times a week', score: 3 },
                    { value: 'rarely', label: 'Rarely', score: 2 },
                    { value: 'never', label: 'Never', score: 1 }
                ]
            }
        ]
    },

    selfAwareness: {
        id: 'self-awareness',
        title: 'Self Awareness',
        subtitle: 'Your readiness for change',
        icon: '\u{1F331}',
        scored: true,
        dimension: 'SELF_AWARENESS',
        questions: [
            {
                id: 'Q45',
                type: 'likert',
                text: 'Do you believe lifestyle changes can improve your health?'
            },
            {
                id: 'Q46',
                type: 'scored',
                text: 'How motivated are you to improve your health?',
                options: [
                    { value: 'very', label: 'Very motivated', score: 4 },
                    { value: 'somewhat', label: 'Somewhat motivated', score: 3 },
                    { value: 'slightly', label: 'Slightly motivated', score: 2 },
                    { value: 'not', label: 'Not motivated', score: 1 }
                ]
            },
            {
                id: 'Q47',
                type: 'likert',
                text: 'How open are you to learning natural healing methods?'
            },
            {
                id: 'Q48',
                type: 'scored',
                text: 'How ready are you to adopt healthier habits?',
                options: [
                    { value: 'very', label: 'Very ready', score: 4 },
                    { value: 'somewhat', label: 'Somewhat ready', score: 3 },
                    { value: 'slightly', label: 'Slightly ready', score: 2 },
                    { value: 'not', label: 'Not ready', score: 1 }
                ]
            },
            {
                id: 'Q49',
                type: 'scored',
                text: 'Would you like guidance to improve your health naturally?',
                options: [
                    { value: 'yes', label: 'Yes, definitely', score: 4 },
                    { value: 'maybe', label: 'Maybe', score: 3 },
                    { value: 'not-sure', label: 'Not sure', score: 2 },
                    { value: 'no', label: 'No', score: 1 }
                ]
            }
        ]
    }
};

const sectionOrder = ['aboutYou', 'hydration', 'food', 'sleep', 'activity', 'stress', 'natural', 'awareness', 'selfAwareness'];

const dimensionInfo = {
    HYDRATION: { name: 'Hydration', icon: '\u{1F4A7}', label: 'HYDRATION', color: '#3b82f6' },
    FOOD: { name: 'Food Habits', icon: '\u{1F34E}', label: 'FOOD', color: '#ef4444' },
    SLEEP: { name: 'Sleep', icon: '\u{1F634}', label: 'SLEEP', color: '#8b5cf6' },
    ACTIVITY: { name: 'Physical Activity', icon: '\u{1F3C3}', label: 'ACTIVITY', color: '#f97316' },
    STRESS: { name: 'Stress & Mental Health', icon: '\u{1F9E0}', label: 'STRESS', color: '#ec4899' },
    NATURAL: { name: 'Natural Lifestyle', icon: '\u{1F33F}', label: 'NATURAL', color: '#22c55e' },
    AWARENESS: { name: 'Lifestyle Awareness', icon: '\u{1F9CD}', label: 'AWARENESS', color: '#14b8a6' },
    SELF_AWARENESS: { name: 'Self Awareness', icon: '\u{1F331}', label: 'SELF AWARENESS', color: '#eab308' }
};
