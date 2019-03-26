import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
import '../img/ship_sunk.svg';

import {
  createGameDisplay,
  generateShips,
  resetGameDisplay,
  startAddEvent,
} from './utils/gameDisplay';

import mainGame from './mainGame';

import defaultPositions from './utils/defaultPositions';

let game = mainGame(defaultPositions);
const container = document.querySelector(".container");
const mainRow = document.querySelector(".main-row");
const resetBtn = document.querySelector(".reset");
const startBtn = document.querySelector(".start");

const styleObj = {
  brd: "3px solid #c23616",
  opacity: "0.7",
};


createGameDisplay(game, container, mainRow);

generateShips(game.battleShipObjs.humanBoard, styleObj);

resetBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startBtn.classList.remove("invisible");
  game = mainGame(defaultPositions);
  resetGameDisplay(game, container, mainRow, styleObj);
  console.log("Reset done!");
});



startBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startAddEvent(e.target);
});