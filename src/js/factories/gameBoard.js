const GameBoard = ships => ({
  grid: new Array(100),
  ships,
  setShipPosition(ship, index, orientation) {
    const limit =
      orientation === "horizontal" ?
      index + ship.length :
      index + 10 * ship.length;
    ship.position = ship.position || [];
    for (let i = index; i < limit;) {
      if (this.grid[i] === undefined) {
        ship.position.push(i);
        this.grid[i] = i;
        orientation === "horizontal" ? (i += 1) : (i += 10);
      } else {
        this.grid[i - 1] = undefined;
        ship.position.pop();
        return;
      }
    }
  },
  receiveAttack(index, method) {
    // Determine if the index in grid is occupied
    if (this.grid[index] !== undefined) {
      // If yes then determine the ship that occupies it
      Object.keys(ships).forEach((key) => {
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
    // return Object.keys(ships).every(key => ships[key][isSunkMethod]());

    const shipSunkArray = Object.keys(ships).map((key) => {
      // console.log(`${pname} ${key} hits: `, ships[key].hits);
      return ships[key][isSunkMethod]();
    });
    // console.log(shipSunkArray);
    return shipSunkArray.every(bool => bool === true);
  }
});

module.exports = GameBoard;