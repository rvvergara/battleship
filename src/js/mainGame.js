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

    const defPos = [{
        0: "vertical"
      },
      {
        2: "vertical"
      },
      {
        4: "vertical"
      },
      {
        6: "vertical"
      },
    ];
    // []



    // Position ships for human
    Object.keys(humanFleet).forEach((ship, i) => {
      const key = Number(Object.keys(defPos[i])[0]);
      humanBoard.setShipPosition(humanFleet[ship], key, defPos[i][key]);
    });

    // Position ships for computer should be dynamic
    Object.keys(computerFleet).forEach((ship, i) => {
      const key = Number(Object.keys(defPos[i])[0]);
      computerBoard.setShipPosition(computerFleet[ship], key, defPos[i][key]);
    });

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

    humanPlayer.turn(index);

    const turns = computerMakeChoice({
      player: computerPlayer,
      ownBoard: computerBoard,
      opponentBoard: humanBoard,
      index,
    }, generateRandomNumberFromArray, choiceSanitizer);

    return turns;
  };

  const checkWin = (opponentBoard) => {
    return opponentBoard.allShipsSunk('isSunk');
  };

  const endGame = (humanBoard, computerBoard) => {
    return checkWin(humanBoard) || checkWin(computerBoard);
  };

  return {
    gameTurn,
    battleShipObjs,
    checkWin,
    endGame,
  };
};

export default mainGame;