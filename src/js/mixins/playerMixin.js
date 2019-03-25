const playerMixin = (() => ({
  intelligentChoiceGenerator(arr, player, randomGeneratorFn) {
    const queue = player.shotsRecord.shotsQueue;
    const choice =
      queue.length === 0 ? randomGeneratorFn(arr, player) : queue.shift();
    player.shotsRecord.shotsMade.push(choice);
    return choice;
  },
  generateRandomNumberFromArray(arr, player) {
    // While Math.round(Math.random()*arr.length) is occupied keep selecting
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
    randomGeneratorFn
  ) {
    const choices = [];
    const grid = opponentBoard.grid;
    const shotsMade = player.shotsRecord.shotsMade;
    console.log("Shots already made", shotsMade);
    const shotsQueue = player.shotsRecord.shotsQueue;
    // For as long as the choice does not correspond to an * then keep making a choice
    while (grid[choice] === "X") {
      const neighborIndices = [
        choice - 10,
        choice - 1,
        choice + 1,
        choice + 10
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
      // shotsMade.push(choice);
      choices.push(choice);
      choice = intelligentgeneratorFn(
        opponentBoard.grid,
        player,
        randomGeneratorFn
      );
      player.turn(choice);
      // shotsMade.push(choice);
    }
    choices.push(choice);
    player.turn(choice);
    // shotsMade.push(choice);
    // If the function goes inside the while loop then choices.length > 0
    return choices;
  },

  // computerMakeChoice(player, ownBoard, opponentBoard, index)
  computerMakeChoice(
    options,
    intelligentgeneratorFn,
    randomGeneratorFn,
    sanitizingFn
  ) {
    let choices = [];
    const { player, ownBoard, opponentBoard, index } = options;

    if (
      ownBoard.allShipsSunk("isSunk") === false &&
      ownBoard.grid[index] === "*"
    ) {
      const choice = intelligentgeneratorFn(
        opponentBoard.grid,
        player,
        randomGeneratorFn,
      );

      player.turn(choice);

      // player.shotsRecord.shotsMade.push(choice);

      choices = choices.concat(
        sanitizingFn(
          player,
          opponentBoard,
          choice,
          intelligentgeneratorFn,
          randomGeneratorFn
        )
      );
    }
    return choices;
  }
}))();

module.exports = playerMixin;
