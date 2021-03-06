import {
  getShipOrientation,
  shipStyle,
  changeDisplayOfHitSquare,
  updateSquareDisplay,
  createEndGameDiv,
  changeDisplayofSunkShip,
} from './utils';

// Event Callbacks
const attackCallBack = (target, gameObj, parent) => {
  const index = Number(target.id.substr(2));
  const {
    humanBoard,
    computerBoard,
    human,
    computer,
  } = gameObj.battleShipObjs;
  const turns = gameObj.gameTurn(
    index,
    human,
    computer,
    humanBoard,
    computerBoard,
  );
  changeDisplayOfHitSquare(target, computerBoard, index);
  if (turns !== []) updateSquareDisplay(humanBoard, turns);
  if (gameObj.endGame(humanBoard, computerBoard)) createEndGameDiv(gameObj.checkWin, computerBoard, humanBoard, parent);

  changeDisplayofSunkShip(gameObj, target);
};

const dragStart = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

const drag = (ev) => {
  ev.target.setAttribute('class', 'invisible');
};

const clearShipPositionsFromGrid = (board, shipName) => {
  board.ships[shipName].position.forEach(id => {
    board.grid[id] = undefined;
  });
};

const drop = (ev, humanBoard) => {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const id = Number(ev.target.id.substr(2));
  const ship = humanBoard.ships[data];
  const orientation = ship.position[1] - ship.position[0] === 1 ? 'horizontal' : 'vertical';
  if (!Number.isNaN(id)) {
    clearShipPositionsFromGrid(humanBoard, data);
    const successfulShipRepositioning = humanBoard.setShipPosition(humanBoard.ships[data], id, orientation);
    if (successfulShipRepositioning) {
      ev.target.appendChild(document.getElementById(data));
    }
  }
};

const allowDrop = (ev) => {
  ev.preventDefault();
};

const rotateShipPosition = (board, shipName) => {
  const ship = board.ships[shipName];
  if (ship.position.length > 1) {
    if (ship.position[1] - ship.position[0] === 10) {
      clearShipPositionsFromGrid(board, shipName);
      board.setShipPosition(ship, ship.position[0], 'horizontal');
    } else {
      clearShipPositionsFromGrid(board, shipName);
      board.setShipPosition(ship, ship.position[0], 'verticle');
    }
  }
};

const rotateBox = (shipBox, board, shipName, styleObj) => {
  rotateShipPosition(board, shipName);
  const ship = board.ships[shipName];
  const shipOrientation = getShipOrientation(ship);
  shipBox.style = shipStyle(ship.length, Object.assign(styleObj, {
    orientation: shipOrientation,
  }));
};

export {
  attackCallBack,
  clearShipPositionsFromGrid,
  drop,
  allowDrop,
  rotateBox,
  dragStart,
  drag,
};