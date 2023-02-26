const shipFactory = require('./shipFactory');

const gameboardFactory = () => {
    const shipArray = [
        shipFactory.shipFactory('carrier'),
        shipFactory.shipFactory('battleship'),
        shipFactory.shipFactory('submarine'),
        shipFactory.shipFactory('cruiser'),
        shipFactory.shipFactory('patrolBoat'),
    ]

    const boardSize = 10;
    const liveShips = {value: shipArray.length};

    let board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for(let j = 0; j < boardSize; j++) {
            board[i].push({
                occupied: false,
                miss: false,
                ship: '',
            })
        }
    }

    const getBoard = () => board;

    const placeShip = (shipType, xCoord, yCoord, direction) => {
        const ship = (shipArray.find(ship => ship.type === shipType));
        const size = ship.length;

        const boundaryCheck = checkBoundary(size, xCoord, yCoord, direction);
        if (boundaryCheck === false) {
            return console.error('Impossible placement: off board');
        }

        const overlapCheck = checkOverlap(size, xCoord, yCoord, direction);
        if (overlapCheck === false) {
            return console.error('Impossible placement: overlapping ships');
        } 

        if (direction === 'north') {
            for (let i = 0; i < size; i++) {
                board[xCoord+i][yCoord].occupied = true;
                board[xCoord+i][yCoord].ship = ship;
            }
        } else if (direction === 'south') {
            for (let i = 0; i < size; i++) {
                board[xCoord-i][yCoord].occupied = true;
                board[xCoord-i][yCoord].ship = ship;
            }
        } else if (direction === 'east') {
            for (let i = 0; i < size; i++) {
                board[xCoord][yCoord-i].occupied = true;
                board[xCoord][yCoord-i].ship = ship;
            }
        } else {
            for (let i = 0; i < size; i++) {
                board[xCoord][yCoord+i].occupied = true;
                board[xCoord][yCoord+i].ship = ship;
            }
        }
    } 

    const checkBoundary = (size, xCoord, yCoord, direction) => {
        if (direction === 'north' && (xCoord + size > 9)) {
            return false;
        } else if (direction === 'south' && (xCoord - size < 0)) {
            return false;
        } else if (direction === 'east' && (yCoord - size < 0)) {
            return false;
        } else if (direction === 'west' && (yCoord + size > 9)) {
            return false;
        } else {
            return true;
        }
    }

    const checkOverlap = (size, xCoord, yCoord, direction) => {
        if (direction === 'north') {
            for (let i = 0; i < size; i++) {
                if (board[xCoord+i][yCoord].occupied === true) {
                    return false;
                }
            }
        } else if (direction === 'south') {
            for (let i = 0; i < size; i++) {
                if (board[xCoord-i][yCoord].occupied === true) {
                    return false;
                }
            }
        } else if (direction === 'east') {
            for (let i = 0; i < size; i++) {
                if (board[xCoord][yCoord-i].occupied === true) {
                    return false;
                }
            }
        } else if (direction === 'west') {
            for (let i = 0; i < size; i++) {
                if (board[xCoord][yCoord+i].occupied === true) {
                    return false;
                }
            }
        } else {
            return true;
        }
    }

    const recieveAttack = (xCoord, yCoord) => {
        if (board[xCoord][yCoord].occupied === true) {
            const ship = board[xCoord][yCoord].ship;
            ship.hit();
            if (ship.isSunk()) {
                console.log(ship.type + ' is dead');
                liveShips.value--;
                shipReport();
            }
        } else {
            board[xCoord][yCoord].miss = true;
        }
    }

    const shipReport = () => {
        if (liveShips.value === 0) {
            console.log('Game over!');
        } else {
            console.log('Ships remaining: ' + liveShips.value);
        }
    }

    return {
        getBoard,
        placeShip,
        recieveAttack,

    }

}

module.exports = { 
    gameboardFactory
    
  }
