import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

import {
  createGameDisplay,
  generateShips,
  resetGameDisplay,
} from './dom/gameDisplay';

import mainGame from './mainGame';

const defaultPosition = [{
    0: "vertical",
  },
  {
    2: "horizontal",
  },
  {
    4: "vertical",
  },
  {
    30: "horizontal",
  },
];

let game = mainGame(defaultPosition);
const container = document.querySelector(".container");
const mainRow = document.querySelector(".main-row");
const resetBtn = document.querySelector(".reset");
const startBtn = document.querySelector(".start");

const styleObj = {
  bg: "blue",
  opacity: "0.7",
};


createGameDisplay(game, container, mainRow);

generateShips(game.battleShipObjs.humanBoard, styleObj);

resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startBtn.classList.remove("invisible");
  game = mainGame(defaultPosition);
  resetGameDisplay(game, container, mainRow, styleObj);
  console.log("Reset done!");
  
});

const startAddEvent = (target) => {
  target.classList.add("invisible");
  document.querySelector("#humanGuardLayer").classList.toggle("invisible");
  document.querySelector("#computerGuardLayer").classList.toggle("invisible");
};

startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startAddEvent(e.target);
});