const Player = require('../factories/player');

describe('Player object', () => {
  describe('human player', () => {
    let player;
    let someObj;
    let someMixinObj;
    let someMethod;
    beforeEach(() => {
      someMethod = jest.fn(index => index * 5);
      someObj = {
        someMethod,
      };
      someMixinObj = {
        choose(index) {
          return index;
        },
      };
      player = Object.assign(Player(someObj, "someMethod"), someMixinObj);
    });

    test('player has a method that returns an index passed to it', () => {
      expect(player.choose(2)).toBe(2);
    });

    test('player can make a turn by returning an index', () => {
      player.turn(player.choose(2));
      expect(someObj.someMethod).toBeCalledWith(2);
    });
  });
});