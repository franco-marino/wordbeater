//Globals var
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

//default is easy
let currentLevel = levels.easy;

let time;
let score = 0;
let isPlaying;
let stopped;
let cd;
let gamesCounter = 0;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const startGameBtn = document.querySelector("#startGameBtn");
const stopGameBtn = document.querySelector("#stopGameBtn");
const chooseLevel = document.querySelector("#chooseLevel");
const bestScoreModal = document.querySelector("#bestScoreModal");
const bestscore = document.querySelector("#bestScore");
const bestscoreEm = document.querySelector("#bestscoreEm");
const bestScoreModalBody = document.querySelector("#bestScoreModalBody");
const yourScoresModal = document.querySelector("#yourScoresModal");
const yourScoresTbody = document.querySelector("#yourScoresTbody");
const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition"
];

localStorage.setItem("bestScore", 0);
chooseLevel.addEventListener("change", changeLevel);
startGameBtn.addEventListener("click", init);
stopGameBtn.addEventListener("click", stopGame);

//Initialize Game
function changeLevel() {
  //update
  currentLevel = levels[chooseLevel.value];
  seconds.innerHTML = currentLevel;
  time = currentLevel;
}
function init() {
  message.innerHTML = "";
  time = currentLevel;
  stopped = false;
  //hide start Btn
  startGameBtn.classList.add("d-none");
  //show stop btn
  stopGameBtn.classList.remove("d-none");
  //disable choose level
  chooseLevel.disabled = true;
  //initialize seconds
  seconds.innerHTML = currentLevel;
  showWord(words);
  //Start matching on word input
  wordInput.addEventListener("input", startMatch);
  //Countdwon
  cd = setInterval(countDown, 1000);
  //Check game status
  setInterval(checkStatus, 50);
}

function startMatch() {
  if (!stopped) {
    if (matchWords()) {
      isPlaying = true;
      time = currentLevel + 1;
      showWord(words);
      wordInput.value = "";
      score++;
    }
    if (score === -1) scoreDisplay.innerHTML = 0;
    else scoreDisplay.innerHTML = score;
  }
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.textContent = "Correct";
    message.style.color = "green";
    return true;
  } else {
    return false;
  }
}

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

function countDown() {
  if (!stopped) {
    if (time > 0) {
      //Decrement
      time--;
    } else if (time === 0) {
      //increment game Counter
      gamesCounter++;
      //Register score in table
      addNewScore(score);
      //Register score in local storage if is the best
      if (score > localStorage.getItem("bestScore")) {
        newBestScore();
      }
      $(stopGameBtn).trigger("click");
      message.innerHTML = "";
      // Game is over
      isPlaying = false;
    }
    //Show time
    timeDisplay.innerHTML = time;
  }
}

function checkStatus() {
  if (!stopped) {
    if (!isPlaying && time === 0) {
      message.innerHTML = "Game Over";
      message.style.color = "red";
      score = -1;
    }
  }
}

function stopGame() {
  //hide stop btn
  stopGameBtn.classList.add("d-none");
  //show start btn
  startGameBtn.classList.remove("d-none");
  //enable choose level
  chooseLevel.disabled = false;
  //stopping all
  stopped = true;
  //increment game Counter
  gamesCounter++;
  //Register score in table
  addNewScore(score);
  //Register score in local storage if is the best
  if (score > localStorage.getItem("bestScore")) {
    newBestScore();
  }
  //reset score
  score = 0;
  scoreDisplay.innerHTML = 0;
  //reset time
  clearInterval(cd);
}

function newBestScore() {
  //set new best score
  localStorage.setItem("bestScore", score);
  //show message
  $(bestScoreModal).modal("toggle");
  bestscoreEm.innerHTML = score;
  bestscore.innerHTML = score;
}

function addNewScore(score) {
  //first col
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let content = document.createTextNode(gamesCounter);
  td.appendChild(content);
  tr.appendChild(td);
  //second col
  td = document.createElement("td");
  content = document.createTextNode(score);
  td.appendChild(content);
  tr.appendChild(td);
  yourScoresTbody.prepend(tr);
}
