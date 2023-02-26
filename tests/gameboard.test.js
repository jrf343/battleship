const module = require("../src/factories/gameboard");

it("generates a new gameboard", () => {
  const board = module.gameboardFactory();
  expect(
    board.getBoard
      .flat()
      .every(
        (x) => x === { occupied: false, miss: false, shot: false, shipName: "" }
      )
  );
});

it("places ships correctly", () => {
  const board = module.gameboardFactory();
  board.placeShip("patrolBoat", 0, 0, "west");
  expect(board.getBoard[0][0]).toEqual({
    occupied: true,
    miss: false,
    shot: false,
    shipName: "patrolBoat",
  });
  expect(board.getBoard[0][1]).toEqual({
    occupied: true,
    miss: false,
    shot: false,
    shipName: "patrolBoat",
  });
});

it("doesn't place ships incorrectly", () => {
  const board = module.gameboardFactory();
  board.placeShip("patrolBoat", 0, 0, "west");
  expect(() => {
    board.placeShip("carrier", 0, 0, "north");
  }).toThrow("Impossible placement: overlapping ships");
});

it("doesn't place ships incorrectly pt 2", () => {
  const board = module.gameboardFactory();
  expect(() => {
    board.placeShip("carrier", 0, 0, "south");
  }).toThrow("Impossible placement: off board");
});

it("recieves attacks correctly", () => {
  const board = module.gameboardFactory();
  board.placeShip("patrolBoat", 0, 0, "west");
  board.recieveAttack(0, 0);
  expect(board.getBoard[0][0].shot).toBe(true);
});
