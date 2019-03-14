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
    humanPlayer = Object.assign(Player(), {
      makeChoice: playerMixin.humanMakeChoice
    });
    enemyGameBoard = GameBoard(ships);
    // Set position of enemy's ships 
    enemyGameBoard.setShipPosition(ships.attacker, 0, "horizontal");
    enemyGameBoard.setShipPosition(ships.submarine, 2, "horizontal");
    enemyGameBoard.setShipPosition(ships.carrier, 4, "vertical");
    enemyGameBoard.setShipPosition(ships.frigate, 13, "horizontal");
  });

  describe('human player object', () => {
    test('humanPlayer has a makeChoice method', () => {
      expect(humanPlayer.makeChoice()).toBeTruthy();
    })
  });

  describe('human makeChoice method', () => {
    test('', () => {

    });
  });
});