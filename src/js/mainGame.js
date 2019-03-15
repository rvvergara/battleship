const Ship = require('./factories/ship');
const GameBoard = require('./factories/gameBoard');
const Player = require('./factories/player');
const {
  computerMakeChoice,
} = require('./mixins/playerMixin');

const mainGame = () => {
  const battleShipObjs = ((Ship, GameBoard, Player) => {
    const fleet = {
      cruiser1: Ship(1),
      frigate1: Ship(2),
      destroyer1: Ship(3),
      carrier: Ship(4),
    };
    const humanFleet = Object.assign({}, fleet);
    const computerFleet = Object.assign({}, fleet);
    // 2. Create two gameBoards
    const humanBoard = GameBoard(humanFleet);
    const computerBoard = GameBoard(computerFleet);
    // 3. Create two players
    const human = Object.assign(Player(computerBoard, 'receiveAttack', 'hit'));

    const computer = Object.assign(Player(humanBoard, 'receiveAttack', 'hit'), {
      makeChoice: computerMakeChoice,
    });

    // Position ships for human
    humanBoard.setShipPosition(humanFleet.cruiser1, 0, 'vertical');
    humanBoard.setShipPosition(humanFleet.frigate1, 2, 'vertical');
    humanBoard.setShipPosition(humanFleet.destroyer1, 4, 'vertical');
    humanBoard.setShipPosition(humanFleet.carrier, 6, 'vertical');

    // Position ships for computer
    computerBoard.setShipPosition(computerFleet.cruiser1, 0, 'vertical');
    computerBoard.setShipPosition(computerFleet.frigate1, 2, 'vertical');
    computerBoard.setShipPosition(computerFleet.destroyer1, 4, 'vertical');
    computerBoard.setShipPosition(humanFleet.carrier, 6, 'vertical');

    return {
      humanBoard,
      computerBoard,
      human,
      computer,
    };
  })(Ship, GameBoard, Player);


  const gameTurn = (index, humanPlayer, computerPlayer, humanBoard, computerBoard) => {
    console.log(humanBoard.grid);

    // humanPlayer turn(index) gets called
    humanPlayer.turn(index);
    // if computer's gameBoard is still alive then computerPlayer turn(computerPlayer.makeChoice()) gets called
    if (!computerBoard.allShipsSunk('isSunk')) computerPlayer.turn(computerPlayer.makeChoice(humanBoard));
    // check if someone has won
  };

  return {
    gameTurn,
    battleShipObjs,
  };
};

export default mainGame;