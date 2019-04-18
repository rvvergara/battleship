const {
  generateRandomNumberFromArray,
  choiceSanitizer,
  computerMakeChoice,
} = require("../mixins/playerMixin");

describe("playerMixin", () => {
  let options = {};

  beforeEach(() => {
    options = {
      player: {
        generateRandomNumberFromArray,
        turn: function fool(choice) {
          return choice;
        },
        shotsRecord: {
          shotsMade: [],
          shotsQueue: [],
        }
      },
      ownBoard: {
        grid: ['*', , 2, 3, '*'],
        allShipsSunk() {
          return false;
        },
      },
      opponentBoard: {
        grid: [0, 1, '*', , , ],
      },
      index: 4,
      boardMethod: function foo(shipMethod) {
        return shipMethod();
      },
      shipMethod: function baz() {
        return false;
      },
      randomGenMocker() {
        return 0;
      },
      intelligentMocker() {
        return 0;
      },
      sanitize(p, b, c, i, r) {
        return [2]
      },
    };
  });

  test('choiceSanitizer should return an array', () => {
    expect(choiceSanitizer({
      player: options.player,
      opponentBoard: options.opponentBoard,
      intelligentGeneratorFn: options.intelligentMocker,
      randomGeneratorFn: options.randomGenMocker,
      sanitizingFn: options.sanitize,
    }, 0).length).toBe(1);
  });

  test('computerMakeChoice returns an array of choices', () => {
    expect(computerMakeChoice({
      player: options.player,
      ownBoard: options.ownBoard,
      opponentBoard: options.opponentBoard,
      index: options.index,
      intelligentGeneratorFn: options.intelligentMocker,
      randomGeneratorFn: options.randomGenMocker,
      sanitizingFn: options.sanitize,
    })).toEqual([2]);
  });

  test("generateRandomNumberFromArray returns a valid number", () => {
    const arr = [0, 1, , '*', ];
    expect(generateRandomNumberFromArray({
      arr,
      player: options.player,
    })).toBeGreaterThanOrEqual(0);
    expect(generateRandomNumberFromArray({
      arr,
      player: options.player,
    })).toBeLessThanOrEqual(5);
  });
});