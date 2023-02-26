const module = require("../src/factories/player");

it("generates a new player", () => {
  const player = module.playerFactory("julia");
  expect(player.getPlayer()).toBe("julia");
});

it("generates a blank board", () => {
  const player = module.playerFactory("julia");
  expect(
    player.board.getBoard
      .flat()
      .every(
        (x) => x === { occupied: false, miss: false, shot: false, shipName: "" }
      )
  );
});

it("attacks opponent board correctly", () => {
  const player = module.playerFactory("julia");
  const opponent = module.playerFactory("computer");
  player.attack(0, 0, opponent);
  expect(opponent.board.getBoard[0][0].shot).toBe(true);
});

it("doesn't attack incorrectly", () => {
  const player = module.playerFactory("julia");
  const opponent = module.playerFactory("computer");
  player.attack(0, 0, opponent);
  expect(() => {
    player.attack(0, 0, opponent);
  }).toThrow("Already shot here! Try again.");
});
