//ask user for name for high score
var name = prompt("Please enter your initials for high score");
//questions listed in and object array
var questions = [{

    question: "Inside which HTML element do we put the JavaScript?",

    choices: [" <script> ", " <javascript> ", " <js> "],

    answer: " <script> "
},
{
    question: "Where is the correct place to insert a JavaScript?",

    choices: ["The <head> section ", " The <body> section", " Both <body> and <head> "],

    answer: " Both <body> and <head> "

},
{
    question: "The external JavaScript file must contain the <script> tag.",

    choices: ["True", "False"],

    answer: "True"

},
];


//declared variables
var questionEl = document.querySelector("#question");

var optionListEl = document.querySelector("#option-list");

var questionResultEl = document.querySelector("#question-result");

var timerEl = document.querySelector("#timer");

var startButton = document.querySelector("#startBtn");

var correctCount = 0;

var questionIndex = 0;

var time = 20;

var intervalId;



//start button 
startButton.addEventListener("click", function (event) {
  //hide button after clickedtoring
    event.target.style.visibility = "hidden";
  
    event.preventDefault();




    //end quiz function
    function endQuiz() {
        clearInterval(intervalId);
        var body = document.body;
        body.innerHTML = "Game over, You scored " + correctCount;
        setTimeout(showHighScore, 2);
    }

    //high score function
    function showHighScore() {


        var high_scores = localStorage.getItem("scores");
        if (!high_scores) {
            high_scores = [];
        } else {
            high_scores = JSON.parse(high_scores);
        }
        high_scores.push({ name: name, score: correctCount });

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
        
        button.classList.add("restart", "m-2");
        
        document.body.appendChild(button);
        
        button.addEventListener("click", function () {
            window.location.href = window.location.href
        });
        // reset high score button
        var resetHs = document.createElement("button");
        
        resetHs.innerHTML = "reset HS";
        
        resetHs.classList.add("reset", "m-2");
        
        document.body.appendChild(resetHs);
        
        document.body.appendChild(contentUL);
        
        resetHs.addEventListener("click", function () {
            localStorage.setItem("scores", JSON.stringify([]));
        });

    };



//update time function
    function updateTime() {
        
        time--;
        
        timerEl.textContent = time;
        
        if (time <= 0) {
            endQuiz();
        }
    }




//render question
    function renderQuestion() {
        
        if (time == 0) {
        
            updateTime();
        
            return;
        }

        intervalId = setInterval(updateTime, 1000);

        questionEl.textContent = questions[questionIndex].question;

        optionListEl.innerHTML = "";

        questionResultEl.innerHTML = "";

        var choices = questions[questionIndex].choices;

        var choicesLength = choices.length;

        for (let i = 0; i < choicesLength; i++) {
            var questionListItem = document.createElement("button");
            
            questionListItem.classList.add("m-2", "answers");
            
            questionListItem.textContent = choices[i];
            
            optionListEl.append(questionListItem);
        }


    }

// nest question function
    function nextQuestion() {
        questionIndex++;
        if (questionIndex === questions.length) {
            time = 0;
        }

        renderQuestion();
    }

//check answer function 
    function checkAnswer(event) {
        clearInterval(intervalId);
        if (event.target.matches("button")) {
            var answer = event.target.textContent;
            if (answer === questions[questionIndex].answer) {
                questionResultEl.textContent = "correct";
                correctCount++;
            } else {
                questionResultEl.textContent = "incorrect";
                time = time - 2;
                timerEl.textContent = time;
            }


        }
        setTimeout(nextQuestion, 2000);
    }
    renderQuestion();
    optionListEl.addEventListener("click", checkAnswer);

});

console.log(window)






