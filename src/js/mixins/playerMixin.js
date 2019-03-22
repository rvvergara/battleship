const playerMixin = (() => ({
  generateRandomNumberFromArray(arr, player) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
    let index = Math.round(Math.random() * (arr.length - 1));
    while (player.shotsRecord.shotsMade.includes(index)) {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  },

  choiceSanitizer(player, opponentBoard, choice, randomGeneratorFn) {
    const choices = [];
    // For as long as the choice does not correspond to an * then keep making a choice
    while (opponentBoard.grid[choice] !== '*') {
      choices.push(choice);
      choice = randomGeneratorFn(opponentBoard.grid, player);
      player.turn(choice);
    }
    choices.push(choice);
    // If the function goes inside the while loop then choices.length > 0
    return choices;
  },

  // computerMakeChoice(player, ownBoard, opponentBoard, index)
  computerMakeChoice(options, randomGeneratorFn, sanitizingFn) {
    let choices = [];
    const {
      player,
      ownBoard,
      opponentBoard,
      index,
    } = options;

    if (ownBoard.allShipsSunk('isSunk') === false && ownBoard.grid[index] === '*') {
      const choice = randomGeneratorFn(opponentBoard.grid, player);

      player.turn(choice);

      player.shotsRecord.shotsMade.push(choice);
      // console.log(player.shotsRecord.shotsMade);
      choices = choices.concat(sanitizingFn(player, opponentBoard, choice, randomGeneratorFn));
    }
    return choices;
  },
}))();

module.exports = playerMixin;