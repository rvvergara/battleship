const Ship = require('./factories/ship');
const GameBoard = require('./factories/gameBoard');
const Player = require('./factories/player');
const {
  humanMakeChoice,
  computerMakeChoice,
} = require('./mixins/playerMixin');

const mainGame = () => {

  const fleet = {
    cruiser1: Ship(1),
    frigate1: Ship(2),
    destroyer1: Ship(3),
    carrier: Ship(4),
  };
  const fleet1 = Object.assign({}, fleet);
  const fleet2 = Object.assign({}, fleet);
  // 2. Create two gameBoards
  const gameBoard1 = GameBoard(fleet1);
  const gameBoard2 = GameBoard(fleet2);
  // 3. Create two players
  const player1 = Object.assign(Player(gameBoard2, 'receiveAttack', 'hit'), {
    makeChoice: humanMakeChoice,
  });

  const player2 = Object.assign(Player(gameBoard1, 'receiveAttack', 'hit'), {
    makeChoice: computerMakeChoice,
  });

  // Position ships for Player1
  gameBoard1.setShipPosition(fleet1.cruiser1, 0, 'vertical');
  gameBoard1.setShipPosition(fleet1.frigate1, 2, 'vertical');
  gameBoard1.setShipPosition(fleet1.destroyer1, 4, 'vertical');
  gameBoard1.setShipPosition(fleet1.carrier, 6, 'vertical');

  // Position ships for Player2
  gameBoard2.setShipPosition(fleet1.cruiser1, 0, 'vertical');
  gameBoard2.setShipPosition(fleet1.frigate1, 2, 'vertical');
  gameBoard2.setShipPosition(fleet1.destroyer1, 4, 'vertical');
  gameBoard2.setShipPosition(fleet1.carrier, 6, 'vertical');

  const gameCycle = () => {
    while (!gameBoard1.allShipsSunk('isSunk') && !gameBoard2.allShipsSunk('isSunk')) {
      player1.turn(player1.makeChoice(1));
      if (!gameBoard2.allShipsSunk('isSunk')) player2.turn(player2.makeChoice(gameBoard1.grid));
    }
  };

  return {
    gameCycle,
  };
};

export default mainGame;