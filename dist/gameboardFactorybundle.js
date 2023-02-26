/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const shipFactory = __webpack_require__(/*! ./ship */ \"./src/factories/ship.js\");\n\nconst gameboardFactory = () => {\n    const shipArray = [\n        shipFactory.shipFactory('carrier'),\n        shipFactory.shipFactory('battleship'),\n        shipFactory.shipFactory('submarine'),\n        shipFactory.shipFactory('cruiser'),\n        shipFactory.shipFactory('patrolBoat'),\n    ]\n\n    const boardSize = 10;\n    const liveShips = {value: shipArray.length};\n\n    let board = [];\n    for (let i = 0; i < boardSize; i++) {\n        board[i] = [];\n        for(let j = 0; j < boardSize; j++) {\n            board[i].push({\n                occupied: false,\n                miss: false,\n                ship: '',\n            })\n        }\n    }\n\n    const getBoard = () => board;\n\n    const placeShip = (shipType, xCoord, yCoord, direction) => {\n        const ship = (shipArray.find(ship => ship.type === shipType));\n        const size = ship.length;\n\n        const boundaryCheck = checkBoundary(size, xCoord, yCoord, direction);\n        if (boundaryCheck === false) {\n            return console.error('Impossible placement: off board');\n        }\n\n        const overlapCheck = checkOverlap(size, xCoord, yCoord, direction);\n        if (overlapCheck === false) {\n            return console.error('Impossible placement: overlapping ships');\n        } \n\n        if (direction === 'north') {\n            for (let i = 0; i < size; i++) {\n                board[xCoord+i][yCoord].occupied = true;\n                board[xCoord+i][yCoord].ship = ship;\n            }\n        } else if (direction === 'south') {\n            for (let i = 0; i < size; i++) {\n                board[xCoord-i][yCoord].occupied = true;\n                board[xCoord-i][yCoord].ship = ship;\n            }\n        } else if (direction === 'east') {\n            for (let i = 0; i < size; i++) {\n                board[xCoord][yCoord-i].occupied = true;\n                board[xCoord][yCoord-i].ship = ship;\n            }\n        } else {\n            for (let i = 0; i < size; i++) {\n                board[xCoord][yCoord+i].occupied = true;\n                board[xCoord][yCoord+i].ship = ship;\n            }\n        }\n    } \n\n    const checkBoundary = (size, xCoord, yCoord, direction) => {\n        if (direction === 'north' && (xCoord + size > 9)) {\n            return false;\n        } else if (direction === 'south' && (xCoord - size < 0)) {\n            return false;\n        } else if (direction === 'east' && (yCoord - size < 0)) {\n            return false;\n        } else if (direction === 'west' && (yCoord + size > 9)) {\n            return false;\n        } else {\n            return true;\n        }\n    }\n\n    const checkOverlap = (size, xCoord, yCoord, direction) => {\n        if (direction === 'north') {\n            for (let i = 0; i < size; i++) {\n                if (board[xCoord+i][yCoord].occupied === true) {\n                    return false;\n                }\n            }\n        } else if (direction === 'south') {\n            for (let i = 0; i < size; i++) {\n                if (board[xCoord-i][yCoord].occupied === true) {\n                    return false;\n                }\n            }\n        } else if (direction === 'east') {\n            for (let i = 0; i < size; i++) {\n                if (board[xCoord][yCoord-i].occupied === true) {\n                    return false;\n                }\n            }\n        } else if (direction === 'west') {\n            for (let i = 0; i < size; i++) {\n                if (board[xCoord][yCoord+i].occupied === true) {\n                    return false;\n                }\n            }\n        } else {\n            return true;\n        }\n    }\n\n    const recieveAttack = (xCoord, yCoord) => {\n        if (board[xCoord][yCoord].occupied === true) {\n            const ship = board[xCoord][yCoord].ship;\n            ship.hit();\n            if (ship.isSunk()) {\n                console.log(ship.type + ' is dead');\n                liveShips.value--;\n                shipReport();\n            }\n        } else {\n            board[xCoord][yCoord].miss = true;\n        }\n    }\n\n    const shipReport = () => {\n        if (liveShips.value === 0) {\n            console.log('Game over!');\n        } else {\n            console.log('Ships remaining: ' + liveShips.value);\n        }\n    }\n\n    return {\n        getBoard,\n        placeShip,\n        recieveAttack,\n\n    }\n\n}\n\nmodule.exports = { \n    gameboardFactory\n    \n  }\n\n\n//# sourceURL=webpack://jest-demo/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("const shipFactory = (shipType) => {\n  const shipTypes = {\n    carrier: {\n      length: 5,\n    },\n    battleship: {\n      length: 4,\n    },\n    submarine: {\n      length: 3,\n    },\n    cruiser: {\n      length: 3,\n    },\n    patrolBoat: {\n      length: 2,\n    },\n  };\n\n  const type = shipType;\n  const length = shipTypes[type].length;\n  let hits = {value: 0};\n\n  const hit = () => {\n    hits.value ++;\n  }\n\n  const isSunk = () => {\n    if (hits.value === length) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  return { \n    type,\n    length,\n    hits,\n    hit,\n    isSunk,\n  }\n\n}\n\nmodule.exports = { \n  shipFactory\n  \n}\n\n//# sourceURL=webpack://jest-demo/./src/factories/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/factories/gameboard.js");
/******/ 	
/******/ })()
;