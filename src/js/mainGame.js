const Ship = require("./factories/ship");
const GameBoard = require("./factories/gameBoard");
const Player = require("./factories/player");
const {
  generateRandomNumberFromArray,
  choiceSanitizer,
  computerMakeChoice,
} = require("./mixins/playerMixin");

const mainGame = () => {
  const battleShipObjs = ((Ship, GameBoard, Player) => {
    const humanFleet = Object.assign({
      cruiser1: Ship(1),
      frigate1: Ship(2),
      destroyer1: Ship(3),
      carrier: Ship(4),
    });
    const computerFleet = Object.assign({
      cruiser1: Ship(1),
      frigate1: Ship(2),
      destroyer1: Ship(3),
      carrier: Ship(4),
    });
    // 2. Create two gameBoards
    const humanBoard = GameBoard(humanFleet);
    const computerBoard = GameBoard(computerFleet);
    // 3. Create two players
    const human = Object.assign(Player(computerBoard, "receiveAttack", "hit"));

    const computer = Object.assign(Player(humanBoard, "receiveAttack", "hit"), {
      generateRandomNumberFromArray,
      makeChoice: computerMakeChoice,
    });

    // Position ships for human
    humanBoard.setShipPosition(humanFleet.cruiser1, 0, "vertical");
    humanBoard.setShipPosition(humanFleet.frigate1, 2, "vertical");
    humanBoard.setShipPosition(humanFleet.destroyer1, 4, "vertical");
    humanBoard.setShipPosition(humanFleet.carrier, 6, "vertical");

    // Position ships for computer
    computerBoard.setShipPosition(computerFleet.cruiser1, 0, "vertical");
    computerBoard.setShipPosition(computerFleet.frigate1, 2, "vertical");
    computerBoard.setShipPosition(computerFleet.destroyer1, 4, "vertical");
    computerBoard.setShipPosition(computerFleet.carrier, 6, "vertical");

    return {
      humanBoard,
      computerBoard,
      human,
      computer,
    };
  })(Ship, GameBoard, Player);

  const gameTurn = (
    index,
    humanPlayer,
    computerPlayer,
    humanBoard,
    computerBoard,
  ) => {
    // humanPlayer turn(index) gets called
    humanPlayer.turn(index);
    // Computer choices
    const turns = computerMakeChoice({
      player: computerPlayer,
      ownBoard: computerBoard,
      opponentBoard: humanBoard,
      index,
    }, generateRandomNumberFromArray, choiceSanitizer);

    if (checkWin(humanBoard) || checkWin(computerBoard)) endGame();

    return turns;
  };

  const checkWin = (opponentBoard) => {
    return opponentBoard.allShipsSunk('isSunk');
  };

  const endGame = () => {
    console.log("Game Over!!!");
  };

  return {
    gameTurn,
    battleShipObjs,
    checkWin,
  };
};

export default mainGame;