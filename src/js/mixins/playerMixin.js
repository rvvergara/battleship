const playerMixin = (() => ({
  generateRandomNumberFromArray(arr) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    let index = Math.round(Math.random() * (arr.length - 1));
    while (arr[index] === "*" || arr[index] === "X") {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  },
  // computerMakeChoice(player, ownBoard, opponentBoard, index)
  computerMakeChoice(options) {
    const choices = [];

    if (options.boardMethod(options.shipMethod) === false && options.ownBoard.grid[options.index] === '*') {

      const choice = options.player.generateRandomNumberFromArray(options.opponentBoard.grid);
      options.player.turn(choice);

      choices.concat(choiceSanitizer(options.player, options.opponentBoard, options.choice));
    }
    return choices;
  },

}))();

const choiceSanitizer = (player, opponentBoard, choice) => {
  const choices = [];
  while (opponentBoard.grid[choice] !== '*') {
    choices.push(choice);
    choice = player.generateRandomNumberFromArray(opponentBoard.grid);
    player.turn(choice);
  }
  choices.push(choice);
  return choices;
};

module.exports = playerMixin;