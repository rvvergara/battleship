/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/factories/gameBoard.js":
/*!***************************************!*\
  !*** ./src/js/factories/gameBoard.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const GameBoard = ships => ({\n  grid: new Array(100),\n\n  setShipPosition(ship, index, orientation) {\n    const limit = orientation === 'horizontal' ? index + ship.length : index + 10 * ship.length;\n    ship.position = ship.position || [];\n\n    for (let i = index; i < limit;) {\n      if (this.grid[i] === undefined) {\n        ship.position.push(i);\n        this.grid[i] = i;\n        orientation === 'horizontal' ? i += 1 : i += 10;\n      } else {\n        this.grid[i - 1] = undefined;\n        ship.position.pop();\n        return;\n      }\n    }\n  },\n\n  receiveAttack(index, method) {\n    // Determine if the index in grid is occupied\n    if (this.grid[index] !== undefined) {\n      // If yes then determine the ship that occupies it\n      Object.keys(ships).forEach(key => {\n        if (ships[key].position.includes(index)) ships[key][method]();\n      });\n    } else {\n      // Else update the grid to reflect a missed shot\n      this.grid[index] = \"*\";\n    }\n  },\n\n  allShipsSunk(isSunkMethod) {\n    return Object.keys(ships).every(key => ships[key][isSunkMethod]());\n  }\n\n});\n\nmodule.exports = GameBoard;\n\n//# sourceURL=webpack:///./src/js/factories/gameBoard.js?");

/***/ }),

/***/ "./src/js/factories/player.js":
/*!************************************!*\
  !*** ./src/js/factories/player.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = (board, boardMethod, shipMethod) => ({\n  turn(index) {\n    board[boardMethod](index, shipMethod);\n  }\n\n});\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/js/factories/player.js?");

/***/ }),

/***/ "./src/js/factories/ship.js":
/*!**********************************!*\
  !*** ./src/js/factories/ship.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Ship = length => ({\n  length,\n  position: [],\n  hits: 0,\n\n  hit() {\n    this.isSunk() ? undefined : this.hits += 1;\n  },\n\n  isSunk() {\n    return this.hits >= this.length;\n  }\n\n});\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/js/factories/ship.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mainGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainGame */ \"./src/js/mainGame.js\");\n// const mainGame = require('./mainGame');\n\nconst {\n  humanBoard,\n  computerBoard,\n  human,\n  computer\n} = Object(_mainGame__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().battleShipObjs;\nObject(_mainGame__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().gameTurn(1, human, computer, humanBoard, computerBoard);\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/mainGame.js":
/*!****************************!*\
  !*** ./src/js/mainGame.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Ship = __webpack_require__(/*! ./factories/ship */ \"./src/js/factories/ship.js\");\n\nconst GameBoard = __webpack_require__(/*! ./factories/gameBoard */ \"./src/js/factories/gameBoard.js\");\n\nconst Player = __webpack_require__(/*! ./factories/player */ \"./src/js/factories/player.js\");\n\nconst {\n  computerMakeChoice\n} = __webpack_require__(/*! ./mixins/playerMixin */ \"./src/js/mixins/playerMixin.js\");\n\nconst mainGame = () => {\n  const battleShipObjs = ((Ship, GameBoard, Player) => {\n    const fleet = {\n      cruiser1: Ship(1),\n      frigate1: Ship(2),\n      destroyer1: Ship(3),\n      carrier: Ship(4)\n    };\n    const humanFleet = Object.assign({}, fleet);\n    const computerFleet = Object.assign({}, fleet); // 2. Create two gameBoards\n\n    const humanBoard = GameBoard(humanFleet);\n    const computerBoard = GameBoard(computerFleet); // 3. Create two players\n\n    const human = Object.assign(Player(computerBoard, 'receiveAttack', 'hit'));\n    const computer = Object.assign(Player(humanBoard, 'receiveAttack', 'hit'), {\n      makeChoice: computerMakeChoice\n    }); // Position ships for Player1\n\n    humanBoard.setShipPosition(humanFleet.cruiser1, 0, 'vertical');\n    humanBoard.setShipPosition(humanFleet.frigate1, 2, 'vertical');\n    humanBoard.setShipPosition(humanFleet.destroyer1, 4, 'vertical');\n    humanBoard.setShipPosition(humanFleet.carrier, 6, 'vertical'); // Position ships for Player2\n\n    computerBoard.setShipPosition(computerFleet.cruiser1, 0, 'vertical');\n    computerBoard.setShipPosition(computerFleet.frigate1, 2, 'vertical');\n    computerBoard.setShipPosition(computerFleet.destroyer1, 4, 'vertical');\n    computerBoard.setShipPosition(humanFleet.carrier, 6, 'vertical');\n    return {\n      humanBoard,\n      computerBoard,\n      human,\n      computer\n    };\n  })(Ship, GameBoard, Player);\n\n  const gameTurn = (index, humanPlayer, computerPlayer, humanBoard, computerBoard) => {\n    console.log(humanBoard.grid); // humanPlayer turn(index) gets called\n\n    humanPlayer.turn(index); // if computer's gameBoard is still alive then computerPlayer turn(computerPlayer.makeChoice()) gets called\n\n    if (!computerBoard.allShipsSunk('isSunk')) computerPlayer.turn(computerPlayer.makeChoice(humanBoard)); // check if someone has won\n  };\n\n  return {\n    gameTurn,\n    battleShipObjs\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mainGame);\n\n//# sourceURL=webpack:///./src/js/mainGame.js?");

/***/ }),

/***/ "./src/js/mixins/playerMixin.js":
/*!**************************************!*\
  !*** ./src/js/mixins/playerMixin.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const playerMixin = (() => ({\n  computerMakeChoice(arr) {\n    // While Math.round(Math.random()*arr.length) is occupied keep selecting\n    return Math.round(Math.random() * (arr.length - 1));\n  }\n\n}))();\n\nmodule.exports = playerMixin;\n\n//# sourceURL=webpack:///./src/js/mixins/playerMixin.js?");

/***/ })

/******/ });