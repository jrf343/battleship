const ship = require("./ship");

const gameboardFactory = () => {

  const carrier = ship.shipFactory('carrier');
  const battleship = ship.shipFactory('battleship');
  const submarine = ship.shipFactory('submarine');
  const cruiser = ship.shipFactory('cruiser');
  const patrolBoat = ship.shipFactory('patrolBoat');

  const shipArray = [carrier, battleship, submarine, cruiser, patrolBoat];

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
    let targetShip = null;
    let size = null;
    for (let elem of shipArray) {
        if (shipType === elem.name) {
            targetShip = elem;
            size = targetShip.length;
        }
    }

    const spanArray = generateAdjacentSquares(size, xCoord, yCoord, direction);

    if (checkBoundaries(spanArray)) {
        return new Error('Ship out of bounds.')
    }

    if (checkCollision(spanArray)) {
        return new Error('Ship collision');
    }

    for (let elem of spanArray) {
        board[elem.x][elem.y].occupied = true;
        board[elem.x][elem.y].shipName = targetShip.name;
    }

  };

  const generateAdjacentSquares = (size, xCoord, yCoord, direction) => {
    let spanArray = [];

    if (direction === 'vertical') {
        for (let i = 0; i < size; i++) {
            let x = xCoord + i;
            spanArray.push({x: x, y: yCoord});
        }
    } else {
        for (let i = 0; i < size; i++) {
            let y = yCoord + i;
            spanArray.push({x: xCoord, y: y});
        }
    }

    return spanArray;
  }

  const checkBoundaries = (spanArray) => {
    let outOfBounds = false;
    for (let elem of spanArray) {
        if (elem.x > boardSize || elem.y > boardSize) {
            outOfBounds = true;
        }
    }
    return outOfBounds;
  }

  const checkCollision = (spanArray) => {
    let collision = false;
    for (let elem of spanArray) {
        if (board[elem.x][elem.y].occupied === 'true') {
            collision = true;
        }
    }
    return collision;
  }

  const recieveAttack = (xCoord, yCoord) => {
    board[xCoord][yCoord].shot = true;
    if (board[xCoord][yCoord].occupied === true) {
      const targetShip = shipArray.find(
        (targetShip) => targetShip.name === board[xCoord][yCoord].shipName
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
    boardSize,
    placeShip,
    recieveAttack,
    checkBoundaries,
    checkCollision,

    get getBoard() {
      return board;
    },

  };
};

module.exports = {
  gameboardFactory,
};
