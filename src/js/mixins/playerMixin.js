const playerMixin = (() => ({
  computerMakeChoice(arr) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    let index = Math.round(Math.random() * (arr.length - 1));

    while (arr[index] !== undefined) {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  },
  humanMakeChoice(arr, index) {
    return index === undefined ? this.computerMakeChoice(arr) : index;
  },
}))();

module.exports = playerMixin;