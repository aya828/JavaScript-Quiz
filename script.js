var question = document.getElementById("question");
var scoreDiv = document.getElementById("score");
var highScore = document.getElementById("highScore");
var timer = document.getElementById("timer");
var title = document.getElementById("title");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var highScoreName = document.getElementById("name");

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
    score = score + 20;
    scoreDiv.innerText = "Score: " + score;
  }
  else {
    time = time - 5;
  
  }
  questionCounter++;
  getNewQuestion();
}

function endGame() {
  question.className = "hidden";
  results.className = "";
  clearInterval(timerSetIntervalId);
  highScores();
}

function highScores() {
  var submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", function(e) {
    e.preventDefault();
    var name = highScoreName.value; 
    localStorage.setItem("score", score);
    localStorage.setItem("name", name);
  })

  var initial = localStorage.getItem("name");
  var newScore = localStorage.getItem("score");
  highScore.innerHTML = "High Scores: " + initial + " " + newScore;


  var newScores = [
    { name: "", score: 10 },
    { name: "", score: 10 },
    { name: "", score: 10 }
  ];

function findPlayerScore(idx) {
  localStorage.setItem("idx", JSON.stringify(newScores));
};

findPlayerScore();