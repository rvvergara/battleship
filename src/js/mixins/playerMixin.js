const playerMixin = (() => ({
  generateRandomNumberFromArray(arr) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    let index = Math.round(Math.random() * (arr.length - 1));
    while (arr[index] === "*" || arr[index] === "X") {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  },

  choiceSanitizer(player, opponentBoard, choice, randomGeneratorFn) {
    const choices = [];
    // For as long as the choice does not correspond to an * then keep making a choice
    while (opponentBoard.grid[choice] !== '*') {
      choices.push(choice);
      choice = randomGeneratorFn(opponentBoard.grid);
      player.turn(choice);
    }
    choices.push(choice);
    // If the function goes inside the while loop then choices.length > 0
    return choices;
  },

  // computerMakeChoice(player, ownBoard, opponentBoard, index)
  computerMakeChoice(options, randomGeneratorFn, sanitizingFn) {
    const choices = [];

    if (options.boardMethod(options.shipMethod) === false && options.ownBoard.grid[options.index] === '*') {

      const choice = randomGeneratorFn(options.opponentBoard.grid);
      options.player.turn(choice);

      choices.concat(sanitizingFn(options.player, options.opponentBoard, choice));
    }
    return choices;
  },
}))();

module.exports = playerMixin;