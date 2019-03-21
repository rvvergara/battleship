const GameBoard = ships => ({
  grid: new Array(100),
  ships,
  setShipPosition(ship, index, orientation) {
    const limit = orientation === "horizontal" ? index + ship.length : index + 10 * ship.length;

    ship.position = ship.position || [];
    const origShipPosition = [...ship.position];
    ship.position = [];
    const origBoardGrid = [...this.grid];

    for (let i = index, j = 0; i < limit;) {
      if (this.grid[i] === undefined && i < this.grid.length) {
        ship.position.push(i);
        this.grid[i] = i;
        this.grid[origShipPosition[j]] = undefined;
        j += 1;
        const increment = orientation === "horizontal" ? 1 : 10;
        if (i === limit - increment) return true;
        i += increment;
      } else {
        this.grid = origBoardGrid;
        ship.position = origShipPosition;
        return false;
      }
    }
  },
  receiveAttack(index, method) {
    // Determine if the index in grid is occupied
    if (this.grid[index] !== undefined) {
      // If yes then determine the ship that occupies it
      Object.keys(ships).forEach(key => {
        if (ships[key].position.includes(index)) {
          ships[key][method]();
          this.grid[index] = "X";
        }
      });
    } else {
      // Else update the grid to reflect a missed shot
      this.grid[index] = "*";
    }
  },
  allShipsSunk(isSunkMethod) {
    return Object.keys(ships).every(key => ships[key][isSunkMethod]());
  }
});

module.exports = GameBoard;