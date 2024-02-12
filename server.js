let timerObj;
function startTimer(display) {
  let timer = duration;
  let minutes;
  let seconds;
  timerObj = setInterval(function () {
    timer = duration
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    duration--
    if (duration <= 0) {
      endQuiz()
      // timer = duration;

    }
  }, 1000);


}



var mainContainer = document.getElementById("main-container");
var btnEl = document.getElementById("btn");
var optionsContainer = document.getElementById("options");
var questEl = document.getElementById("question");
var questionsContainer = document.querySelector(".questions-container");
var timerEl = document.getElementById("timer")
var currIndex = 0;
var duration = 60;
var score = 0;
var end = document.getElementById("end")
var input = document.getElementById("score")
var button = document.getElementById("endbtn")
var scoreDisplay = document.getElementById("score-display")
end.style.display = "none"


var questions = [
  {
    question: "What is JavaScript?",
    options: ["HTML", "CSS", "Program Lang", "jQuery"],
    answer: "Program Lang"
  },
  {
    question: "What is HTML?",
    options: ["HTML", "CSS", "Program Lang", "HyperTech ML"],
    answer: "HyperTech ML"
  },
  {
    question: "What is CSS?",
    options: ["HTML", "Cascade", "Program Lang", "jQuery"],
    answer: "Cascade"
  }
]

btnEl.addEventListener("click", function () {
  mainContainer.style.display = "none";
  questionsContainer.style.display = "block";
  createOptionButton()
  startTimer(timer)
  dipslayQuestion(); // Start button
})
function createOptionButton() {
  for (let i = 0; i < 4; i++) {
    var btn = document.createElement("button");
    btn.setAttribute("class", "choices-btn");

    btn.onclick = displayOptions;
    optionsContainer.appendChild(btn);
  }
}

function dipslayQuestion() {
  questEl.textContent = questions[currIndex].question;
  var choicesEl = document.querySelectorAll(".choices-btn")
  for (let i = 0; i < choicesEl.length; i++) {
    choicesEl[i].textContent = questions[currIndex].options[i]
  }
}

function displayOptions(event) {
  console.log(event.target.innerHTML);
  var userEntry = event.target.textContent
  if (userEntry == questions[currIndex].answer) {
    score += 10
  } else {
    duration -= 5
  }
  if (currIndex < questions.length - 1) {
    currIndex++;
    dipslayQuestion()
  } else {
    endQuiz()
  }
}


function endQuiz() {
  questionsContainer.style.display = "none";
  end.style.display = "block"
  scoreDisplay.textContent ="Your final score: "+( score + duration)
  clearInterval(timerObj)
}

button.addEventListener("click",function(){
  var previousScore = JSON.parse(localStorage.getItem("codeQuiz")) || []
  previousScore.push({
    user: input.value,
    score: (score + duration)
  })
  localStorage.setItem("codeQuiz", JSON.stringify(previousScore))
})

