const Player = ((board, boardMethod, shipMethod) => ({
  turn(index) {
    board[boardMethod](index, shipMethod);
  },
}));

module.exports = Player;