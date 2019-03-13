const computerMixin = (() => ({
  makeChoice(arr) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    let index = Math.round(Math.random() * (arr.length - 1));

    while (arr[index] !== undefined) {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  },
}))();

module.exports = computerMixin;