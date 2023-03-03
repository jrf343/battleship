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

  const getRandomShipPlacement = () => {
    let xCoord = Math.floor(Math.random() * 10);
    let yCoord = Math.floor(Math.random() * 10);
    let direction = directions[Math.floor(Math.random() * 2)];
    let shipType = shipTypes[Math.floor(Math.random() * 5)];
    let placement = {
      shipType: shipType,
      x: xCoord,
      y: yCoord,
      direction: direction,
    };
    if (shipCoords.length != 0) {
      for (let obj of shipCoords) {
        if (placement === obj) {
          getRandomShipPlacement();
        }
      }
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
