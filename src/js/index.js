import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

import {
  computerBoardGrid,
  createGameDisplay,
  guardBox,
  generateShips,
} from './dom/domUtils';

import mainGame from './mainGame';

const game = mainGame();

createGameDisplay(game);
guardBox(computerBoardGrid);
generateShips(game.battleShipObjs.humanBoard);