const playerMixin = (() => ({
  computerMakeChoice(arr) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    return Math.round(Math.random() * (arr.length - 1));
  },
}))();

module.exports = playerMixin;