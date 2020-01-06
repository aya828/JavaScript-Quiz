var questions = [ 
  {
    title: "Commonly used data types DO NOT include:",
    choice1: "strings",
    choice2: "booleans",
    choice3: "alerts",
    choice4: "numbers",
    answer: 3
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choice1: "quotes",
    choice2: "curly brackets",
    choice3: "parenthese",
    choice4: "square brackets",
    answer: 3
  },
  {
    title: "Arrays in javascript can be used to store ________.",
    choice1: "numbers & strings",
    choice2: "other arrarys",
    choice3: "booleans",
    choice4: "all of the above",
    answer: 4
  },
  {
    title: "String values must be enclosed within ______ when being assigned variables.",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parentheses",
    answer: 2
  },
  {
    title: "A very useful tool to use during developement and debugging for printing content to the debugger is:",
    choice1: "Javascript",
    choice2: "terminal/bash",
    choice3: "for loops",
    choice4: "console log",
    answer: 3
  }
];

var question = document.getElementById("question");
var scoreDiv = document.getElementById("score");
var timer = document.getElementById("timer");
var title = document.getElementById("title");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");

choice1.onclick = () => onAnswer(1);
choice2.onclick = () => onAnswer(2);
choice3.onclick = () => onAnswer(3);
choice4.onclick = () => onAnswer(4);

var currentQuestion = {};
var correctAnswer = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var correctBonus = 10;
var maxQuestions = 5;
var time = 75;
var timerSetIntervalId;

var startBtn = document.getElementById("startBtn");
var startPage = document.getElementById("start");
var results = document.getElementById("results");

startBtn.addEventListener("click", function() {
  startPage.className = "hidden";
  question.className = "";
  startGame();
})

function startGame() {
  questionCounter = 0;
  score = 0;
  scoreDiv.innerText = "Score: " + score;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
  setTimer();
}

function setTimer() {
  updateTimer();
  timerSetIntervalId = setInterval(function () {
    time--;
    updateTimer();
    if(time === 0) {
      endGame();
    }
  }, 1000)
}

function updateTimer() {
  timer.innerText = "Timer: " + time;
}

function getNewQuestion() {
  if(questionCounter < questions.length) {
    currentQuestion = availableQuestions[questionCounter];
    title.innerText = currentQuestion.title;
    choice1.innerText = currentQuestion.choice1;
    choice2.innerText = currentQuestion.choice2;
    choice3.innerText = currentQuestion.choice3;
    choice4.innerText = currentQuestion.choice4;
  }
  else {
    endGame();
  }
}

function onAnswer(selectedChoice) {
  if(currentQuestion.answer == selectedChoice) {
    score++;
    scoreDiv.innerText = "Score: " + score;
  }
  questionCounter++;
  getNewQuestion();
}

function endGame() {
  question.className = "hidden";
  results.className = "";
  clearInterval(timerSetIntervalId);
}