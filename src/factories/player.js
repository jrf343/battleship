const gameboard = require("./gameboard");

const playerFactory = (name) => {
  const board = gameboard.gameboardFactory();

  const getPlayer = () => name;

  const attack = (xCoord, yCoord, opponent) => {
    if (opponent.board.getBoard[xCoord][yCoord].shot === true) {
      throw new Error("Already shot here! Try again.");
    } else {
      opponent.board.recieveAttack(xCoord, yCoord);
    }
  };

  return {
    board,
    getPlayer,
    attack,
  };
};

module.exports = {
  playerFactory,
};
