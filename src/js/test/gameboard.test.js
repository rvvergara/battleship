const GameBoard = require('../factories/gameboard');
const Ship = require('../factories/ship');

describe('GameBoard', () => {
  let ships, gameBoard;
  beforeEach(() => {
    ships = {
      carrier: Ship(4),
      frigate: Ship(3),
      submarine: Ship(2),
      attacker: Ship(1),
    };
    gameBoard = GameBoard(ships);
  })

  test('GameBoard should have a grid array', () => {
    expect(gameBoard.grid).not.toBeFalsy();
  });

  describe('set ship position', () => {
    test('Gameboard should place attaker ship length of 1', () => {
      gameBoard.setShipPosition(ships.attacker, 0);
      expect(ships.attacker.position).toEqual([0]);
    });
    test('Gameboard should place submarine ship length of 2 ', () => {
      gameBoard.setShipPosition(ships.submarine, 2);
      expect(ships.submarine.position).toEqual([2, 3]);
    });

    test('Gameboard should place carrier ship length of 4 ', () => {
      gameBoard.setShipPosition(ships.carrier, 4);
      expect(ships.carrier.position).toEqual([4, 5, 6, 7]);
    });
  });


});