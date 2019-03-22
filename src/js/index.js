import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

import {
  createGameDisplay,
  generateShips,
  resetGameDisplay,
} from './dom/domUtils';

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

const styleObj = {
  bg: "blue",
  opacity: "0.7",
};


createGameDisplay(game, container, mainRow, defaultPosition);

generateShips(game.battleShipObjs.humanBoard, styleObj);

document.getElementsByTagName("button")[0].addEventListener('click', () => {
  game = mainGame(defaultPosition);
  resetGameDisplay(game, container, mainRow, styleObj);
});