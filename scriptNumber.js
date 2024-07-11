"use strict";

//Selecting classes
const btnAgain = document.querySelector(".again");
const btnCheck = document.querySelector(".check");
const displayMessage = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".highscore");
const inputGuess = document.querySelector(".guess");
const centralQuestionMark = document.querySelector(".number");
const bodyHtml = document.querySelector("body");
//variable responsible for generating the secret number in each game.
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let highScore = 0;
let score = 20;
//function responsible for setting the right initial conditions for the game.
const initialConditions = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  scoreEl.textContent = score;
  displayMessage.textContent = `Start guessing. . .`;
  bodyHtml.style.backgroundColor = "#222";
  centralQuestionMark.textContent = `?`;
  inputGuess.value = " ";
  centralQuestionMark.style.width = "15rem";
};

//check button
btnCheck.addEventListener("click", function () {
  //whenever the user types an input the value will be stored as a number in this variable
  let guess = Number(inputGuess.value);

  //verify if there is a guess
  if (!guess) {
    displayMessage.textContent = "Make a guess!";
    //verify if the guess is correct, if it is : update highscore if needed and show winner screen
  } else if (guess === secretNumber) {
    score--;
    scoreEl.textContent = score;
    score > highScore ? (highScore = score) : highScore;
    highScoreEl.textContent = highScore;
    displayMessage.textContent = "You win!";
    bodyHtml.style.backgroundColor = "#60b347";
    centralQuestionMark.textContent = secretNumber;
    centralQuestionMark.style.width = "30rem";
    //if it isnt then tell the user if its high or low, update score.
  } else {
    score--;
    if (score > 0) {
      scoreEl.textContent = score;
      guess > secretNumber
        ? (displayMessage.textContent = `too high!`)
        : (displayMessage.textContent = `too low!`);
    } else {
      scoreEl.textContent = 0;
      displayMessage.textContent = "You lost buddy";
      bodyHtml.style.backgroundColor = "#ff0000";
      centralQuestionMark = secretNumber;
    }
  }
});

//again button
btnAgain.addEventListener("click", initialConditions);

//modal window
const btnShow = document.querySelector(".show-modal");
const btnClose = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnShow.addEventListener("click", openModal);
btnClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
