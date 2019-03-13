const Player = ((gameBoard) => ({
  turn(index) {
    gameBoard.receiveAttack(index);
  }
}));

module.exports = Player;