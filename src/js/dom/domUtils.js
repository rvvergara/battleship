import mainGame from '../mainGame';

const {
  humanBoard,
  computerBoard,
  human,
  computer,
} = mainGame().battleShipObjs;

const attackCallBack = (id) => {
  mainGame().gameTurn(id, human, computer, humanBoard, computerBoard);
}

const createGrid = (num, boardName) => {
  const grid = document.createElement('div');
  grid.setAttribute('class', 'col-5 mx-3 mt-5');

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
    box.setAttribute('id', `${boardName}-${(rowNum + String(i))}`);
    box.addEventListener('click', e => attackCallBack(e.target.id));
    row.appendChild(box);
  }
  return row;
};

export default createGrid;