const myQuestions = [
    {
        id: 0,
        question: "How do you declare a Javascript variable?",
        options: ["var userName;", "variable userName;", "v userName;", "userName variable;"],
        isCorrect: "var userName;"
    },
    {
        id: 1,
        question: "Inside which HTML element do we put Javascript?",
        options: ["<scripting>", "<js>", "<script>", "<javascript>"],
        isCorrect: "<script>"
    },
    {
        id: 2,
        question: "How do you create a function in Javascript?",
        options: ["function myfunction()", "function = myfunction()", "function: myfunction()", "function <= myfunction()"],
        isCorrect: "function myfunction()"
    },
    {
        id: 3,
        question: "How do you write an IF statement?",
        options: ["if i = 5", "if i = 5 then", "if (i == 5)", "if i == 5 then"],
        iscorrect: "if i = 5"
    },
    {
        id: 4,
        question: "Which event occurs when the usr clicks on an HTML element?",
        options: ["onmouseover", "onmouseclick", "onclick", "onchange"],
        isCorrect: "onclick"
    },
]

var start = true;

var timerElement = document.querySelector(".sec-timer");
var startButton = document.querySelector(".start-btn");
var submitButton = document.querySelector("#submit-btn");
var correct = document.querySelector(".correct-answers");

var chosenAnswer = "";
var correctCounter = 0;
var isCorrect = false;
var timer;
var timerCount;

var currentIndex = 0;
let currentQuestion;

let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveScore)

function startQuiz() {
    startButton.classList.add("hide")

    timerCount = 30;
    startTimer();
    renderQuestions();
}

function saveScore() {
    const initialsEl = document.querySelector("#initials");

    const data = {
        initials: initialsEl.value,
        score: correctCounter
    };

    localStorage.setItem("savedScore", JSON.stringify(data));
    console.log(localStorage.getItem("savedScore", JSON.stringify(data)));

    let li = document.createElement("li");
        li.textContent = localStorage.getItem("savedScore");
        scoreListEl.append(li); 
}

function answerClick (event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswer = currentQuestion.isCorrect;

    if(selectedAnswer == correctAnswer) {
        console.log("Correct!")
        correctCounter++;
    } else {
        console.log("Wrong!")
        timerCount -= 5;
    }


    if(currentIndex < myQuestions.length - 1) {
        currentIndex++;
        renderQuestions()
    } else {
        endQuiz();
    }
}

function renderQuestions() {
    currentQuestion = myQuestions[currentIndex];

    question.textContent = currentQuestion.question;

    const answerOptions = document.querySelector(".answer-options");

    const options = currentQuestion.options;

    answerOptions.innerHTML = "";
    for(i = 0; i < options.length; i++) {
        const newBtn = document.createElement("button");
        newBtn.classList.add("option")
        newBtn.textContent = options[i];
        newBtn.addEventListener("click", answerClick)
        answerOptions.append(newBtn)
    }
    return;
}

function endQuiz () {
    const footer = document.querySelector("footer");
    footer.classList.remove("hide")
    const questionSection = document.querySelector(".question-section");
    questionSection.classList.add("hide");

    const correctAnswersEl = document.querySelector(".correct-answers");
    correctAnswersEl.textContent = correctCounter;

    clearInterval(timer)

}


function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        console.log(timerCount)
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isCorrect && timerCount > 0) {
                clearInterval(timer);

            }
        }

        if (timerCount <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

