const changeDisplayOfHitSquare = (square, board, index) => {
  if (board.grid[index] === "X") {
    square.style = "background-color: red";
  } else {
    square.insertAdjacentText("afterbegin", board.grid[index]);
  }
};

const updateSquareDisplay = (board, turnsArr) => {
  turnsArr.forEach(turn => {
    const humanSquare = document.getElementById(`h-${turn}`);
    document.querySelector(".guard-box").classList.remove("invisible");
    setTimeout(() => {
      changeDisplayOfHitSquare(humanSquare, board, turn);
      document.querySelector(".guard-box").classList.add("invisible");
    }, 2000);
  });
};

const createEndGameDiv = (checkWinFn, computerBoard, humanBoard, parent) => {
  let statusMsg;
  if (checkWinFn(computerBoard)) statusMsg = "You win!";
  else if (checkWinFn(humanBoard)) statusMsg = "Computer wins!";

  const endGameDiv = document.createElement("div");
  endGameDiv.setAttribute("class", "position-absolute end-game");
  const msg = document.createElement("p");
  msg.setAttribute("class", "position-absolute  end-game-msg");
  msg.innerText = statusMsg;
  parent.appendChild(msg);
  parent.appendChild(endGameDiv);
};

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
};

const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

const drop = (ev, humanBoard) => {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const id = Number(ev.target.id.substr(2));
  if (!isNaN(id)) {
    const successfulShipRepositioning = humanBoard.setShipPosition(
      humanBoard.ships[data],
      id,
      "vertical"
    );
    if (successfulShipRepositioning) ev.target.appendChild(document.getElementById(data));
  }
};

const allowDrop = (ev) => {
  ev.preventDefault();
};

const rotateBox = (board, ship) => {
  if (ship.position.length > 1) {
    if (ship.position[1] - ship.position[0] === 10) {
      // console.log("Ship position before rotate ", ship.position);

      // console.log("Ship position after rotate ", ship.position);
    } else {
      console.log("Horizontal")
    }
  };

}

const addBoxFunctionalities = (boardName, box, gameObj, parent) => {
  if (boardName === "h") {
    box.addEventListener("drop", e => drop(e, gameObj.battleShipObjs.humanBoard));
    box.addEventListener("dragover", e => allowDrop(e));
    box.addEventListener("click", (e) => {
      rotateBox(gameObj.battleShipObjs.humanBoard, gameObj.battleShipObjs.humanBoard.ships[e.target.id]);
    });
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

const createSquare = (i, rowNum, boardName, gameObj, parent) => {
  const box = document.createElement("div");
  const className = boardName === 'c' ? "col box box-c" : "col box";
  box.setAttribute("class", className);
  box.setAttribute("id", `${boardName}-${rowNum * 10 + i}`);
  addBoxFunctionalities(boardName, box, gameObj, parent);
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

const guardBox = (parent) => {
  const bigBox = document.createElement("div");
  bigBox.setAttribute(
    "class",
    "bg-secondary position-absolute guard-box invisible",
  );
  parent.appendChild(bigBox);
};

const createGameDisplay = (gameObj, parent, mainRow) => {
  const humanBoardGrid = createGrid(10, "h", gameObj, parent);
  const computerBoardGrid = createGrid(10, "c", gameObj, parent);
  mainRow.appendChild(humanBoardGrid);
  mainRow.appendChild(computerBoardGrid);
  guardBox(computerBoardGrid);
};

const shipStyle = (shipLength, bgColor, opacityLevel, orientation) => {
  const mainDimension = orientation === "horizontal" ? 'width' : 'height';
  const minorDimension = orientation === "horizontal" ? "height" : "width";
  return `${minorDimension}: 100%; ${mainDimension}: ${shipLength * 100 + 15}%; position: absolute; top: 0; left: 0; background: ${bgColor}; opacity: ${opacityLevel}; z-index: 5000`;
};

const createShipBox = (shipTitle, shipLength, bg, opacity, orientation) => {
  const shipBox = document.createElement("div");
  shipBox.setAttribute("id", shipTitle);
  shipBox.setAttribute("draggable", "true");
  shipBox.style = shipStyle(shipLength, bg, opacity, orientation);
  shipBox.addEventListener("dragstart", e => drag(e));
  return shipBox;
};

const generateShips = (humanBoard, styleObj) => {
  Object.keys(humanBoard.ships).forEach(key => {
    const ship = humanBoard.ships[key]
    const shipBox = createShipBox(key, ship.length, styleObj.bg, styleObj.opacity, styleObj.orientation);
    document.getElementById(`h-${ship.position[0]}`).appendChild(shipBox);
  });
};

const clearEndGameView = (parent) => {
  const statusMsgPTag = document.querySelector("p");
  const endGameDiv = document.querySelector(".end-game");
  if (statusMsgPTag && endGameDiv) {
    parent.removeChild(statusMsgPTag);
    parent.removeChild(endGameDiv);
  }
};

const resetGameDisplay = (gameObj, parent, mainRow, styleObj) => {
  clearEndGameView(parent);
  mainRow.innerHTML = "";
  createGameDisplay(gameObj, parent, mainRow);
  generateShips(gameObj.battleShipObjs.humanBoard, styleObj);
};


export {
  createGameDisplay,
  generateShips,
  resetGameDisplay,
};