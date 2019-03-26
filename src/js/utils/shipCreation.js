import {
  getShipOrientation,
  shipStyle,
} from './utils';

import {
  rotateBox,
  dragStart,
  drag,
} from './callbacks'

const createShipBox = (shipTitle, board, styleObj) => {
  const ship = board.ships[shipTitle];
  const shipBox = document.createElement("div");
  shipBox.setAttribute("id", shipTitle);
  shipBox.setAttribute("draggable", "true");
  shipBox.style = shipStyle(ship.length, styleObj);
  shipBox.addEventListener("click", (e) => {
    e.stopPropagation();
    rotateBox(e.target, board, shipTitle, styleObj);
  });
  shipBox.addEventListener("dragstart", e => dragStart(e));
  shipBox.addEventListener("drag", e => drag(e));
  shipBox.addEventListener("dragend", e => {
    e.target.setAttribute('class', 'block');
  });
  return shipBox;
};

const generateShips = (humanBoard, styleObj) => {
  Object.keys(humanBoard.ships).forEach(shipName => {
    const ship = humanBoard.ships[shipName];

    const shipOrientation = getShipOrientation(ship);

    const styleObjwithOrientation = Object.assign(styleObj, {
      orientation: shipOrientation,
    });
    const shipBox = createShipBox(shipName, humanBoard, styleObjwithOrientation);
    document.getElementById(`h-${ship.position[0]}`).appendChild(shipBox);
  });
};

export default generateShips;