const playerMixin = (() => ({
  computerMakeChoice(arr) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    return Math.round(Math.random() * (arr.length - 1));
  },
  humanMakeChoice(index) {
    return index;
  },
}))();

module.exports = playerMixin;