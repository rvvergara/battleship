const Player = ((obj, method) => ({
  turn(index) {
    obj[method](index);
  }
}));

module.exports = Player;