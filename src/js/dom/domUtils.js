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
  if (gameObj.checkWin(computerBoard) || gameObj.checkWin(humanBoard)) createEndGameDiv(gameObj.checkWin, computerBoard, humanBoard, parent);
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

const addBoxFunctionalities = (boardName, box, gameObj, parent) => {
  if (boardName === "h") {
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

const createSquare = (i, rowNum, boardName, gameObj, parent) => {
  const box = document.createElement("div");
  box.setAttribute("class", "col box");
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

const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
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

const createShipBox = (shipTitle, shipLength) => {
  const shipBox = document.createElement("div");
  shipBox.setAttribute("id", shipTitle);
  shipBox.setAttribute("draggable", "true");
  shipBox.style = `width: 100%; height: ${shipLength * 100
    + 15}%; position: absolute; top: 0; left: 0; background: blue; opacity: 0.7; z-index: 5000`;
  shipBox.addEventListener("dragstart", e => drag(e));
  return shipBox;
};

const generateShips = (humanBoard) => {
  Object.keys(humanBoard.ships).forEach(key => {
    const ship = humanBoard.ships[key]
    const shipBox = createShipBox(key, ship.length);
    document.getElementById(`h-${ship.position[0]}`).appendChild(shipBox);
  });
};


document.getElementsByTagName("button")[0].addEventListener("click", () => {
  // 1. Create a new game
  game = mainGame();
  // 2. Generate new pieces for the game
  ({
    humanBoard,
    computerBoard,
    human,
    computer,
  } = game.battleShipObjs);
  mainRow.innerHTML = "";
  createGameDisplay();
  guardBox(computerBoardGrid);
  generateShips();

  // Remove endGame div
  if (document.querySelector("p")) {
    document
      .querySelector(".container")
      .removeChild(document.querySelector("p"));
  }
  if (document.querySelector(".end-game")) {
    document
      .querySelector(".container")
      .removeChild(document.querySelector(".end-game"));
  }
});

export {
  createGameDisplay,
  generateShips,
};