document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let questions = [];
    let score = 0;
    let totalQuestions = 4; // We'll show exactly 4 questions
    const questionDelay = 2000; // 2 seconds delay between questions

    // DOM elements
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const checkButton = document.getElementById('check-button');
    const scoreElement = document.getElementById('score');
    const progressElement = document.getElementById('progress');

    // Fetch and format questions from backend
    async function fetchQuestions() {
        try {
            const topics = localStorage.getItem("selectedQuizzes");
            const response = await fetch(`display_quiz?topics=${topics}`);
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const quizzes = await response.json();
            
            // Transform and shuffle questions, then take first 4
            return quizzes
                .map(quiz => ({
                    question: quiz.question,
                    answers: quiz.answers.split(',').map(a => a.trim()),
                    correctAnswer: quiz.answers.split(',')
                        .map(a => a.trim())
                        .findIndex(a => a === quiz.correct),
                    topic: quiz.topic
                }))
                .sort(() => Math.random() - 0.5)
                .slice(0, totalQuestions);
                
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Fallback questions
            return [
                {
                    question: "What is the capital of France?",
                    answers: ["Paris", "London", "Berlin", "Madrid"],
                    correctAnswer: 0,
                    topic: "Geography"
                },
                {
                    question: "Which planet is known as the Red Planet?",
                    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
                    correctAnswer: 1,
                    topic: "Astronomy"
                },
                {
                    question: "What is 2 + 2?",
                    answers: ["3", "4", "5", "6"],
                    correctAnswer: 1,
                    topic: "Math"
                },
                {
                    question: "Which language runs in a web browser?",
                    answers: ["Java", "C", "Python", "JavaScript"],
                    correctAnswer: 3,
                    topic: "Technology"
                }
            ];
        }
    }

    // Display question and update progress
    function displayQuestion(question) {
        questionElement.textContent = question.question;
        answersElement.innerHTML = '';
        
        // Update progress display
        progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        
        // Create answer buttons
        question.answers.forEach((answer, index) => {
            const answerButton = document.createElement('button');
            answerButton.className = 'answer';
            answerButton.textContent = answer;
            answerButton.addEventListener('click', () => selectAnswer(answerButton, index));
            answersElement.appendChild(answerButton);
        });

        checkButton.disabled = true;
    }

    // Handle answer selection
    function selectAnswer(selectedButton, selectedIndex) {
        document.querySelectorAll('.answer').forEach(button => {
            button.classList.remove('selected');
        });
        selectedButton.classList.add('selected');
        checkButton.disabled = false;
    }

    // Check answer and update score
    function checkAnswer(question) {
        const selectedButton = document.querySelector('.answer.selected');
        const selectedIndex = Array.from(document.querySelectorAll('.answer')).indexOf(selectedButton);
        const isCorrect = selectedIndex === question.correctAnswer;

        // Update score if correct
        if (isCorrect) {
            score++;
            scoreElement.textContent = `Score: ${score}/${totalQuestions}`;
        }

        // Show correct/incorrect feedback
        document.querySelectorAll('.answer').forEach((button, index) => {
            if (index === question.correctAnswer) {
                button.classList.add('correct');
            } else if (index === selectedIndex) {
                button.classList.add('incorrect');
            }
            button.disabled = true;
        });

        checkButton.disabled = true;

        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                loadNextQuestion();
            } else {
                endQuiz();
            }
        }, questionDelay);
    }

    // Load next question
    async function loadNextQuestion() {
        displayQuestion(questions[currentQuestionIndex]);
    }

    // End of quiz
    function endQuiz() {
        // Store score in localStorage if you want to use it later
        localStorage.setItem('quizScore', score);
        
        // Redirect to results page (modify as needed)
        window.location.href = `workoutpage.html?score=${score}&total=${totalQuestions}`;
    }

    // Initialize quiz
    async function initQuiz() {
        questions = await fetchQuestions();
        totalQuestions = Math.min(totalQuestions, questions.length); // Ensure we don't exceed available questions
        
        // Initialize score display
        scoreElement.textContent = `Score: ${score}/${totalQuestions}`;
        
        // Start with first question
        displayQuestion(questions[currentQuestionIndex]);
        
        // Setup check button listener
        checkButton.addEventListener('click', () => checkAnswer(questions[currentQuestionIndex]));
    }

    // Start quiz
    initQuiz();
});