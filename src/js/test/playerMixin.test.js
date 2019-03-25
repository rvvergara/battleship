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
    };
  });

  test('choiceSanitizer should return an array', () => {
    const randomGenMocker = () => 2;
    const intelligentMocker = () => 1;
    expect(choiceSanitizer(options.player, options.opponentBoard, 0, intelligentMocker, randomGenMocker).length).toBe(1);
  });

  test('computerMakeChoice returns an array of choices', () => {
    const randomGenMocker = () => 0;
    const intelligentMocker = () => 0;
    const sanitize = (p, b, c, i, r) => [2];
    expect(computerMakeChoice(options, intelligentMocker, randomGenMocker, sanitize)).toEqual([2]);
  });

  test("generateRandomNumberFromArray returns a valid number", () => {
    const arr = [0, 1, , '*', ];
    expect(generateRandomNumberFromArray(arr, options.player)).toBeGreaterThanOrEqual(0);
    expect(generateRandomNumberFromArray(arr, options.player)).toBeLessThanOrEqual(5);
  });
});