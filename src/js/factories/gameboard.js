const GameBoard = ((ships) => ({
  grid: new Array(100),
  ships: ships,
  setShipPosition(ship, index) {
    for (let i = index; i < index + ship.length; i++) {
      if (this.grid[i] === undefined) {
        ship.position.push(i);
        this.grid[i] = i;
      } else {
        return
      }
    }
  }
}));

module.exports = GameBoard;