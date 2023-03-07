const gameboard = require("./gameboard");

const aiFactory = () => {
  const name = "computer";
  const board = gameboard.gameboardFactory();

  const directions = ["horizontal", "vertical"];
  const shipTypes = [
    "carrier",
    "battleship",
    "submarine",
    "cruiser",
    "patrolBoat",
  ];

  let shipCoords = [];
  let attackedCoords = [];

  const attack = (opponent) => {
    let coords = getRandomAttackCoords();
    opponent.board.recieveAttack(coords.x, coords.y);
  };

  const getRandomShipPlacement = (ship) => {
    let xCoord = Math.floor(Math.random() * 10);
    let yCoord = Math.floor(Math.random() * 10);
    let direction = directions[Math.floor(Math.random() * 2)];
    let shipType = ship;
    let placement = {
      shipType: ship,
      x: xCoord,
      y: yCoord,
      direction: direction,
    };
    try { 
      board.placeShip(shipType, xCoord, yCoord, direction);
    } catch (err) {
      console.log(err);
      getRandomShipPlacement(ship);
    }

    shipCoords.push(placement);
    return placement;
  };

  const getRandomAttackCoords = () => {
    let xCoord = Math.floor(Math.random() * 10);
    let yCoord = Math.floor(Math.random() * 10);
    let target = { x: xCoord, y: yCoord };
    if (attackedCoords.length != 0) {
      for (let obj of attackedCoords) {
        if (target === obj) {
          getRandomAttackCoords();
        }
      }
    }

    attackedCoords.push(target);
    return target;
  };

  return {
    name,
    board,
    attack,
    getRandomShipPlacement,
  };
};

module.exports = {
  aiFactory,
};
