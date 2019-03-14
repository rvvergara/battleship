const Player = require('../factories/player');
const Ship = require('../factories/ship');
const GameBoard = require('../factories/gameBoard');
const playerMixin = require('../mixins/playerMixin');

describe('player object', () => {
  let humanPlayer;
  let computerPlayer;
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

  describe('human player object', () => {
    beforeEach(() => {
      humanPlayer = Object.assign(Player(), playerMixin);
    });
    test('humanPlayer has a makeChoice method', () => {
      expect(humanPlayer.humanMakeChoice(enemyGameBoard.grid)).toBeTruthy();
    });

    test('human player choose correct index from avaiable positions ', () => {
      const index = humanPlayer.humanMakeChoice(enemyGameBoard.grid, 1);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThanOrEqual(99);
      expect(enemyGameBoard.grid[index]).toBeUndefined();
    });
  });

  describe('computer player object', () => {
    beforeEach(() => {
      computerPlayer = Object.assign(Player(), {
        makeChoice: playerMixin.computerMakeChoice,
      });
    });
  });
});