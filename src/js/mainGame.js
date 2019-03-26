const Ship = require("./factories/ship");
const GameBoard = require("./factories/gameBoard");
const Player = require("./factories/player");
const {
  generateRandomNumberFromArray,
  intelligentChoiceGenerator,
  choiceSanitizer,
  computerMakeChoice,
} = require("./mixins/playerMixin");

const mainGame = defPos => {
  const setDefaultShipsPosition = (fleetObj, boardObj, posArr) => {
    Object.keys(fleetObj).forEach((ship, i) => {
      const shipStartingIndex = Number(Object.keys(posArr[i])[0]);

      const shipOrientation = posArr[i][shipStartingIndex];

      boardObj.setShipPosition(
        fleetObj[ship],
        shipStartingIndex,
        shipOrientation,
      );
    });
  };

  const battleShipObjs = ((shipFactory, gameBoardFactory, playerFactory) => {
    const humanFleet = Object.assign({
      cruiser1: shipFactory(1),
      cruiser2: shipFactory(1),
      cruiser3: shipFactory(1),
      cruiser4: shipFactory(1),
      frigate1: shipFactory(2),
      frigate2: shipFactory(2),
      frigate3: shipFactory(2),
      destroyer1: shipFactory(3),
      destroyer2: shipFactory(3),
      carrier: shipFactory(4),
    });
    const computerFleet = Object.assign({
      cruiser1: shipFactory(1),
      cruiser2: shipFactory(1),
      cruiser3: shipFactory(1),
      cruiser4: shipFactory(1),
      frigate1: shipFactory(2),
      frigate2: shipFactory(2),
      frigate3: shipFactory(2),
      destroyer1: shipFactory(3),
      destroyer2: shipFactory(3),
      carrier: shipFactory(4),
    });
    const humanBoard = gameBoardFactory(humanFleet);
    const computerBoard = gameBoardFactory(computerFleet);
    const human = Object.assign(
      playerFactory(computerBoard, "receiveAttack", "hit")
    );

    const computer = Object.assign(
      playerFactory(humanBoard, "receiveAttack", "hit"), {
        generateRandomNumberFromArray,
        makeChoice: computerMakeChoice,
        shotsRecord: {
          shotsMade: [],
          shotsQueue: []
        }
      }
    );

    setDefaultShipsPosition(humanFleet, humanBoard, defPos[0]);
    setDefaultShipsPosition(computerFleet, computerBoard, defPos[Math.floor(Math.random() * (defPos.length - 1)) + 1]);
    return {
      humanBoard,
      computerBoard,
      human,
      computer
    };
  })(Ship, GameBoard, Player);

  const gameTurn = (
    index,
    humanPlayer,
    computerPlayer,
    humanBoard,
    computerBoard
  ) => {
    humanPlayer.turn(index);

    const computerChoices = computerMakeChoice({
        player: computerPlayer,
        ownBoard: computerBoard,
        opponentBoard: humanBoard,
        index
      },
      intelligentChoiceGenerator,
      generateRandomNumberFromArray,
      choiceSanitizer
    );

    return computerChoices;
  };

  const checkWin = opponentBoard => {
    return opponentBoard.allShipsSunk("isSunk");
  };

  const endGame = (humanBoard, computerBoard) =>
    checkWin(humanBoard) || checkWin(computerBoard);

  return {
    gameTurn,
    battleShipObjs,
    checkWin,
    endGame
  };
};

export default mainGame;