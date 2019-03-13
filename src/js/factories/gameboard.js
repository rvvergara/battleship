const GameBoard = (ships => ({
  grid: new Array(100),
  ships,
  setShipPosition(ship, index, orientation) {
    const limit = orientation === 'horizontal' ? index + ship.length : index + 10 * (ship.length);
    for (let i = index; i < limit;) {
      if (this.grid[i] === undefined) {
        ship.position.push(i);
        this.grid[i] = i;
        orientation === 'horizontal' ? i += 1 : i += 10;
      } else {
        this.grid[i - 1] = undefined;
        ship.position.pop();
        return;
      }
    };
  },
  receiveAttack(index) {
    // Determine if the index in grid is occupied
    if (this.grid[index] !== undefined) {
      // If yes then determine the ship that occupies it
      Object.keys(ships).forEach((key) => {
        if (ships[key].position.includes(index)) ships[key].hit();
      });
    } else {
      // Else update the grid to reflect a missed shot
      this.grid[index] = "*";
    }
  },
  allShipsSunk() {
    return Object.keys(this.ships).every((key) => this.ships[key].isSunk());
  },
}));

module.exports = GameBoard;