import mainGame from '../mainGame';

const {
  humanBoard,
  computerBoard,
  human,
  computer,
} = mainGame().battleShipObjs;

const container = document.querySelector('.container');

const attackCallBack = (target) => {
  // Call gameTurn method
  const index = Number(target.id.substr(2));
  const turns = mainGame().gameTurn(index, human, computer, humanBoard, computerBoard);
  /*----------------------------------------*/
  // change the target's inner html into X
  if (computerBoard.grid[index] !== "*") {
    target.innerText = "X";
  } else {
    target.innerText = computerBoard.grid[index];
  }
  /* -----------------------------------*/
  // update the display in the human board based on the computer's turn
  if (turns !== []) {
    turns.forEach((turn) => {
      const humanSquare = document.getElementById(`h-${turn}`);
      document.querySelector('.guard-box').classList.remove('invisible');
      setTimeout(() => changeText(humanSquare, humanBoard, turn), 2000);

    });
  }
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


const createRow = (num, rowNum, boardName) => {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  for (let i = 0; i < num; i++) {
    const box = document.createElement('div');
    box.setAttribute('class', 'col box');
    box.setAttribute('id', `${boardName}-${((rowNum * 10) + i)}`);
    if (boardName === 'c') {
      box.addEventListener('click', (e) => {
        e.stopPropagation();
        attackCallBack(e.target);
      }, {
        once: true,
      });
    }
    row.appendChild(box);
  }
  return row;
};

const humanBoardGrid = createGrid(10, 'h');
const computerBoardGrid = createGrid(10, 'c');


const guardBox = (parent) => {
  const bigBox = document.createElement('div');
  bigBox.setAttribute('class', 'bg-secondary position-absolute guard-box invisible');
  parent.appendChild(bigBox);
}

const guardBoxLayer = guardBox(computerBoardGrid);

export {
  createGrid,
  humanBoardGrid,
  computerBoardGrid,
  container,
};