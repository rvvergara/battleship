const GameBoard = require('../factories/gameboard');
const Ship = require('../factories/ship');

describe('GameBoard', () => {
  let ships, gameBoard;
  beforeEach(() => {
    ships = {
      carrier: Ship(4),
      frigate: Ship(3),
      sub: Ship(2),
      attacker: Ship(1),
    };
    gameBoard = GameBoard(ships);
  })
  test('GameBoard should have a grid array', () => {
    expect(gameBoard.grid).not.toBeFalsy();
  });
  test('GameBoard should place ships into each respective starting position', () => {
    gameBoard.setShipPosition(ships.attacker, 0);
    expect(ships.attacker.position).toBe(0);
  });
});