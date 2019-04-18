const Player = require('../factories/player');

describe('Player object', () => {
  describe('human player', () => {
    let player;
    let gameBoardObj;
    let playerMixinObj;
    let receiveAttackMethod;
    beforeEach(() => {
      receiveAttackMethod = jest.fn((index, method) => index * 5);
      gameBoardObj = {
        receiveAttackMethod,
      };
      playerMixinObj = {
        choose(index) {
          return index;
        },
      };
      player = Object.assign(Player(gameBoardObj, "receiveAttackMethod", "hitMethod"), playerMixinObj);
    });

    test('player has a method that returns an index passed to it', () => {
      expect(player.choose(2)).toBe(2);
    });

    test('player can make a turn by returning an index', () => {
      player.turn(player.choose(2));
      expect(gameBoardObj.receiveAttackMethod).toBeCalledWith(2, 'hitMethod');
    });
  });
});