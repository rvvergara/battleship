import {
  attackCallBack,
  drop,
  allowDrop,
} from './callbacks';

import {
  clearEndGameView,
} from './utils';

import generateShips from './shipCreation';

const addBoxFunctionalities = (board, box, gameObj, parent) => {
  if (board === gameObj.battleShipObjs.humanBoard) {
    box.addEventListener("drop", e => drop(e, gameObj.battleShipObjs.humanBoard));
    box.addEventListener("dragover", e => allowDrop(e));
  } else {
    box.addEventListener(
      "click",
      e => {
        e.stopPropagation();
        attackCallBack(e.target, gameObj, parent);
      }, {
        once: true,
      },
    );
  }
};

const createSquare = (i, rowNum, board, gameObj, parent) => {
  const box = document.createElement("div");
  const className = board === gameObj.battleShipObjs.computerBoard ? "col box box-c" : "col box";
  const boxId = board === gameObj.battleShipObjs.humanBoard ? `h` : `c`;
  box.setAttribute("class", className);
  box.setAttribute("id", `${boxId}-${rowNum * 10 + i}`);
  addBoxFunctionalities(board, box, gameObj, parent);
  return box;
};

const createRow = (num, rowNum, boardName, gameObj, parent) => {
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  for (let i = 0; i < num; i += 1) {
    const square = createSquare(i, rowNum, boardName, gameObj, parent);
    row.appendChild(square);
  }
  return row;
};

const createGrid = (num, boardName, gameObj, parent) => {
  const grid = document.createElement("div");
  grid.setAttribute("class", `col-5 mx-3 mt-5`);
  for (let i = 0; i < num; i += 1) {
    grid.appendChild(createRow(num, i, boardName, gameObj, parent));
  }
  return grid;
};

const guardBox = (parent, visibility, boardLayerName) => {
  const bigBox = document.createElement("div");
  bigBox.setAttribute("id", boardLayerName);
  bigBox.setAttribute(
    "class",
    `bg-secondary position-absolute guard-box ${visibility}`,
  );
  parent.appendChild(bigBox);
};

const createGameDisplay = (gameObj, parent, mainRow) => {
  const humanBoardGrid = createGrid(10, gameObj.battleShipObjs.humanBoard, gameObj, parent);
  const computerBoardGrid = createGrid(10, gameObj.battleShipObjs.computerBoard, gameObj, parent);
  mainRow.appendChild(humanBoardGrid);
  mainRow.appendChild(computerBoardGrid);
  guardBox(humanBoardGrid, "invisible", "humanGuardLayer");
  guardBox(computerBoardGrid, "block", "computerGuardLayer");
};

const resetGameDisplay = (gameObj, parent, mainRow, styleObj) => {
  clearEndGameView(parent);
  mainRow.innerHTML = "";
  createGameDisplay(gameObj, parent, mainRow);
  generateShips(gameObj.battleShipObjs.humanBoard, styleObj);
};

const startAddEvent = (target) => {
  target.classList.add("invisible");
  document.querySelector("#humanGuardLayer").classList.toggle("invisible");
  document.querySelector("#computerGuardLayer").classList.toggle("invisible");
};

export {
  createGameDisplay,
  generateShips,
  resetGameDisplay,
  startAddEvent,
};