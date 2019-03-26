const getShipOrientation = (ship) => ship.position.length > 1 ? (ship.position[1] - ship.position[0] === 10 ? 'vertical' : 'horizontal') : 'vertical';

const shipStyle = (shipLength, styleObj) => {
  const mainDimension = styleObj.orientation === "horizontal" ? 'width' : 'height';
  const minorDimension = styleObj.orientation === "horizontal" ? "height" : "width";
  return `${minorDimension}: 100%; ${mainDimension}: ${shipLength * 103.5}%; position: absolute; top: 0; left: 0; border: ${styleObj.brd}; border-radius: 5px; opacity: ${styleObj.opacity}; z-index: 5000`;
};

const changeDisplayOfHitSquare = (square, board, index) => {
  if (board.grid[index] === "X") {
    square.insertAdjacentHTML("afterbegin", `<img src="./img/ship_sunk.svg" alt="ship sunk">`);
  } else {
    square.insertAdjacentText("afterbegin", board.grid[index]);
  }
};

const updateSquareDisplay = (board, turnsArr) => {
  turnsArr.forEach(turn => {
    const humanSquare = document.getElementById(`h-${turn}`);
    document.querySelector("#computerGuardLayer").classList.remove("invisible");
    setTimeout(() => {
      changeDisplayOfHitSquare(humanSquare, board, turn);
      document.querySelector("#computerGuardLayer").classList.add("invisible");
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

const clearEndGameView = (parent) => {
  const statusMsgPTag = document.querySelector("p");
  const endGameDiv = document.querySelector(".end-game");
  if (statusMsgPTag && endGameDiv) {
    parent.removeChild(statusMsgPTag);
    parent.removeChild(endGameDiv);
  }
};

export {
  getShipOrientation,
  shipStyle,
  changeDisplayOfHitSquare,
  updateSquareDisplay,
  createEndGameDiv,
  clearEndGameView,
};