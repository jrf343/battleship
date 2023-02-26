/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./src/factories/ship.js":
      /*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
      /***/ (module) => {
        eval(
          "const shipFactory = (shipType) => {\n  const shipTypes = {\n    carrier: {\n      length: 5,\n    },\n    battleship: {\n      length: 4,\n    },\n    submarine: {\n      length: 3,\n    },\n    cruiser: {\n      length: 3,\n    },\n    patrolBoat: {\n      length: 2,\n    },\n  };\n\n  const type = shipType;\n  const length = shipTypes[type].length;\n  let hits = { value: 0 };\n\n  const hit = () => {\n    hits.value++;\n  };\n\n  const isSunk = () => {\n    if (hits.value === length) {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  return {\n    type,\n    length,\n    hits,\n    hit,\n    isSunk,\n  };\n};\n\nmodule.exports = {\n  shipFactory,\n  \n};\n\n\n//# sourceURL=webpack://jest-demo/./src/factories/ship.js?"
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module is referenced by other modules so it can't be inlined
  /******/ var __webpack_exports__ = __webpack_require__(
    "./src/factories/ship.js"
  );
  /******/
  /******/
})();
