const module = require("../src/factories/ai");
const playerModule = require("../src/factories/player");

it("generates a new ai", () => {
  const ai = module.aiFactory();
  expect(ai.name).toBe("computer");
});

it("generates a blank board", () => {
  const ai = module.aiFactory();
  expect(
    ai.board.getBoard
      .flat()
      .every(
        (x) => x === { occupied: false, miss: false, shot: false, shipName: "" }
      )
  );
});

it("generates correct random ship placements", () => {
  const ai = module.aiFactory();
  const placement = ai.getRandomShipPlacement();
  expect(
    placement.shipType === "carrier" ||
      placement.shipType === "battleship" ||
      placement.shipType === "submarine" ||
      placement.shipType === "cruiser" ||
      placement.shipType === "patrolBoat"
  ).toBe(true);
  expect(0 <= placement.x <= 9 && 0 <= placement.y <= 9).toBe(true);
  expect(
    placement.direction === "vertical" || placement.direction === "horizontal"
  ).toBe(true);
});

it("attacks opponent correctly", () => {
  const ai = module.aiFactory();
  const player = playerModule.playerFactory("julia");
  ai.attack(player);
  let shotArray = [];
  player.board.getBoard.flat().forEach(function (obj) {
    shotArray.push(obj.shot);
  });
  expect(shotArray.includes(true)).toBe(true);
});
