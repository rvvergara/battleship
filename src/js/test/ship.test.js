const Ship = require('../factories/ship');

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = Ship(5);
  })
  describe("hit", () => {
    test('hit() should increment the number of hits oth the ship', () => {
      ship.hit();
      expect(ship.hits).toBe(1);
    });
    test('hit() should not increament hits if ship is already sunk', () => {
      const sub = Ship(1);
      sub.hit();
      sub.hit();
      expect(sub.hits).toBe(1);
    });
  });
  test('isSunk() should return false if the number of hits is less then the length of the ship', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  });

});