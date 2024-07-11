"use strict";

//selecting classes
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
const current1El = document.getElementById("current--0");
const current2El = document.getElementById("current--1");
const score1El = document.getElementById("score--0");
const score2El = document.getElementById("score--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

//functions
const startingConditions = function () {
  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  diceEl.classList.add("hidden");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player2.classList.remove("player--active");
  player1.classList.add("player--active");
};

const winSituation = function () {
  diceEl.classList.add("hidden");
  btnHold.classList.add("hidden");
  btnShow.classList.add("hidden");
  btnRoll.classList.add("hidden");
};

startingConditions();

//variables
let diceNumber = Math.trunc(Math.random() * 6) + 1;
let current1 = 0;
let current2 = 0;
let score1 = 0;
let score2 = 0;

//roll dice button
btnRoll.addEventListener("click", function () {
  //genarate a value between 1 and 6, show the png acordingly.
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove("hidden");
  diceEl.src = `/img/dice-${diceNumber}.png`;
  //check if its a 1, if it is switch players and zero the current score
  if (diceNumber === 1) {
    //find out wich player is active
    if (player1.classList.contains("player--active")) {
      player1.classList.remove("player--active");
      player2.classList.add("player--active");
      current1 = 0;
      current1El.textContent = current1;
    } else {
      player2.classList.remove("player--active");
      player1.classList.add("player--active");
      current2 = 0;
      current2El.textContent = current2;
    }

    //if not, add the value to the current
  } else {
    //find out wich player is active
    if (player1.classList.contains("player--active")) {
      current1 += diceNumber;
      current1El.textContent = current1;
    } else {
      current2 += diceNumber;
      current2El.textContent = current2;
    }
  }
});

//hold button
btnHold.addEventListener("click", function () {
  //send the points in current to the final score.
  //find out wich player is active
  if (player1.classList.contains("player--active")) {
    score1 += current1;
    score1El.textContent = score1;

    //check if final score >= 100, if yes then he won
    if (score1 >= 100) {
      player1.classList.add("player--winner");
      player1.classList.remove("player--active");
      winSituation();
      //if no, then switch players
    } else {
      player1.classList.remove("player--active");
      player2.classList.add("player--active");
    }
  } else {
    score2 += current2;
    score2El.textContent = score2;
    //check if final score >= 100, if yes then he won
    if (score2 >= 100) {
      player2.classList.add("player--winner");
      player2.classList.remove("player--active");
      winSituation();
      //if no, then switch players
    } else {
      player2.classList.remove("player--active");
      player1.classList.add("player--active");
    }
  }
});

//new game button
btnNew.addEventListener("click", startingConditions);

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
