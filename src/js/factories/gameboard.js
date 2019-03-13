const GameBoard = ((ships) => ({
  grid: new Array(100),
  ships: ships,
  setShipPosition(ship, index) {
    ship.position = index;
  }
}));

module.exports = GameBoard;