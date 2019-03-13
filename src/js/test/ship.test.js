const Ship = require('../factories/ship');

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = Ship(5);
  })
  test('ship has a length property', () => {
    // const ship = Ship(5);
    expect(ship.length).toBe(5);
  });
});