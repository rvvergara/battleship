// const mainGame = require('./mainGame');
import mainGame from './mainGame';
import createGrid from './dom/domUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';
const {
  humanBoard,
  computerBoard,
  human,
  computer,
} = mainGame().battleShipObjs;

mainGame().gameTurn(1, human, computer, humanBoard, computerBoard);
const humanBoardGrid = createGrid();
const computerBoardGrid = createGrid();

const container = document.querySelector('.container-fluid');

const mainRow = document.createElement('div');
mainRow.setAttribute('class', 'row');
mainRow.appendChild(humanBoardGrid);
mainRow.appendChild(computerBoardGrid);

container.appendChild(mainRow);