// ============ QUIZ DATA - 20 QUESTIONS ABOUT YOU ============
const quizData = [
    {
        question: "What's my favorite thing to do?",
        options: ["Sleep", "Work", "gym", "Travel"],
        correct: 3
    },
    {
        question: "what's my favorite color?",
        options: ["Blue", "Green", "Red", "black"],
        correct: 2.4
    },
    {
        question: "What do I love about you the most?",
        options: ["Your jokes", "Your kindness", "Your honesty", "All of the above"],
        correct: 4
    },
    {
        question: "How often do we laugh together?",
        options: ["Sometimes", "Often", "Almost every day", "Never"],
        correct: 3
    },
    {
        question: "What's something special about you?",
        options: ["your smile", "your talk", "sleeping to much (XD)", "everyting"],
        correct: 4.2
    },
    {
        question: "What type of person are you?",
        options: ["Serious", "Funny and playful", "Shy", "Both funny and shy"],
        correct: 4
    },
    {
        question: "When do you feel most like yourself?",
        options: ["At work", "With friends", "When sleeping", "When laughing"],
        correct: 3
    },
    {
        question: "what is my favourite car?",
        options: ["bmw", "Mercedeces", "dacia", "urus"],
        correct: 4
    },
    {
        question: "What's the best time of day for you?",
        options: ["Morning", "Afternoon", "Evening", "Night/Sleep time"],
        correct: 4
    },
    {
        question: "How would you describe me?",
        options: ["foolish", "normal", "Genius (of course)", "Rare and valuable"],
        correct: 4
    },
    {
        question: "What brings you the most comfort?",
        options: ["Success", "Money", "Rest", "music"],
        correct: 3
    },
    {
        question: "what do you think my personality is like ?",
        options: ["angry", "funny", "shy", "dumb "],
        correct: 2
    },
    {
        question: "what's one thing that i love to do when im angry?",
        options: ["sleep", "go out", "listen some music", "both of them"],
        correct: 4
    },
    {
        question: "How often do I think about our conversations?",
        options: ["Rarely", "Sometimes", "Often", "Almost always"],
        correct: 4
    },
    {
        question: "What's special about your personality?",
        options: ["You're serious", "You're genuine and authentic", "You're fake", "you're not just one type"],
        correct: 4
    },
    {
        question: "how many brother's i have?",
        options: ["2", "3", "5", "4"],
        correct: 2
    },
    {
        question: "What's something i like in you?",
        options: ["todo", "everything", "kolchi", "tout"],
        correct: 1.2
    },
    {
        question: "What do you think make me happy?",
        options: ["see my people good", "money", "going out", "playing"],
        correct: 1
    },
    {
        question: "what's my favourite food?",
        options: ["couscous", "sfa", "tanjia", "djaj"],
        correct: 2
    },
    {
        question: "What does this entire experience represent?",
        options: ["A confession", "A good time", "Pressure on you", "A memory"],
        correct: 2
    }
];


const state = {
    currentQuestion: 0,
    answers: Array(20).fill(null),
    showResults: false,
    quizStarted: false,
    visitedZones: {
        sleep: false,
                memory: false,
        message: false
    }
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
        document.querySelector('.main-container').classList.remove('hidden');
    }, 2500);

    setupEventListeners();
    initializeQuiz();
});

function setupEventListeners() {

    document.querySelectorAll('.zone-card').forEach(card => {
        card.addEventListener('click', () => {
            const zone = card.dataset.zone;
            const modalMap = {
                sleep:'sleepModal',
                                quiz:'quizModal',
                memory:'memoryModal',
                message:'messageModal'
            };
            if(modalMap[zone]){
                openModal(modalMap[zone]);
                unlockZone(zone);
            }
        });
    });

    // Enter World Button
    document.getElementById('btnEnter').addEventListener('click', enterWorld);

    // Back Button
    document.getElementById('btnBack').addEventListener('click', exitWorld);

    // Modal Close on Background Click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

// ============ NAVIGATION ============
function enterWorld() {
    const splash = document.getElementById('splashScreen');
    const world = document.getElementById('mainWorld');

    splash.classList.add('hidden');
    setTimeout(() => {
        world.classList.remove('hidden');
    }, 100);
}

function exitWorld() {
    const splash = document.getElementById('splashScreen');
    const world = document.getElementById('mainWorld');

    world.classList.add('hidden');
    setTimeout(() => {
        splash.classList.remove('hidden');
    }, 100);
}

// ============ MODAL MANAGEMENT ============
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Initialize quiz if opening quiz modal
        if (modalId === 'quizModal') {
            state.quizStarted = true;
            displayQuestion();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ============ QUIZ SYSTEM ============
function initializeQuiz() {
    // Shuffle quiz questions (keep them in order for consistency)
    state.currentQuestion = 0;
    state.answers = Array(20).fill(null);
    state.showResults = false;
}

function displayQuestion() {
    if (state.showResults) {
        showResults();
        return;
    }

    const question = quizData[state.currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsGrid = document.getElementById('optionsGrid');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const progressFill = document.getElementById('quizProgressFill');

    // Update question
    questionText.textContent = question.question;

    // Update progress
    const progress = ((state.currentQuestion + 1) / 20) * 100;
    progressFill.style.width = progress + '%';
    currentQuestionSpan.textContent = state.currentQuestion + 1;

    // Clear previous options
    optionsGrid.innerHTML = '';

    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;

        // Check if this answer was previously selected
        if (state.answers[state.currentQuestion] === index) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => selectAnswer(index));
        optionsGrid.appendChild(button);
    });

    // Update button states
    updateQuizButtons();

    // Auto-scroll to question
    setTimeout(() => {
        document.querySelector('.question-box').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function selectAnswer(answerIndex) {
    state.answers[state.currentQuestion] = answerIndex;

    // Update UI
    document.querySelectorAll('.option-btn').forEach((btn, idx) => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        if (idx === answerIndex) {
            btn.classList.add('selected');
        }
    });

    showToast('Answer saved');
}

function nextQuestion() {
    if (state.currentQuestion < 19) {
        state.currentQuestion++;
        displayQuestion();
    } else {
        state.showResults = true;
        displayQuestion();
    }
}

function previousQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        displayQuestion();
    }
}

function updateQuizButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = state.currentQuestion === 0;
    
    if (state.currentQuestion === 19) {
        nextBtn.textContent = 'Finish Quiz';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

function showResults() {
    const quizContainer = document.getElementById('quizContainer');
    const quizResults = document.getElementById('quizResults');

    // Calculate score
    let score = 0;
    state.answers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });

    // Update results
    document.getElementById('scoreValue').textContent = score;
    const percentage = Math.round((score / 20) * 100);
    document.getElementById('scorePercentage').textContent = percentage + '%';

    // Get message based on score
    let message = '';
    if (score === 20) {
        message = '🎯 Perfect! You know everything about me! That means so much.';
    } else if (score >= 18) {
        message = '🌟 Excellent! You really do understand me. I\'m impressed!';
    } else if (score >= 15) {
        message = '✨ Great job! You know me better than most people. Thank you for caring.';
    } else if (score >= 12) {
        message = '💙 Good effort! You got some right. That\'s what matters—you tried.';
    } else if (score >= 8) {
        message = '😊 Not bad! Getting to know someone takes time. I\'m glad you\'re trying.';
    } else {
        message = '🎭 It\'s okay! But now you know me better. Let\'s talk more.';
    }

    document.getElementById('scoreMessage').textContent = message;

    // Show results, hide quiz
    quizContainer.classList.add('hidden');
    quizResults.classList.remove('hidden');

    showToast(`Quiz completed! Score: ${score}/20`);
    unlockZone('quiz');
}

function retakeQuiz() {
    state.currentQuestion = 0;
    state.answers = Array(20).fill(null);
    state.showResults = false;

    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');

    displayQuestion();
}

// ============ ZONE MANAGEMENT ============
function unlockZone(zone) {
    state.visitedZones[zone] = true;
    updateProgress();
    showToast(`${zone.charAt(0).toUpperCase() + zone.slice(1)} Zone Visited`);
}

function updateProgress() {
    const visitedCount = Object.values(state.visitedZones).filter(v => v).length;
    const totalZones = Object.keys(state.visitedZones).length;
    const percentage = Math.round((visitedCount / totalZones) * 100);

    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressValue').textContent = percentage + '%';
}

// ============ NOTIFICATIONS ============
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastContent = document.getElementById('toastContent');

    toastContent.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ============ UTILITY FUNCTIONS ============
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Log for debugging
console.log('Marwa\'s World loaded successfully');
console.log('Quiz questions:', quizData.length);