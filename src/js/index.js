import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

import {
  createGameDisplay,
  generateShips,
  resetGameDisplay
} from './dom/domUtils';

import mainGame from './mainGame';

let game = mainGame();
const container = document.querySelector(".container");
const mainRow = document.querySelector(".main-row");


const styleObj = {
  bg: "blue",
  opacity: "0.7",
  orientation: "vertical",
};

createGameDisplay(game, container, mainRow);

generateShips(game.battleShipObjs.humanBoard, styleObj);

document.getElementsByTagName("button")[0].addEventListener('click', () => {
  game = mainGame();
  resetGameDisplay(game, container, mainRow, styleObj);
});