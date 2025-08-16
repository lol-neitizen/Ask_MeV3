const questions = [
    {
        question: "What's my favourite colour?",
        options: ["Pink", "Orange", "Black"],
        correct: "Pink",
        dialogue: "Shabbas mere Piddi",
        wrongDialogues: {
            "Orange": "EWWWWWWW, orange kisko pasand hai",
            "Black": "WOW! Racist Piddi!"
        }
    },
    {
        question: "What's my favourite song",
        options: ["Chaar Bottle Vodka", "O rangrez", "Selfie Maine Leli Aaj"],
        correct: "O rangrez",
        dialogue: "Ekdum sahi beta!",
        wrongDialogues: {
            "Chaar Bottle Vodka": "Honey singh nahi, bas tum achhe lagte ho, Honey",
            "Selfie Maine Leli Aaj": "Tumhe mai chhapri lagta hu?"
        }
    },
    {
        question: "What's a perfect evening?",
        options: ["Killing Zombies", "Walk with my bros", "Tumhare saath walk"],
        correct: "Tumhare saath walk",
        dialogue: "Ofc it's a walk with YOU",
        wrongDialogues: {
            "Killing Zombies": "Nahi, woh toh sapne mai kar hi leta hu",
            "Walk with my bros": "Chiiiii, you think I am gay?"
        }
    },
    {
        question: "What's my favourite activity?",
        options: ["Sleeping", "Tumse baat karna", "Potty Karna"],
        correct: "Tumse baat karna",
        dialogue: "YES, tumse baat karna bohot achha lagta hai",
        wrongDialogues: {
            "Sleeping": "HUH, you think I am kumbhkaran or what?!",
            "Potty Karna": "Close second, but not it"
        }
    }
];

let currentQuestionIndex = 0;
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const characterImg = document.getElementById('character-img');
const feedbackEl = document.getElementById('feedback');
const speechBubbleEl = document.getElementById('speech-bubble');

function updateUI() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    characterImg.src = 'images/neutral.png';
    speechBubbleEl.innerText = "Hmmmm.....";
    feedbackEl.innerText = "";
    answerButtonsEl.innerHTML = "";

    // Create buttons for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => checkAnswer(option));
        answerButtonsEl.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const correctOption = questions[currentQuestionIndex].correct;
    const characterDialogue = questions[currentQuestionIndex].dialogue;

    // Remove event listeners from buttons to prevent multiple clicks
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.removeEventListener('click', checkAnswer);
    });

    if (selectedOption === correctOption) {
        // Correct answer
        feedbackEl.innerText = "Correct!";
        speechBubbleEl.innerText = characterDialogue;
        answerButtonsEl.innerHTML = "";
        characterImg.src = 'images/happy.png';
        
        // Advance to the next question after a delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                updateUI();
            } else {
                questionEl.innerText = "Shabbas!";
                characterImg.style.display = 'block';
                characterImg.src = 'images/neutral.png';
                speechBubbleEl.innerText = "Thanks for playing!";
                feedbackEl.innerText = "PIDDI PUDDU!";
                
                // Add the Try Again button
                const tryAgainBtn = document.createElement('button');
                tryAgainBtn.innerText = "Try Again?";
                tryAgainBtn.classList.add('answer-btn');
                tryAgainBtn.addEventListener('click', resetGame);
                answerButtonsEl.appendChild(tryAgainBtn);
            }
        }, 1500);
    } else {
        // Incorrect answer
        feedbackEl.innerText = "";
        const wrongMessage = questions[currentQuestionIndex].wrongDialogues[selectedOption];
        speechBubbleEl.innerText = wrongMessage || "Hmm, not quite!";
        characterImg.src = 'images/angry.png';
    }
}

// Function to reset the game and loop back to the start
function resetGame() {
    currentQuestionIndex = 0;
    characterImg.style.display = 'block';
    updateUI();
}

// Initial UI load
updateUI();
