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
    const targetShip = shipArray.filter(target => { target.name === `${shipType}` });
    const size = targetShip.length;
    if (direction === "vertical") {
        for (let i = 0; i < size; i++) {
            board[xCoord + i][yCoord].occupied = true;
            board[xCoord + i][yCoord].ship = targetShip.type;
        }
    } else {
        for (let i = 0; i < size; i++) {
            board[xCoord][yCoord + i].occupied = true;
            board[xCoord][yCoord + i].shipName = targetShip.type;
        }
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
    boardSize,
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
