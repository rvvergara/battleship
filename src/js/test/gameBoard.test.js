const GameBoard = require('../factories/gameBoard');
const Ship = require('../factories/ship');

describe('GameBoard', () => {
  let ships;
  let gameBoard;
  beforeEach(() => {
    const carrierFromFactory = Ship(4);
    ships = {
      carrier: Object.assign({}, {
        length: carrierFromFactory.length,
        hits: carrierFromFactory.hits,
        hit: carrierFromFactory.hit,
        isSunk: carrierFromFactory.isSunk,
      }),
      frigate: Ship(3),
      submarine: Ship(2),
      attacker: Ship(1),
    };
    gameBoard = GameBoard(ships);
    gameBoard.setShipPosition(ships.attacker, 0, "horizontal");
    gameBoard.setShipPosition(ships.submarine, 2, "horizontal");
    gameBoard.setShipPosition(ships.carrier, 4, "vertical");
    gameBoard.setShipPosition(ships.frigate, 13, "horizontal");
  });

  test('GameBoard should have a grid array', () => {
    expect(gameBoard.grid).not.toBeFalsy();
  });

  describe('set ship position', () => {
    test('gameBoard should position a ship with length 1', () => {
      expect(ships.attacker.position).toEqual([0]);
      expect(gameBoard.grid[0]).toBe(0);
    });
    test('gameBoard should position a ship with length 2 ', () => {
      expect(ships.submarine.position).toEqual([2, 3]);
    });

    test('gameBoard should position a ship even if the ship does not come with a position array', () => {
      expect(ships.carrier.position).toEqual([4, 14, 24, 34]);
    });

    test("gameBoard should not place ship in occupied squares", () => {
      expect(ships.frigate.position).toEqual([]);
    });

    // Gameboard filled up test

    test("gameBoard grid should reflect ships' positions", () => {
      const every = (arr, fn) => {
        for (let i = 0; i < arr.length; i++) {
          if (!fn(arr[i])) return false;
        }
        return true;
      };
      expect(every(gameBoard.grid, x => x !== undefined)).toBeFalsy();
    });
  });

  describe('receiveAttack', () => {
    test("it should call hit method of a ship if that ship is occupying the index that was passed", () => {
      gameBoard.receiveAttack(3, 'hit');
      expect(ships.submarine.hits).toBe(1);
    });

    test("it should assign the missed index in grid as *", () => {
      gameBoard.receiveAttack(25, 'hit');
      expect(gameBoard.grid[25]).toBe('*');
    });
  });

  describe('All ships sank', () => {
    beforeEach(() => {
      Object.keys(ships).slice(0, -1).forEach((key) => {
        for (let i = 0; i < ships[key].length; i += 1) {
          ships[key].hit();
        }
      });
    });

    test('allShipsSunk() should return false ', () => {
      expect(gameBoard.allShipsSunk('isSunk')).toBe(false);
    });

    test('allShipsSunk() should return true', () => {
      ships.attacker.hit();
      expect(gameBoard.allShipsSunk('isSunk')).toBe(true);
    });
  });
});