const playerMixin = (() => ({
  computerMakeChoice(arr) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    let index = Math.round(Math.random() * (arr.length - 1));
    while (arr[index] === "*" || arr[index] === "X") {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  }
}))();

module.exports = playerMixin;
