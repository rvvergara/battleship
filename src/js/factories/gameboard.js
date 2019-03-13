const GameBoard = ((ships) => ({
  grid: new Array(100),
  ships: ships,
  setShipPosition(ship, index) {
    for (let i = index; i < index + ship.length; i++) {
      ship.position.push(i);
      this.grid[i] = i;
    }
  }
}));

module.exports = GameBoard;