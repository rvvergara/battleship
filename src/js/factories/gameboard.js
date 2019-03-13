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
}));

module.exports = GameBoard;