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
  board.placeShip("patrolBoat", 0, 0, "horizontal");
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

it("recieves attacks correctly", () => {
  const board = module.gameboardFactory();
  board.placeShip("patrolBoat", 0, 0, "horizontal");
  board.recieveAttack(0, 0);
  expect(board.getBoard[0][0].shot).toBe(true);
});
