"use strict";
// Variables
const enLanguage = document.querySelector(".en");
const brLanguage = document.querySelector(".br");
const overlay = document.querySelector(".overlay");
const gameoverMessage = document.querySelector(".game-over");
const letter = document.querySelectorAll(".letter");
const wordSpace = document.querySelector(".word");
const head = document.querySelector(".head");
const torso = document.querySelector(".torso");
const leftArm = document.querySelector(".left-arm");
const rightArm = document.querySelector(".right-arm");
const leftLeg = document.querySelector(".left-leg");
const rightLeg = document.querySelector(".right-leg");
const face = document.querySelectorAll(".face");
const title = document.querySelector(".title");
const button = document.querySelector("button");
const dictionaryEn = [
  "CAR",
  "HONEY",
  "WHEEL",
  "FLOW",
  "CHAIN",
  "MICROPHONE",
  "CHICKEN",
  "HORSE",
  "WALLET",
  "MUG",
  "SPOON",
  "DOOR",
  "SOFA",
  "COMPUTER",
  "LAMP",
  "TULIP",
];
const dictionaryBr = [
  "CARRO",
  "BAZUCA",
  "CORRENTE",
  "CARTEIRA",
  "JOGO",
  "LANTERNA",
  "QUADRO",
  "COMPUTADOR",
  "PORTA",
  "GALINHA",
  "MICROFONE",
  "COLHER",
  "CANECA",
  "MESA",
  "SAPATO",
  "",
  "",
  "",
  "",
  "",
];

let dictionary = dictionaryEn;

let winMessage = "You won!";
let loseMessage = "You lost";

const body = [
  "head",
  "torso",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
  "face",
];
let selectedWordArray = [];
let ongoingWordArray = [];
let selectedLetter = "a";
let anyMatch = false;
let currentBodyPart = 0;

// Base Functions
enLanguage.addEventListener("click", () => {
  dictionary = dictionaryEn;
  title.innerText = "Guess the Word!";
  button.innerText = "Play  Again!";
  winMessage = "You won!";
  loseMessage = "You lost";
  startNewGame();
});

brLanguage.addEventListener("click", () => {
  dictionary = dictionaryBr;
  title.innerText = "Advinhe a Palavra!";
  button.innerText = "Jogar Novamente!";
  winMessage = "Você venceu!";
  loseMessage = "Tente novamente!";
  startNewGame();
});

const updateHangman = function () {
  switch (body[currentBodyPart]) {
    case "head":
      head.classList.remove("hidden");
      break;
    case "torso":
      torso.classList.remove("hidden");
      break;
    case "left-arm":
      leftArm.classList.remove("hidden");
      break;
    case "right-arm":
      rightArm.classList.remove("hidden");
      break;
    case "left-leg":
      leftLeg.classList.remove("hidden");
      break;
    case "right-leg":
      rightLeg.classList.remove("hidden");
      break;
    case "face":
      face.forEach((element) => {
        element.classList.remove("hidden");
      });
      break;
    default:
      break;
  }
};

const resetHangman = function () {
  currentBodyPart = 0;
  if (!head.classList.contains("hidden")) {
    head.classList.add("hidden");
  }
  if (!torso.classList.contains("hidden")) {
    torso.classList.add("hidden");
  }
  if (!leftArm.classList.contains("hidden")) {
    leftArm.classList.add("hidden");
  }
  if (!rightArm.classList.contains("hidden")) {
    rightArm.classList.add("hidden");
  }
  if (!leftLeg.classList.contains("hidden")) {
    leftLeg.classList.add("hidden");
  }
  if (!rightLeg.classList.contains("hidden")) {
    rightLeg.classList.add("hidden");
  }
  face.forEach((element) => {
    if (!element.classList.contains("hidden")) {
      element.classList.add("hidden");
    }
  });
};

const didPlayerLoose = function () {
  if (currentBodyPart === body.length) {
    gameoverMessage.innerText = loseMessage;
    overlay.classList.remove("hidden");
  } else if (currentBodyPart < body.length && !ongoingWordArray.includes("_")) {
    gameoverMessage.innerText = winMessage;
    overlay.classList.remove("hidden");
  }
};

const letterClickHandler = function (event) {
  selectedLetter = event.target.innerText;
  event.target.classList.add("inactive");
  checkSelectedLetter();
};

const activateLetters = function () {
  for (let i = 0; i < letter.length; i++) {
    letter[i].classList.remove("inactive");
    letter[i].addEventListener("click", letterClickHandler);
  }
};

const deactivateLetters = function () {
  for (let i = 0; i < letter.length; i++) {
    letter[i].addEventListener("click", letterClickHandler);
  }
};

const checkSelectedLetter = function () {
  for (let i = 0; i < selectedWordArray.length; i++) {
    if (selectedWordArray[i] === selectedLetter) {
      ongoingWordArray[i] = selectedWordArray[i];
      anyMatch = true;
    }
  }

  if (!anyMatch) {
    updateHangman();
    currentBodyPart++;
  }

  anyMatch = false;
  didPlayerLoose();
  clearWordSpace();
  populateWordSpaceWithSelectedWord();
};

const resetOngoingWordArray = function () {
  ongoingWordArray = [];
};

const pickNewWord = function () {
  const selectedWordIndex = Math.floor(Math.random() * dictionaryEn.length);
  selectedWordArray = [...dictionary[selectedWordIndex]];
  for (let i = 0; i < selectedWordArray.length; i++) {
    ongoingWordArray.push("_");
  }
};

const clearWordSpace = function () {
  while (wordSpace.firstChild) {
    wordSpace.removeChild(wordSpace.firstChild);
  }
};

const populateWordSpaceWithSelectedWord = function () {
  for (let i = 0; i < ongoingWordArray.length; i++) {
    const div = document.createElement("div");
    div.classList.add("letter-box");
    div.innerText = ongoingWordArray[i];
    wordSpace.appendChild(div);
  }
};

const startNewGame = function () {
  overlay.classList.add("hidden");
  resetHangman();
  activateLetters();
  resetOngoingWordArray();
  pickNewWord();
  clearWordSpace();
  populateWordSpaceWithSelectedWord();
};

document.addEventListener("DOMContentLoaded", startNewGame);

button.addEventListener("click", (event) => {
  startNewGame();
});
