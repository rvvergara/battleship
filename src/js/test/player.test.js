const Player = require('../factories/player');
const Ship = require('../factories/ship');
const GameBoard = require('../factories/gameBoard');
const computerMixin = require('../mixins/computerMixin');

describe('player object', () => {
  let player;
  let ships;
  let enemyGameBoard;

  beforeEach(() => {
    ships = {
      carrier: Ship(4),
      frigate: Ship(3),
      submarine: Ship(2),
      attacker: Ship(1),
    };
    enemyGameBoard = GameBoard(ships);
    // Set position of enemy's ships 
    enemyGameBoard.setShipPosition(ships.attacker, 0, "horizontal");
    enemyGameBoard.setShipPosition(ships.submarine, 2, "horizontal");
    enemyGameBoard.setShipPosition(ships.carrier, 4, "vertical");
    enemyGameBoard.setShipPosition(ships.frigate, 13, "horizontal");
  });

  describe('human player', () => {
    beforeEach(() => {
      player = Player(enemyGameBoard);
    })
    test('should hit a ship during its turn', () => {
      player.turn(0);
      expect(enemyGameBoard.ships.attacker.isSunk()).toBe(true);
    });
  });

  describe('computer player', () => {
    beforeEach(() => {
      player = Object.assign(Player(enemyGameBoard), computerMixin);
    });

    test('computer player should be able to make a valid turn', () => {
      player.turn(player.makeChoice(enemyGameBoard.grid));
      expect(enemyGameBoard.grid.some(cell => cell === "*")).toBe(true);
    });

  });

});