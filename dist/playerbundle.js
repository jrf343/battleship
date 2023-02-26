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

eval("const ship = __webpack_require__(/*! ./ship */ \"./src/factories/ship.js\");\n\nconst gameboardFactory = () => {\n  const shipArray = [\n    ship.shipFactory(\"carrier\"),\n    ship.shipFactory(\"battleship\"),\n    ship.shipFactory(\"submarine\"),\n    ship.shipFactory(\"cruiser\"),\n    ship.shipFactory(\"patrolBoat\"),\n  ];\n\n  const boardSize = 10;\n  let liveShips = { value: shipArray.length };\n\n  let board = [];\n  for (let i = 0; i < boardSize; i++) {\n    board[i] = [];\n    for (let j = 0; j < boardSize; j++) {\n      board[i].push({\n        occupied: false,\n        miss: false,\n        shot: false,\n        shipName: \"\",\n      });\n    }\n  }\n\n  const placeShip = (shipType, xCoord, yCoord, direction) => {\n    const targetShip = shipArray.find(\n      (targetShip) => targetShip.type === shipType\n    );\n    const size = targetShip.length;\n\n    if (checkBoundary(size, xCoord, yCoord, direction) === false) {\n      throw new Error(\"Impossible placement: off board\");\n    } else if (checkOverlap(size, xCoord, yCoord, direction) === false) {\n      throw new Error(\"Impossible placement: overlapping ships\");\n    } else {\n      if (direction === \"north\") {\n        for (let i = 0; i < size; i++) {\n          board[xCoord + i][yCoord].occupied = true;\n          board[xCoord + i][yCoord].ship = targetShip.type;\n        }\n      } else if (direction === \"south\") {\n        for (let i = 0; i < size; i++) {\n          board[xCoord - i][yCoord].occupied = true;\n          board[xCoord - i][yCoord].shipName = targetShip.type;\n        }\n      } else if (direction === \"east\") {\n        for (let i = 0; i < size; i++) {\n          board[xCoord][yCoord - i].occupied = true;\n          board[xCoord][yCoord - i].shipName = targetShip.type;\n        }\n      } else {\n        for (let i = 0; i < size; i++) {\n          board[xCoord][yCoord + i].occupied = true;\n          board[xCoord][yCoord + i].shipName = targetShip.type;\n        }\n      }\n    }\n  };\n\n  const checkBoundary = (size, xCoord, yCoord, direction) => {\n    if (direction === \"north\" && xCoord + size > 9) {\n      return false;\n    } else if (direction === \"south\" && xCoord - size < 0) {\n      return false;\n    } else if (direction === \"east\" && yCoord - size < 0) {\n      return false;\n    } else if (direction === \"west\" && yCoord + size > 9) {\n      return false;\n    } else {\n      return true;\n    }\n  };\n\n  const checkOverlap = (size, xCoord, yCoord, direction) => {\n    if (direction === \"north\") {\n      for (let i = 0; i < size; i++) {\n        if (board[xCoord + i][yCoord].occupied === true) {\n          return false;\n        }\n      }\n    } else if (direction === \"south\") {\n      for (let i = 0; i < size; i++) {\n        if (board[xCoord - i][yCoord].occupied === true) {\n          return false;\n        }\n      }\n    } else if (direction === \"east\") {\n      for (let i = 0; i < size; i++) {\n        if (board[xCoord][yCoord - i].occupied === true) {\n          return false;\n        }\n      }\n    } else if (direction === \"west\") {\n      for (let i = 0; i < size; i++) {\n        if (board[xCoord][yCoord + i].occupied === true) {\n          return false;\n        }\n      }\n    } else {\n      return true;\n    }\n  };\n\n  const recieveAttack = (xCoord, yCoord) => {\n    board[xCoord][yCoord].shot = true;\n    if (board[xCoord][yCoord].occupied === true) {\n      const targetShip = shipArray.find(\n        (targetShip) => targetShip.type === board[xCoord][yCoord].shipName\n      );\n      targetShip.hit();\n      if (targetShip.isSunk()) {\n        console.log(targetShip.type + \" is dead\");\n        liveShips.value--;\n        shipReport();\n      }\n    } else {\n      board[xCoord][yCoord].miss = true;\n    }\n  };\n\n  const shipReport = () => {\n    if (liveShips.value === 0) {\n      console.log(\"Game over!\");\n    } else {\n      console.log(\"Ships remaining: \" + liveShips.value);\n    }\n  };\n\n  return {\n    placeShip,\n    recieveAttack,\n\n    get getBoard() {\n      return board;\n    },\n  };\n};\n\nmodule.exports = {\n  gameboardFactory,\n};\n\n\n//# sourceURL=webpack://jest-demo/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/player.js":
/*!*********************************!*\
  !*** ./src/factories/player.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const gameboard = __webpack_require__(/*! ./gameboard */ \"./src/factories/gameboard.js\");\n\nconst playerFactory = (name) => {\n  const board = gameboard.gameboardFactory();\n\n  const getPlayer = () => name;\n\n  const attack = (xCoord, yCoord, opponent) => {\n    if (opponent.board.getBoard[xCoord][yCoord].shot === true) {\n      throw new Error(\"Already shot here! Try again.\");\n    } else {\n      opponent.board.recieveAttack(xCoord, yCoord);\n    }\n  };\n\n  return {\n    board,\n    getPlayer,\n    attack,\n  };\n};\n\nmodule.exports = {\n  playerFactory,\n};\n\n\n//# sourceURL=webpack://jest-demo/./src/factories/player.js?");

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((module) => {

eval("const shipFactory = (shipType) => {\n  const shipTypes = {\n    carrier: {\n      length: 5,\n    },\n    battleship: {\n      length: 4,\n    },\n    submarine: {\n      length: 3,\n    },\n    cruiser: {\n      length: 3,\n    },\n    patrolBoat: {\n      length: 2,\n    },\n  };\n\n  const type = shipType;\n  const length = shipTypes[type].length;\n  let hits = { value: 0 };\n\n  const hit = () => {\n    hits.value++;\n  };\n\n  const isSunk = () => {\n    if (hits.value === length) {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  return {\n    type,\n    length,\n    hits,\n    hit,\n    isSunk,\n  };\n};\n\nmodule.exports = {\n  shipFactory,\n  \n};\n\n\n//# sourceURL=webpack://jest-demo/./src/factories/ship.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/factories/player.js");
/******/ 	
/******/ })()
;