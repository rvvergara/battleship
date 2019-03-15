const createGrid = () => {
  const grid = document.createElement('div');
  grid.setAttribute('class', 'col-5 mx-3 mt-5');

  for (let i = 0; i < 10; i++) {
    grid.appendChild(createRow(10));
  }

  return grid;
}


const createRow = (num) => {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  for (let i = 0; i < num; i++) {
    const box = document.createElement('div');
    box.setAttribute('class', 'col box');
    row.appendChild(box);
  }
  return row;
}

export default createGrid;