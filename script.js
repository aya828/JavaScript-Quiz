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
var highScoreList = document.getElementById("highScoreList");
var startOverBtn = document.getElementById("startOverBtn");

// Choice buttons for each question
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
var submitBtn = document.getElementById("submit");

submitBtn.onclick = submitScore;

// Function for start button to disappear once clicked and quiz div to appear
startBtn.addEventListener("click", function() {
  startPage.className = "hidden";
  question.className = "";
  startGame();
})

// Function for displaying questions and score after start button
function startGame() {
  questionCounter = 0;
  score = 0;
  scoreDiv.innerText = "Score: " + score;
  availableQuestions = [...questions];
  getNewQuestion();
  setTimer();
}

// Timer display function
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

// Function for getting new question and correct choices for question
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

// Function for adding score for right answer and subtracting time for wrong answer
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

// Function for hiding quiz div and showing results div
function endGame() {
  question.className = "hidden";
  results.className = "";
  startOverBtn.addEventListener("click", function(e) {
    e.preventDefault();
    history.go(-3);
  })
  clearInterval(timerSetIntervalId);
  showScore();
  // startOver.addEventListener("click", function(e) {
  //   e.preventDefault();
  //   window.history.go(-6);
  // })
}

function showScore() {
  var highScores = localStorage.getItem("highscores")
  if(highScores != null) {
    var oldScores = JSON.parse(highScores);
    oldScores.sort(function(a, b){
      
      var aValue = Object.values(a)[0];
      var bValue = Object.values(b)[0];
      return bValue - aValue;
    });
    highScoreList.innerText = "High Scores: " + oldScores.map(function(oldScore){
      var oldScoreKey = Object.keys(oldScore)[0];
      return oldScoreKey + ":" + oldScore[oldScoreKey];
    }).join("\n");
  }
}

// Submitting and saving high scores in local storage and display on page
function submitScore() {
  var oldScores = localStorage.getItem("highscores");
  if(oldScores == null) {
    localStorage.setItem("highscores", JSON.stringify([{[highScoreName.value] : score}]));
  }
  else {
    var highscores = JSON.parse(oldScores);
    highscores.push({[highScoreName.value] : score});
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
  showScore();
}



//   var initial = localStorage.getItem("name");
//   var newScore = localStorage.getItem("score");
//   highScore.innerHTML = "High Scores: " + initial + " " + newScore;

//   var newPlayerScores = [];

//   function findPlayerScore(idx) {
//     localStorage.setItem("idx", JSON.stringify(newPlayerScores));
//     console.log(findPlayerScore);
// });