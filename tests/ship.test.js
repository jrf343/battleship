const module = require("../src/factories/ship");

it("creates a new carrier with correct parameters", () => {
  const ship = module.shipFactory("carrier");
  expect(ship.name).toBe("carrier");
  expect(ship.length).toBe(5);
  expect(ship.hits.value).toBe(0);
});

it("creates a new battleship with correct parameters", () => {
  const ship = module.shipFactory("battleship");
  expect(ship.name).toBe("battleship");
  expect(ship.length).toBe(4);
  expect(ship.hits.value).toBe(0);
});

it("creates a new submarine with correct parameters", () => {
  const ship = module.shipFactory("submarine");
  expect(ship.name).toBe("submarine");
  expect(ship.length).toBe(3);
  expect(ship.hits.value).toBe(0);
});

it("creates a new cruiser with correct parameters", () => {
  const ship = module.shipFactory("cruiser");
  expect(ship.name).toBe("cruiser");
  expect(ship.length).toBe(3);
  expect(ship.hits.value).toBe(0);
});

it("creates a new patrolBoat with correct parameters", () => {
  const ship = module.shipFactory("patrolBoat");
  expect(ship.name).toBe("patrolBoat");
  expect(ship.length).toBe(2);
  expect(ship.hits.value).toBe(0);
});

it("takes a hit", () => {
  const ship = module.shipFactory("carrier");
  ship.hit();
  expect(ship.hits.value).toBe(1);
});

it("takes multiple hits", () => {
  const ship = module.shipFactory("carrier");
  ship.hit();
  ship.hit();
  expect(ship.hits.value).toBe(2);
});

it("doesn't sink under correct conditions", () => {
  const ship = module.shipFactory("carrier");
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

it("sinks under correct conditions", () => {
  const ship = module.shipFactory("carrier");
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
