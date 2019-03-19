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
    };
  });

  test('choiceSanitizer should return an array', () => {
    const randomGenMocker = () => 2;
    expect(choiceSanitizer(options.player, options.opponentBoard, 0, randomGenMocker).length).toBe(2);
  });

  test('computerMakeChoice returns an array of choices', () => {
    const randomGenMocker = () => 0;
    const sanitize = (p, b, c) => [2];
    expect(computerMakeChoice(options, randomGenMocker, sanitize)).toEqual([2]);
  });

  test("generateRandomNumberFromArray returns a valid number", () => {
    const arr = [0, 1, , '*', ];
    expect(generateRandomNumberFromArray(arr)).toBeGreaterThanOrEqual(0);
    expect(generateRandomNumberFromArray(arr)).toBeLessThanOrEqual(5);
  });
});