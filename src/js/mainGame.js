const Ship = require("./factories/ship");
const GameBoard = require("./factories/gameBoard");
const Player = require("./factories/player");
const {
  generateRandomNumberFromArray,
  choiceSanitizer,
  computerMakeChoice,
} = require("./mixins/playerMixin");

const mainGame = (defPos) => {
  const setDefaultShipsPosition = (fleetObj, boardObj, posArr) => {
    Object.keys(fleetObj).forEach((ship, i) => {
      const key = Number(Object.keys(posArr[i])[0]);
      boardObj.setShipPosition(fleetObj[ship], key, posArr[i][key]);
    });
  };

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
    const humanBoard = GameBoard(humanFleet);
    const computerBoard = GameBoard(computerFleet);
    const human = Object.assign(Player(computerBoard, "receiveAttack", "hit"));

    const computer = Object.assign(Player(humanBoard, "receiveAttack", "hit"), {
      generateRandomNumberFromArray,
      makeChoice: computerMakeChoice,
    });


    setDefaultShipsPosition(humanFleet, humanBoard, defPos);
    setDefaultShipsPosition(computerFleet, computerBoard, defPos);
    console.log(humanBoard.ships);
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

    const computerChoices = computerMakeChoice({
      player: computerPlayer,
      ownBoard: computerBoard,
      opponentBoard: humanBoard,
      index,
    }, generateRandomNumberFromArray, choiceSanitizer);

    return computerChoices;
  };

  const checkWin = (opponentBoard) => {
    return opponentBoard.allShipsSunk('isSunk');
  };

  const endGame = (humanBoard, computerBoard) => (checkWin(humanBoard) || checkWin(computerBoard))

  return {
    gameTurn,
    battleShipObjs,
    checkWin,
    endGame,
  };
};

export default mainGame;