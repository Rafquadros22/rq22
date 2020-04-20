//questions listed in and object array
var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",

    choices: ["<script>", " <javascript> ", " <js> "],

    answer: "<script>",
  },
  {
    question: "Where is the correct place to insert a JavaScript?",

    choices: [
      "The <head> section ",
      " The <body> section",
      " Both <body> and <head> ",
    ],

    answer: " Both <body> and <head> ",
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",

    choices: ["True", "False"],

    answer: "True",
  },
];
//variables 
var questionId = document.querySelector("#question");

var optionList = document.querySelector("#option-list");

var answerOption = document.querySelector("#question-result");

var timer = document.querySelector("#timer");

var startBtn = document.querySelector("#startBtn");

var count = 0;

var questionIndex = 0;

var timeLeft = 20;

var intervalId;

//start-button click function
startBtn.addEventListener("click", function (event) {
  //hides button after click
  event.target.style.visibility = "hidden";

  event.preventDefault();

  var cdTimer = setInterval(function () {
    if (timeLeft === 0) {
      clearInterval(cdTimer);
      document.getElementById("timer").innerHTML;
    } else {
      document.getElementById("timer").innerHTML = timeLeft;
    }
    timeLeft -= 1;
    if (timeLeft <= 0) {
      finishQuiz();
    }
  }, 2000);

  function renderQuestion() {
    if (timeLeft == 0) {
      cdTimer;

      return;
    }

    questionId.textContent = questions[questionIndex].question;

    optionList.innerHTML = "";

    answerOption.innerHTML = "";

    var choices = questions[questionIndex].choices;

    var choicesLength = choices.length;

    for (var i = 0; i < choicesLength; i++) {
      var questionList = document.createElement("button");

      questionList.classList.add("m-2", "answers");

      questionList.textContent = choices[i];

      optionList.append(questionList);
    }
  }

  function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
      timeLeft = 0;
    }
    renderQuestion();
  }

  function checkAnswer(event) {
    clearInterval(intervalId);

    if (event.target.matches("button")) {
      var answer = event.target.textContent;
    }
    if (answer === questions[questionIndex].answer) {
      answerOption.textContent = "correct";
      count++;
    } else {
      answerOption.textContent = "incorrect";
      timeLeft = timeLeft - 2;
      timer.textContent = timeLeft;
    }

    setTimeout(nextQuestion, 2000);
  }



  function finishQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "GAME OVER " + "YOU SCORED!= " + count;
    setTimeout(showHs, 2);
  }

  function showHs() {
      //ask user for name for high score
    var name = prompt("Please enter your initials for high score");
    var high_scores = localStorage.getItem("scores");
    if (!high_scores) {
      high_scores = [];
    } else {
      high_scores = JSON.parse(high_scores);
    }
    high_scores.push({ name: name, score: count });

    localStorage.setItem("scores", JSON.stringify(high_scores));

    high_scores.sort(function (a, b) {
      return b.score - a.score;
    });

    var contentUL = document.createElement("ul");

    for (var i = 0; i < high_scores.length; i++) {
      var contentLI = document.createElement("li");
      contentLI.textContent =
        "name: " + high_scores[i].name + " score " + high_scores[i].score;
      contentUL.appendChild(contentLI);
    }
    
    //restart button
    var button = document.createElement("button");

    button.innerHTML = "restart-game";

    button.classList.add("restart", "m-1");

    document.body.appendChild(button);

    button.addEventListener("click", function () {
      window.location.href = window.location.href;
    });
    // reset high score button
    var resetHs = document.createElement("button");

    resetHs.innerHTML = "reset HS";

    resetHs.classList.add("reset", "m-1");

    document.body.appendChild(resetHs);

    document.body.appendChild(contentUL);

    resetHs.addEventListener("click", function () {
      localStorage.setItem("scores", JSON.stringify([]));
    });
  
  }

  renderQuestion();

  optionList.addEventListener("click", checkAnswer);
});
