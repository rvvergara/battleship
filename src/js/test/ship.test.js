const Ship = require('../factories/ship');

describe('Ship', () => {
  test('ship has a length property', () => {
    const ship = Ship(5);
    expect(ship.length).toBe(5);
  });
})