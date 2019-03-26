const playerMixin = (() => ({
  intelligentChoiceGenerator(arr, player, randomGeneratorFn) {
    const queue = player.shotsRecord.shotsQueue;
    const choice = queue.length === 0 ? randomGeneratorFn(arr, player) : queue.shift();
    player.shotsRecord.shotsMade.push(choice);
    return choice;
  },
  generateRandomNumberFromArray(arr, player) {
    let index = Math.round(Math.random() * (arr.length - 1));
    while (player.shotsRecord.shotsMade.includes(index)) {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  },

  choiceSanitizer(
    player,
    opponentBoard,
    choice,
    intelligentgeneratorFn,
    randomGeneratorFn,
  ) {
    const choices = [];
    const grid = opponentBoard.grid;
    const shotsMade = player.shotsRecord.shotsMade;
    const shotsQueue = player.shotsRecord.shotsQueue;
    while (grid[choice] === "X") {
      const neighborIndices = [
        choice - 10,
        choice - 1,
        choice + 1,
        choice + 10,
      ];

      neighborIndices.forEach(neighborIndex => {
        if (
          neighborIndex >= 0 &&
          neighborIndex < grid.length &&
          !shotsMade.includes(neighborIndex) &&
          !shotsQueue.includes(neighborIndex)
        ) {
          shotsQueue.push(neighborIndex);
        }
      });
      choices.push(choice);
      choice = intelligentgeneratorFn(
        opponentBoard.grid,
        player,
        randomGeneratorFn,
      );
      player.turn(choice);
    }
    choices.push(choice);
    player.turn(choice);
    return choices;
  },

  
  computerMakeChoice(
    options,
    intelligentgeneratorFn,
    randomGeneratorFn,
    sanitizingFn,
  ) {
    let choices = [];
    const { player, ownBoard, opponentBoard, index } = options;

    if (ownBoard.allShipsSunk("isSunk") === false && ownBoard.grid[index] === "*") {
      const choice = intelligentgeneratorFn(opponentBoard.grid,player,randomGeneratorFn);
      player.turn(choice);
      choices = choices.concat(sanitizingFn(player,opponentBoard,choice,intelligentgeneratorFn, randomGeneratorFn));
    }
    return choices;
  }
}))();

module.exports = playerMixin;
