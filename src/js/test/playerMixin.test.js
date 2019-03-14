const {
  computerMakeChoice,
  humanMakeChoice
} = require("../mixins/playerMixin");

describe("playerMixin", () => {
  describe("computerMakeChoice", () => {
    test("computerMakeChoice returns a valid number", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(computerMakeChoice(arr)).toBeLessThanOrEqual(5);
    });
  });

  describe("humanMakeChoice", () => {});
});
