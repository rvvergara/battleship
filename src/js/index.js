import mainGame from './mainGame';
import {
  humanBoardGrid,
  computerBoardGrid,
  container,
} from './dom/domUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/main.css';

const {
  humanBoard,
  computerBoard,
  human,
  computer,
} = mainGame().battleShipObjs;


const mainRow = document.createElement('div');
mainRow.setAttribute('class', 'row');
mainRow.appendChild(humanBoardGrid);
mainRow.appendChild(computerBoardGrid);

container.appendChild(mainRow);