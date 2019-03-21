import mainGame from './mainGame';
import {
  humanBoardGrid,
  computerBoardGrid,
  container,
  mainrow,
  createGameDisplay,
  guardBox,
  generateShips,
} from './dom/domUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/main.css';

createGameDisplay();
guardBox(computerBoardGrid);
generateShips();