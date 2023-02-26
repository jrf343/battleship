const ship = require("./ship");

const gameboardFactory = () => {
  const shipArray = [
    ship.shipFactory("carrier"),
    ship.shipFactory("battleship"),
    ship.shipFactory("submarine"),
    ship.shipFactory("cruiser"),
    ship.shipFactory("patrolBoat"),
  ];

  const boardSize = 10;
  let liveShips = { value: shipArray.length };

  let board = [];
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i].push({
        occupied: false,
        miss: false,
        shot: false,
        shipName: "",
      });
    }
  }

  const placeShip = (shipType, xCoord, yCoord, direction) => {
    const targetShip = shipArray.find(
      (targetShip) => targetShip.type === shipType
    );
    const size = targetShip.length;

    if (checkBoundary(size, xCoord, yCoord, direction) === false) {
      throw new Error("Impossible placement: off board");
    } else if (checkOverlap(size, xCoord, yCoord, direction) === false) {
      throw new Error("Impossible placement: overlapping ships");
    } else {
      if (direction === "north") {
        for (let i = 0; i < size; i++) {
          board[xCoord + i][yCoord].occupied = true;
          board[xCoord + i][yCoord].ship = targetShip.type;
        }
      } else if (direction === "south") {
        for (let i = 0; i < size; i++) {
          board[xCoord - i][yCoord].occupied = true;
          board[xCoord - i][yCoord].shipName = targetShip.type;
        }
      } else if (direction === "east") {
        for (let i = 0; i < size; i++) {
          board[xCoord][yCoord - i].occupied = true;
          board[xCoord][yCoord - i].shipName = targetShip.type;
        }
      } else {
        for (let i = 0; i < size; i++) {
          board[xCoord][yCoord + i].occupied = true;
          board[xCoord][yCoord + i].shipName = targetShip.type;
        }
      }
    }
  };

  const checkBoundary = (size, xCoord, yCoord, direction) => {
    if (direction === "north" && xCoord + size > 9) {
      return false;
    } else if (direction === "south" && xCoord - size < 0) {
      return false;
    } else if (direction === "east" && yCoord - size < 0) {
      return false;
    } else if (direction === "west" && yCoord + size > 9) {
      return false;
    } else {
      return true;
    }
  };

  const checkOverlap = (size, xCoord, yCoord, direction) => {
    if (direction === "north") {
      for (let i = 0; i < size; i++) {
        if (board[xCoord + i][yCoord].occupied === true) {
          return false;
        }
      }
    } else if (direction === "south") {
      for (let i = 0; i < size; i++) {
        if (board[xCoord - i][yCoord].occupied === true) {
          return false;
        }
      }
    } else if (direction === "east") {
      for (let i = 0; i < size; i++) {
        if (board[xCoord][yCoord - i].occupied === true) {
          return false;
        }
      }
    } else if (direction === "west") {
      for (let i = 0; i < size; i++) {
        if (board[xCoord][yCoord + i].occupied === true) {
          return false;
        }
      }
    } else {
      return true;
    }
  };

  const recieveAttack = (xCoord, yCoord) => {
    board[xCoord][yCoord].shot = true;
    if (board[xCoord][yCoord].occupied === true) {
      const targetShip = shipArray.find(
        (targetShip) => targetShip.type === board[xCoord][yCoord].shipName
      );
      targetShip.hit();
      if (targetShip.isSunk()) {
        console.log(targetShip.type + " is dead");
        liveShips.value--;
        shipReport();
      }
    } else {
      board[xCoord][yCoord].miss = true;
    }
  };

  const shipReport = () => {
    if (liveShips.value === 0) {
      console.log("Game over!");
    } else {
      console.log("Ships remaining: " + liveShips.value);
    }
  };

  return {
    placeShip,
    recieveAttack,

    get getBoard() {
      return board;
    },
  };
};

module.exports = {
  gameboardFactory,
};
