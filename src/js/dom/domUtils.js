import mainGame from '../mainGame';

let game = mainGame();

let {
  humanBoard,
  computerBoard,
  human,
  computer,
} = game.battleShipObjs;

let container = document.querySelector('.container');

let mainRow = document.querySelector('.main-row');
let humanBoardGrid;
let computerBoardGrid;

let shipContainer = document.querySelector('.ship-container');


const attackCallBack = (target) => {
  // Call gameTurn method
  const index = Number(target.id.substr(2));
  const turns = game.gameTurn(index, human, computer, humanBoard, computerBoard);

  /*----------------------------------------*/
  // change the target's inner html into X
  if (computerBoard.grid[index] !== "*") {
    target.innerText = "X";
  } else {
    target.innerText = computerBoard.grid[index];
  }
  if (game.checkWin(computerBoard)) createEndGameDiv("Human win!");

  /* -----------------------------------*/
  // update the display in the human board based on the computer's turn
  if (turns !== []) {

    turns.forEach((turn) => {
      const humanSquare = document.getElementById(`h-${turn}`);
      document.querySelector('.guard-box').classList.remove('invisible');
      setTimeout(() => changeText(humanSquare, humanBoard, turn), 2000);
    });
  }
  if (game.checkWin(humanBoard)) createEndGameDiv("Computer win!");
};

const changeText = (humanSquare, humanBoard, turn) => {
  humanSquare.innerText = humanBoard.grid[turn];
  document.querySelector('.guard-box').classList.add('invisible');
};

const createGrid = (num, boardName) => {
  const grid = document.createElement('div');
  grid.setAttribute('class', `col-5 mx-3 mt-5`);

  for (let i = 0; i < num; i++) {
    grid.appendChild(createRow(num, i, boardName));
  }

  return grid;
};

//===================================
// Dragging related fns
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  if (!isNaN(Number(ev.target.id.substr(2)))) {
    ev.target.appendChild(document.getElementById(data));
  }
}
//===================================


const createRow = (num, rowNum, boardName) => {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  for (let i = 0; i < num; i++) {
    const box = document.createElement('div');
    box.setAttribute('class', 'col box');
    box.addEventListener('drop', e => drop(e));
    box.addEventListener('dragover', e => allowDrop(e));
    box.setAttribute('id', `${boardName}-${((rowNum * 10) + i)}`);
    if (boardName === 'c') {
      box.classList.add('c');
      addBoxListener(box);
    }
    row.appendChild(box);
  }
  return row;
};

const addBoxListener = (box) => {
  box.addEventListener('click', (e) => {
    e.stopPropagation();
    attackCallBack(e.target);
  }, {
    once: true,
  });
};


const createGameEnv = () => {
  mainRow.setAttribute('class', 'row');
  humanBoardGrid = createGrid(10, 'h');
  computerBoardGrid = createGrid(10, 'c');
  mainRow.appendChild(humanBoardGrid);
  mainRow.appendChild(computerBoardGrid);
}

createGameEnv();

const guardBox = (parent) => {
  const bigBox = document.createElement('div');
  bigBox.setAttribute('class', 'bg-secondary position-absolute guard-box invisible');
  parent.appendChild(bigBox);
};

guardBox(computerBoardGrid);

const createEndGameDiv = (statusMsg) => {
  const endGameDiv = document.createElement('div');
  endGameDiv.setAttribute('class', 'position-absolute end-game');
  const msg = document.createElement('p');
  msg.setAttribute('class', 'position-absolute  end-game-msg');
  msg.innerText = statusMsg;
  container.appendChild(msg);
  container.appendChild(endGameDiv);
};

document.getElementsByTagName("button")[0].addEventListener("click", () => {
  //1. Create a new game
  game = mainGame();
  // 2. Generate new pieces for the game
  ({
    humanBoard,
    computerBoard,
    human,
    computer,
  } = game.battleShipObjs);
  mainRow.innerHTML = "";
  createGameEnv();
  guardBox(computerBoardGrid);

  // Remove endGame div
  if (document.querySelector('p')) document.querySelector('.container').removeChild(document.querySelector('p'));
  if (document.querySelector('.end-game')) document.querySelector('.container').removeChild(document.querySelector('.end-game'));
});



const createShipBox = (shipTitle, ship) => {
  const shipBox = document.createElement('div');
  shipBox.setAttribute('id', shipTitle);
  shipBox.setAttribute('draggable', 'true');
  shipBox.style = `width: 100%; height: ${ship.length*100 + 15}%; position: absolute; top: 0; left: 0; background: blue; opacity: 0.7; z-index: 500000`;
  shipBox.addEventListener('dragstart', e => drag(e));
  document.getElementById(`h-${ship.position[0]}`).appendChild(shipBox);
};

function generateShips() {
  Object.keys(humanBoard.ships).forEach(key => {
    createShipBox(key, humanBoard.ships[key]);
  });
}
generateShips();

// function changeShipPositionBG() {
//   humanBoard.grid.forEach((el, index) => {
//     if (el !== undefined) {
//       document.getElementById(`h-${index}`).appendChild(createShipBox());
//     }
//   });

// }


// changeShipPositionBG();



export {
  createGrid,
  humanBoardGrid,
  computerBoardGrid,
  container,
  createGameEnv,
};