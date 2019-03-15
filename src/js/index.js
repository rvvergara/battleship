// const mainGame = require('./mainGame');
import mainGame from './mainGame';

const {
  humanBoard,
  computerBoard,
  human,
  computer,
} = mainGame().battleShipObjs;

mainGame().gameTurn(1, human, computer, humanBoard, computerBoard);