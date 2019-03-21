import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

import {
  createGameDisplay,
  guardBox,
  generateShips,
} from './dom/domUtils';

import mainGame from './mainGame';

const game = mainGame();
const container = document.querySelector(".container");

const computerBoardGrid = createGameDisplay(game, container);

guardBox(computerBoardGrid);
generateShips(game.battleShipObjs.humanBoard);