const playerMixin = (() => ({
  intelligentChoiceGenerator(args) {
    const { arr, player, randomGeneratorFn } = args;
    const queue = player.shotsRecord.shotsQueue;
    const choice = queue.length === 0 ? randomGeneratorFn({ arr, player }) : queue.shift();
    player.shotsRecord.shotsMade.push(choice);
    return choice;
  },
  generateRandomNumberFromArray(args) {
    const { arr, player } = args;
    let index = Math.round(Math.random() * (arr.length - 1));
    while (player.shotsRecord.shotsMade.includes(index)) {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    return index;
  },

  choiceSanitizer(args, choice) {
    const { player,
      opponentBoard,
      intelligentgeneratorFn,
      randomGeneratorFn } = args;

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
      choice = intelligentgeneratorFn({
        arr: opponentBoard.grid,
        player,
        randomGeneratorFn,});
      player.turn(choice);
    }
    choices.push(choice);
    player.turn(choice);
    return choices;
  },

  
  computerMakeChoice(options) {
    let choices = [];
    const { player, ownBoard, opponentBoard, index,
    intelligentgeneratorFn,
    randomGeneratorFn,
    sanitizingFn } = options;

    if (ownBoard.allShipsSunk("isSunk") === false && ownBoard.grid[index] === "*") {
      const choice = intelligentgeneratorFn({
        arr: opponentBoard.grid,
        player,
        randomGeneratorFn,
      });
      player.turn(choice);
      choices = choices.concat(sanitizingFn({ player, opponentBoard, intelligentgeneratorFn, randomGeneratorFn }, choice));
    }
    return choices;
  }
}))();

module.exports = playerMixin;
