"use strict";

//Seclecting elements
const main = document.querySelector("main");
const section = document.querySelector("section");
const cpuImageElement = document.getElementById("cpuElement");
const userPickedEl = document.querySelector(".user-picked");
const cpuPickedEl = document.querySelector(".cpu-picked");
const userScoreEl = document.querySelector(".user-score");
const cpuScoreEl = document.querySelector(".cpu-score");
const roundEl = document.querySelector(".round");
const displayTextEl = document.querySelector(".display-winner");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const infoP = document.querySelector(".infoP");
const newButton = document.querySelector("button");
const h3 = document.querySelector("h3");
let allImageElements = document.querySelectorAll("img");

//Starting conditions and data
let userScore, cpuScore, round, playing;

//Initial conditions
function init() {
  userScore = 0;
  cpuScore = 0;
  round = 1;
  playing = true;

  userScoreEl.textContent = 0;
  cpuScoreEl.textContent = 0;
  roundEl.textContent = 1;
  cpuPickedEl.textContent = "";
  userPickedEl.textContent = "";
  h1.textContent = "Rock, paper and scissors!";
  displayTextEl.textContent = "";
  cpuImageElement.classList.add("hidden");
  h2.classList.remove("hidden");
  infoP.classList.remove("hidden");
  cpuPickedEl.classList.remove("hidden");
  displayTextEl.classList.remove("hidden");
  userPickedEl.classList.remove("hidden");
  main.classList.remove("lost-game");
  main.classList.remove("won-game");
  roundEl.classList.remove("hidden");
  h3.classList.remove("hidden");
}

//End conditions
function showEndOfGameView() {
  h2.classList.add("hidden");
  infoP.classList.add("hidden");
  userPickedEl.classList.add("hidden");
  cpuPickedEl.classList.add("hidden");
  displayTextEl.classList.add("hidden");
  roundEl.classList.add("hidden");
  h3.classList.add("hidden");
}

//Rock paper scissors object array
const choices = [
  { name: "rock", imgSrc: "./images/rock.png" },
  { name: "paper", imgSrc: "./images/paper.png" },
  { name: "scissor", imgSrc: "./images/scissor.png" },
];

//Define functions
function randomChoice(arr) {
  return choices[Math.floor(Math.random() * choices.length)].name;
}

function displayWinner(message, element) {
  element.textContent = message;
}

function updateCpuScore() {
  cpuScoreEl.textContent = ++cpuScore;
}

function updateUserScore() {
  userScoreEl.textContent = ++userScore;
}

//initialize game
init();

if (playing) {
  //Create img-elements
  choices.forEach((element) => {
    const imageElement = document.createElement("img");
    imageElement.src = element.imgSrc;
    imageElement.setAttribute("name", element.name);
    section.append(imageElement);

    // Click-eventlistener
    imageElement.addEventListener("click", (event) => {
      h2.classList.add("hidden");
      infoP.classList.add("hidden");

      //Cpu choice
      const cpuChoice = randomChoice(choices);
      cpuImageElement.classList.remove("hidden");
      cpuPickedEl.textContent = `Computer picked ${cpuChoice}`;
      cpuImageElement.src = `./images/${cpuChoice}.png`;

      //User choice
      const userChoice = imageElement.getAttribute("name");
      userPickedEl.textContent = `You picked ${userChoice}`;

      // Who wins the round?
      if (userChoice === cpuChoice) {
        displayWinner(`It's a draw! 😒`, displayTextEl);
      } else if (userChoice === "rock") {
        if (cpuChoice === "paper") {
          displayWinner("Oh no! You loose this round🤪", displayTextEl);
          updateCpuScore();
        } else {
          displayWinner("You win this round! 🥳", displayTextEl);
          updateUserScore();
        }
      } else if (userChoice === "paper") {
        if (cpuChoice === "scissor") {
          displayWinner("Oh no! You loose this round🤪", displayTextEl);
          updateCpuScore();
        } else {
          displayWinner("You win this round! 🥳", displayTextEl);
          updateUserScore();
        }
      } else if (userChoice === "scissor") {
        if (cpuChoice === "rock") {
          displayWinner("Oh no! You loose this round🤪", displayTextEl);
          updateCpuScore();
        } else {
          displayWinner("You win this round! 🥳", displayTextEl);
          updateUserScore();
        }
      }

      // Rounds played
      roundEl.textContent = ++round;

      // End game after number of rounds
      if (round > 5) {
        playing = false;

        allImageElements = document.querySelectorAll("img");

        for (let i = 0; i < allImageElements.length; i++) {
          allImageElements[i].classList.add("hidden");
        }

        // Determine who wins the game
        if (cpuScore > userScore) {
          displayWinner("Oh no! You lost the game 😫", h1);
          main.classList.add("lost-game");
        } else if (userScore > cpuScore) {
          displayWinner("You won the game! 🎉", h1);
          main.classList.add("won-game");
        } else {
          displayWinner(`It's a draw! 😒`, h1);
        }
        showEndOfGameView();
      }
    });
  });
}

// Start new game
newButton.addEventListener("click", (event) => {
  for (let i = 0; i < allImageElements.length; i++) {
    allImageElements[i].classList.remove("hidden");
  }

  init();
});
