const {
  generateRandomNumberFromArray,
  computerMakeChoice,
} = require("../mixins/playerMixin");

describe("playerMixin", () => {
  test('computerMakeChoice returns an array of choices', () => {
    const options = {
      player: {
        generateRandomNumberFromArray,
        turn: function fool(choice) {
          return choice;
        },
      },
      ownBoard: {
        grid: ['*', , 2, 3, '*'],
      },
      opponentBoard: {
        grid: [0, 1, , , , ],
      },
      index: 4,
      boardMethod: function foo(shipMethod) {
        return shipMethod();
      },
      shipMethod: function baz() {
        return false;
      },
    };
    expect(computerMakeChoice(options)).toEqual([0]);
  });

  test("generateRandomNumberFromArray returns a valid number", () => {
    const arr = [0, 1, , '*', ];
    expect(generateRandomNumberFromArray(arr)).toBeGreaterThanOrEqual(0);
    expect(generateRandomNumberFromArray(arr)).toBeLessThanOrEqual(5);
  });
});