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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _board = __webpack_require__(2);

var _player = __webpack_require__(3);

var _ai = __webpack_require__(4);

__webpack_require__(5);

function main() {

	var table = board.getBoard();

	config.addEventListener('change', function (_ref) {
		var value = _ref.target.value;

		config.disabled = true;
		process(value !== 'multiplayer');
	});

	var process = function process(minimax) {
		turn.innerHTML = title + game.getTurnName();

		table.forEach(function (row, i) {
			row.forEach(function (col, j) {

				document.getElementById('box' + i + '_' + j).onclick = function (e) {
					config.disabled = true;

					var target = e.target || e.srcElement;
					var position = target.id.substr(target.id.length - 3, 3).split('_');

					turn.innerHTML = title + game.getTurnName();

					if (game.canPlay()) {

						if (game.draw(position)) {
							game.changeTurn();
							turn.innerHTML = title + game.getTurnName();
						}

						if (game.getWinner(board)) {
							game.printMessage('Ha ganado ' + game.getWinnerPlayer().getName(), 150, reset);
						}

						if (!game.canPlay() && !game.getWinner(board)) {
							game.printMessage('Empate', 150, reset);
						}

						if (minimax) {
							if (game.canPlay() && game.getTurnColor() === 'red' && aiPlayer.playAI()) {
								game.changeTurn();
								turn.innerHTML = title + game.getTurnName();
							}

							if (game.getWinner(board)) {
								game.printMessage('Ha ganado ' + game.getWinnerPlayer().getName(), 150, reset);
							}
						}
					}
				};
			});
		});
	};
};

//Reset the board and new game
function reset() {
	board.reset();
	game = new _game.Game(adrian, player2, board);
	aiPlayer = new _ai.AI(game, board, player2, adrian.getColor());
	config.disabled = false;
	turn.innerHTML = title + adrian.getName();
}

// Config
var turn = document.getElementById("turn");
var config = document.getElementById("config");
var title = "Turno de ";

//Players
var adrian = new _player.Player("Adrian", "green");
var player2 = new _player.Player("Player 2", "red");

//Board
var board = new _board.Board();

//Game
var game = new _game.Game(adrian, player2, board);

// Initialize Player2 as AI player
var aiPlayer = new _ai.AI(game, board, player2, adrian.getColor());

//Main
main();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
	function Game(player1, player2, board) {
		_classCallCheck(this, Game);

		this.players = [].concat(Array.prototype.slice.call(arguments));
		this.turnColor = player1.getColor();
		this.turnName = player1.getName();
		this.board = board;
		this.colorWinner = '';
		this.colorMemoryWinner = '';
		this.turnCount = 0;
	}

	_createClass(Game, [{
		key: 'getTurnColor',
		value: function getTurnColor() {
			return this.turnColor;
		}
	}, {
		key: 'getTurnName',
		value: function getTurnName() {
			return this.turnName;
		}
	}, {
		key: 'getTurnCount',
		value: function getTurnCount() {
			return this.turnCount;
		}

		/*
   * Change the game's turn
   */

	}, {
		key: 'changeTurn',
		value: function changeTurn() {
			this.turnColor === this.players[0].getColor() ? this.turnColor = this.players[1].getColor() : this.turnColor = this.players[0].getColor();
			this.turnName === this.players[0].getName() ? this.turnName = this.players[1].getName() : this.turnName = this.players[0].getName();
			this.turnCount++;
		}

		/**
   * Play the tab
   * @param {*} position 
   */

	}, {
		key: 'draw',
		value: function draw(position) {
			if (!this.board.isPlayed(position)) {
				return this.board.play(position, this.turnColor);
			}
			return false;
		}

		/*
   * Check out if there is space to play
   */

	}, {
		key: 'canPlay',
		value: function canPlay() {
			return this.board.isEmpty();
		}

		/**
   * Check out if there is a winner
   * @param {*} board 
   * @param {*} real 
   */

	}, {
		key: 'getWinner',
		value: function getWinner(board) {
			var _this = this;

			var real = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			return board.hasWinner(function (winner) {
				real ? _this.colorWinner = winner : _this.colorMemoryWinner = winner;
				return true;
			});
		}

		/**
   * Get the winner
   * @param {*} real 
   */

	}, {
		key: 'getWinnerPlayer',
		value: function getWinnerPlayer() {
			var _this2 = this;

			var real = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return this.players.find(function (player) {
				var color = real ? _this2.colorWinner : _this2.colorMemoryWinner;
				return player.color === color;
			});
		}

		/**
   * Shows up an alert
   * @param {*} msg 
   * @param {*} timeout 
   */

	}, {
		key: 'printMessage',
		value: function printMessage(msg, timeout, reset) {
			setTimeout(function () {
				alert(msg);
				reset();
			}, timeout);
		}
	}]);

	return Game;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board() {
		var table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		_classCallCheck(this, Board);

		if (table === null) {
			this.table = [[null, null, null], [null, null, null], [null, null, null]];
		} else {
			this.table = table;
		}
	}

	/**
  * Play the tab in the board and change the styles
  * @param {*} position 
  * @param {*} value 
  * @param {*} pos 
  */


	_createClass(Board, [{
		key: 'play',
		value: function play(position, value) {
			var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : position[0] + '_' + position[1];


			var tab = document.getElementById(pos).style;

			this.table[position[0]][position[1]] = value;
			tab.backgroundColor = value;
			tab.borderRadius = '50%';

			return true;
		}

		/**
   * Play the tab in memory
   * @param {*} position 
   * @param {*} value 
   * @param {*} pos 
   */

	}, {
		key: 'playMemory',
		value: function playMemory(position, value) {
			var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : position[0] + '_' + position[1];

			this.table[position[0]][position[1]] = value;
			return true;
		}

		/*
   * Reset the board 
   */

	}, {
		key: 'reset',
		value: function reset() {
			this.table = [[null, null, null], [null, null, null], [null, null, null]];

			this.table.forEach(function (row, i) {
				row.forEach(function (col, j) {
					var tab = document.getElementById(i + '_' + j).style;
					tab.backgroundColor = "#eef1ed";
					tab.borderRadius = '0%';
				});
			});
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this.table);
		}

		/*
   * Check if there is any space to play
   */

	}, {
		key: 'isEmpty',
		value: function isEmpty() {
			return this.table.some(function (row) {
				return row.some(function (pos) {
					return pos === null;
				});
			});
		}
	}, {
		key: 'getBoard',
		value: function getBoard() {
			return this.table;
		}

		/**
   * Clone the board
   */

	}, {
		key: 'cloneBoard',
		value: function cloneBoard() {
			var newArray = this.table.map(function (arr) {
				return arr.slice();
			});

			return new Board(newArray);
		}

		/**
   * Get the available moves
   */

	}, {
		key: 'getAvailableMoves',
		value: function getAvailableMoves() {
			var moves = [];

			this.table.forEach(function (row, i) {
				row.forEach(function (pos, j) {
					if (pos === null) {
						moves.push([i, j]);
					}
				});
			});

			return moves;
		}

		/**
   * Check out if a positions is played
   * @param {*} position 
   */

	}, {
		key: 'isPlayed',
		value: function isPlayed(position) {
			return !(this.table[position[0]][position[1]] === null);
		}

		/**
   * Algorithm
   * @param {*} winner callback
   */

	}, {
		key: 'hasWinner',
		value: function hasWinner(winner) {
			var _this = this;

			return this.table.some(function (row, i) {
				return row.some(function (col, j) {

					var element = _this.table[i][j];

					if (element != null) {

						//ToDo: rewrite algorithm

						//Row winner
						if (row.every(function (elem) {
							return elem === element;
						})) return winner(element);

						//Column winner
						if (element === _this.table[0][j] && element === _this.table[1][j] && element === _this.table[2][j]) return winner(element);

						if (i === 0 && j === 0) if (element === _this.table[2][2] && element === _this.table[1][1]) return winner(element);

						if (i === 0 && j === 2) if (element === _this.table[1][1] && element === _this.table[2][0]) return winner(element);

						if (i === 1 && j === 1) if (element === _this.table[0][0] && element === _this.table[2][2]) return winner(element);

						if (i === 2 && j === 0) if (element === _this.table[1][1] && element === _this.table[0][2]) return winner(element);

						if (i === 2 && j === 2) if (element === _this.table[1][1] && element === _this.table[0][0]) return winner(element);
					}
				});
			});
		}
	}]);

	return Board;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
	function Player(name, color) {
		_classCallCheck(this, Player);

		this.name = name;
		this.color = color;
	}

	_createClass(Player, [{
		key: "getColor",
		value: function getColor() {
			return this.color;
		}
	}, {
		key: "getName",
		value: function getName() {
			return this.name;
		}
	}]);

	return Player;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AI = exports.AI = function () {
    function AI(game, board, aiPlayer, opponent) {
        _classCallCheck(this, AI);

        this.game = game;
        this.board = board;
        this.aiPlayer = aiPlayer;
        this.opponent = opponent;
    }

    _createClass(AI, [{
        key: 'playAI',
        value: function playAI() {
            return this.game.draw(this.getBestMove(this.board.cloneBoard()));
        }

        /**
         * Get the best move
         * @param {*} board 
         */

    }, {
        key: 'getBestMove',
        value: function getBestMove(board) {
            var _this = this;

            var bestScore = -100;
            var currentScore = void 0;
            var bestMove = void 0;

            var moves = board.getAvailableMoves();
            var corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
            var turn = this.game.getTurnCount();

            if (turn === 0) {
                return [1, 1];
            } else if (turn === 1 && !board.isPlayed([1, 1])) {
                return [1, 1];
            } else if (turn === 1) {
                return corners.find(function (corner) {
                    return !board.isPlayed(corner);
                });
            }

            moves.forEach(function (move) {
                var newBoard = board.cloneBoard();
                newBoard.playMemory(move, _this.aiPlayer.color);
                currentScore = _this.minimax(newBoard, false);
                if (currentScore > bestScore) {
                    bestScore = currentScore;
                    bestMove = move;
                }
            });

            return bestMove;
        }

        /**
         * Minimax algorithm
         * @param {*} board 
         * @param {*} maximizing 
         * @param {*} depth 
         */

    }, {
        key: 'minimax',
        value: function minimax(board) {
            var _this2 = this;

            var maximizing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var winner = this.game.getWinner(board, false);

            if (!board.isEmpty()) {
                if (!winner) {
                    return 0;
                } else {
                    if (this.game.getWinnerPlayer(false).getColor() === 'red') {
                        return 100 - depth;
                    } else {
                        return -100 + depth;
                    }
                }
            }

            if (winner) {
                if (this.game.getWinnerPlayer(false).getColor() === 'red') {
                    return 100 - depth;
                } else {
                    return -100 + depth;
                }
            }

            var currentScore = 0;
            var moves = board.getAvailableMoves();

            // Maximazing
            if (maximizing) {
                var bestScore = -100;
                moves.forEach(function (move) {
                    var newBoard = board.cloneBoard();
                    newBoard.playMemory(move, _this2.aiPlayer.color);
                    currentScore = _this2.minimax(newBoard, false, depth++);
                    if (currentScore > bestScore) {
                        bestScore = currentScore;
                    }
                });
                return bestScore;
            }

            // Minimazing
            if (!maximizing) {
                var _bestScore = 100;
                moves.forEach(function (move) {
                    var newBoard = board.cloneBoard();
                    newBoard.playMemory(move, _this2.opponent);
                    currentScore = _this2.minimax(newBoard, true, depth++);
                    if (currentScore < _bestScore) {
                        _bestScore = currentScore;
                    }
                });
                return _bestScore;
            }
        }
    }]);

    return AI;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./styles.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// imports


// module
exports.push([module.i, ".container__title {\n  text-align: center;\n  font-family: sans-serif; }\n\n.container__board {\n  margin: 0 auto;\n  width: 45vh;\n  text-align: center;\n  box-shadow: 0 0 5px black;\n  height: 45vh;\n  background-color: #eef1ed; }\n  .container__board .box {\n    width: 15vh;\n    height: 15vh;\n    box-shadow: 0 0 0px 1px black;\n    float: left; }\n    .container__board .box div {\n      width: 90%;\n      height: 90%;\n      margin: 0 auto;\n      margin-top: 1vh; }\n\n.container__config {\n  text-align: center;\n  padding-top: 3rem; }\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTkyY2M3MzgwNjI1NmIwODA5MGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2FpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzP2JkM2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbIm1haW4iLCJ0YWJsZSIsImJvYXJkIiwiZ2V0Qm9hcmQiLCJjb25maWciLCJhZGRFdmVudExpc3RlbmVyIiwidmFsdWUiLCJ0YXJnZXQiLCJkaXNhYmxlZCIsInByb2Nlc3MiLCJtaW5pbWF4IiwidHVybiIsImlubmVySFRNTCIsInRpdGxlIiwiZ2FtZSIsImdldFR1cm5OYW1lIiwiZm9yRWFjaCIsInJvdyIsImkiLCJjb2wiLCJqIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm9uY2xpY2siLCJlIiwic3JjRWxlbWVudCIsInBvc2l0aW9uIiwiaWQiLCJzdWJzdHIiLCJsZW5ndGgiLCJzcGxpdCIsImNhblBsYXkiLCJkcmF3IiwiY2hhbmdlVHVybiIsImdldFdpbm5lciIsInByaW50TWVzc2FnZSIsImdldFdpbm5lclBsYXllciIsImdldE5hbWUiLCJyZXNldCIsImdldFR1cm5Db2xvciIsImFpUGxheWVyIiwicGxheUFJIiwiR2FtZSIsImFkcmlhbiIsInBsYXllcjIiLCJBSSIsImdldENvbG9yIiwiUGxheWVyIiwiQm9hcmQiLCJwbGF5ZXIxIiwicGxheWVycyIsImFyZ3VtZW50cyIsInR1cm5Db2xvciIsInR1cm5OYW1lIiwiY29sb3JXaW5uZXIiLCJjb2xvck1lbW9yeVdpbm5lciIsInR1cm5Db3VudCIsImlzUGxheWVkIiwicGxheSIsImlzRW1wdHkiLCJyZWFsIiwiaGFzV2lubmVyIiwid2lubmVyIiwiZmluZCIsInBsYXllciIsImNvbG9yIiwibXNnIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJhbGVydCIsInBvcyIsInRhYiIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyUmFkaXVzIiwiY29uc29sZSIsImxvZyIsInNvbWUiLCJuZXdBcnJheSIsIm1hcCIsImFyciIsInNsaWNlIiwibW92ZXMiLCJwdXNoIiwiZWxlbWVudCIsImV2ZXJ5IiwiZWxlbSIsIm5hbWUiLCJvcHBvbmVudCIsImdldEJlc3RNb3ZlIiwiY2xvbmVCb2FyZCIsImJlc3RTY29yZSIsImN1cnJlbnRTY29yZSIsImJlc3RNb3ZlIiwiZ2V0QXZhaWxhYmxlTW92ZXMiLCJjb3JuZXJzIiwiZ2V0VHVybkNvdW50IiwiY29ybmVyIiwibmV3Qm9hcmQiLCJwbGF5TWVtb3J5IiwibW92ZSIsIm1heGltaXppbmciLCJkZXB0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNB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RUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU5MmNjNzM4MDYyNTZiMDgwOTBjIiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vbW9kdWxlcy9nYW1lJztcbmltcG9ydCB7IEJvYXJkIH0gZnJvbSAnLi9tb2R1bGVzL2JvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vbW9kdWxlcy9wbGF5ZXInO1xuaW1wb3J0IHsgQUkgfSBmcm9tICcuL21vZHVsZXMvYWknO1xuaW1wb3J0ICcuL3Njc3Mvc3R5bGVzLnNjc3MnO1xuXG5mdW5jdGlvbiBtYWluKCl7XG5cblx0Y29uc3QgdGFibGUgPSBib2FyZC5nZXRCb2FyZCgpO1xuXG5cdGNvbmZpZy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoeyB0YXJnZXQ6IHsgdmFsdWUgfSB9KSA9PiB7XG5cdFx0Y29uZmlnLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRwcm9jZXNzKHZhbHVlICE9PSAnbXVsdGlwbGF5ZXInKVxuXHR9KVxuXG5cdGNvbnN0IHByb2Nlc3MgPSAobWluaW1heCkgPT4ge1xuXHRcdHR1cm4uaW5uZXJIVE1MID0gdGl0bGUgKyBnYW1lLmdldFR1cm5OYW1lKCk7XG5cblx0XHR0YWJsZS5mb3JFYWNoKChyb3csIGkpID0+IHtcblx0XHRcdHJvdy5mb3JFYWNoKChjb2wsIGopID0+IHtcblxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYm94JHtpfV8ke2p9YCkub25jbGljayA9IChlKSA9PiB7XG5cdFx0XHRcdFx0Y29uZmlnLmRpc2FibGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHRcdFx0XHRjb25zdCBwb3NpdGlvbiA9IHRhcmdldC5pZC5zdWJzdHIodGFyZ2V0LmlkLmxlbmd0aCAtIDMsIDMpLnNwbGl0KCdfJyk7XG5cblx0XHRcdFx0XHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgZ2FtZS5nZXRUdXJuTmFtZSgpO1xuXG5cdFx0XHRcdFx0aWYgKGdhbWUuY2FuUGxheSgpKSB7XG5cblx0XHRcdFx0XHRcdGlmIChnYW1lLmRyYXcocG9zaXRpb24pKSB7XG5cdFx0XHRcdFx0XHRcdGdhbWUuY2hhbmdlVHVybigpO1xuXHRcdFx0XHRcdFx0XHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgZ2FtZS5nZXRUdXJuTmFtZSgpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoZ2FtZS5nZXRXaW5uZXIoYm9hcmQpKSB7XG5cdFx0XHRcdFx0XHRcdGdhbWUucHJpbnRNZXNzYWdlKGBIYSBnYW5hZG8gJHtnYW1lLmdldFdpbm5lclBsYXllcigpLmdldE5hbWUoKX1gLCAxNTAsIHJlc2V0KVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoIWdhbWUuY2FuUGxheSgpICYmICFnYW1lLmdldFdpbm5lcihib2FyZCkpIHtcblx0XHRcdFx0XHRcdFx0Z2FtZS5wcmludE1lc3NhZ2UoJ0VtcGF0ZScsIDE1MCwgcmVzZXQpXG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChtaW5pbWF4KSB7XG5cdFx0XHRcdFx0XHRcdGlmIChnYW1lLmNhblBsYXkoKSAmJiBnYW1lLmdldFR1cm5Db2xvcigpID09PSAncmVkJyAmJiBhaVBsYXllci5wbGF5QUkoKSkge1xuXHRcdFx0XHRcdFx0XHRcdGdhbWUuY2hhbmdlVHVybigpO1xuXHRcdFx0XHRcdFx0XHRcdHR1cm4uaW5uZXJIVE1MID0gdGl0bGUgKyBnYW1lLmdldFR1cm5OYW1lKCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZ2FtZS5nZXRXaW5uZXIoYm9hcmQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Z2FtZS5wcmludE1lc3NhZ2UoYEhhIGdhbmFkbyAke2dhbWUuZ2V0V2lubmVyUGxheWVyKCkuZ2V0TmFtZSgpfWAsIDE1MCwgcmVzZXQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxufTtcblxuLy9SZXNldCB0aGUgYm9hcmQgYW5kIG5ldyBnYW1lXG5mdW5jdGlvbiByZXNldCgpe1xuXHRib2FyZC5yZXNldCgpO1xuXHRnYW1lID0gbmV3IEdhbWUoYWRyaWFuLCBwbGF5ZXIyLCBib2FyZCk7XG5cdGFpUGxheWVyID0gbmV3IEFJKGdhbWUsIGJvYXJkLCBwbGF5ZXIyLCBhZHJpYW4uZ2V0Q29sb3IoKSk7XG5cdGNvbmZpZy5kaXNhYmxlZCA9IGZhbHNlO1xuXHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgYWRyaWFuLmdldE5hbWUoKTtcbn1cblxuLy8gQ29uZmlnXG5jb25zdCB0dXJuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0dXJuXCIpO1xuY29uc3QgY29uZmlnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maWdcIik7XG5jb25zdCB0aXRsZSA9IFwiVHVybm8gZGUgXCI7XG5cbi8vUGxheWVyc1xuY29uc3QgYWRyaWFuID0gbmV3IFBsYXllcihcIkFkcmlhblwiLCBcImdyZWVuXCIpO1xuY29uc3QgcGxheWVyMiA9IG5ldyBQbGF5ZXIoXCJQbGF5ZXIgMlwiLCBcInJlZFwiKTtcblxuLy9Cb2FyZFxuY29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoKTtcblxuLy9HYW1lXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGFkcmlhbiwgcGxheWVyMiwgYm9hcmQpO1xuXG4vLyBJbml0aWFsaXplIFBsYXllcjIgYXMgQUkgcGxheWVyXG5sZXQgYWlQbGF5ZXIgPSBuZXcgQUkoZ2FtZSwgYm9hcmQsIHBsYXllcjIsIGFkcmlhbi5nZXRDb2xvcigpKVxuXG4vL01haW5cbm1haW4oKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiXG5leHBvcnQgY2xhc3MgR2FtZSB7XG5cblx0Y29uc3RydWN0b3IocGxheWVyMSwgcGxheWVyMiwgYm9hcmQpIHtcblx0XHR0aGlzLnBsYXllcnMgPSBbLi4uYXJndW1lbnRzXTtcblx0XHR0aGlzLnR1cm5Db2xvciA9IHBsYXllcjEuZ2V0Q29sb3IoKTtcblx0XHR0aGlzLnR1cm5OYW1lID0gcGxheWVyMS5nZXROYW1lKCk7XG5cdFx0dGhpcy5ib2FyZCA9IGJvYXJkO1xuXHRcdHRoaXMuY29sb3JXaW5uZXIgPSAnJztcblx0XHR0aGlzLmNvbG9yTWVtb3J5V2lubmVyID0gJyc7XG5cdFx0dGhpcy50dXJuQ291bnQgPSAwO1xuXHR9XG5cblx0Z2V0VHVybkNvbG9yKCkge1xuXHRcdHJldHVybiB0aGlzLnR1cm5Db2xvcjtcblx0fVxuXG5cdGdldFR1cm5OYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLnR1cm5OYW1lO1xuXHR9XG5cblx0Z2V0VHVybkNvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLnR1cm5Db3VudDtcblx0fVxuXG5cdC8qXG5cdCAqIENoYW5nZSB0aGUgZ2FtZSdzIHR1cm5cblx0ICovXG5cdGNoYW5nZVR1cm4oKSB7XG5cdFx0dGhpcy50dXJuQ29sb3IgPT09IHRoaXMucGxheWVyc1swXS5nZXRDb2xvcigpID8gdGhpcy50dXJuQ29sb3IgPSB0aGlzLnBsYXllcnNbMV0uZ2V0Q29sb3IoKSA6IHRoaXMudHVybkNvbG9yID0gdGhpcy5wbGF5ZXJzWzBdLmdldENvbG9yKCk7XG5cdFx0dGhpcy50dXJuTmFtZSA9PT0gdGhpcy5wbGF5ZXJzWzBdLmdldE5hbWUoKSA/IHRoaXMudHVybk5hbWUgPSB0aGlzLnBsYXllcnNbMV0uZ2V0TmFtZSgpIDogdGhpcy50dXJuTmFtZSA9IHRoaXMucGxheWVyc1swXS5nZXROYW1lKCk7XG5cdFx0dGhpcy50dXJuQ291bnQrKztcblx0fVxuXG5cdC8qKlxuXHQgKiBQbGF5IHRoZSB0YWJcblx0ICogQHBhcmFtIHsqfSBwb3NpdGlvbiBcblx0ICovXG5cdGRyYXcocG9zaXRpb24pIHtcblx0XHRpZiAoIXRoaXMuYm9hcmQuaXNQbGF5ZWQocG9zaXRpb24pKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ib2FyZC5wbGF5KHBvc2l0aW9uLCB0aGlzLnR1cm5Db2xvcik7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qXG5cdCAqIENoZWNrIG91dCBpZiB0aGVyZSBpcyBzcGFjZSB0byBwbGF5XG5cdCAqL1xuXHRjYW5QbGF5KCkge1xuXHRcdHJldHVybiB0aGlzLmJvYXJkLmlzRW1wdHkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVjayBvdXQgaWYgdGhlcmUgaXMgYSB3aW5uZXJcblx0ICogQHBhcmFtIHsqfSBib2FyZCBcblx0ICogQHBhcmFtIHsqfSByZWFsIFxuXHQgKi9cblx0Z2V0V2lubmVyKGJvYXJkLCByZWFsID0gdHJ1ZSkge1xuXHRcdHJldHVybiBib2FyZC5oYXNXaW5uZXIoKHdpbm5lcikgPT4ge1xuXHRcdFx0cmVhbCA/IHRoaXMuY29sb3JXaW5uZXIgPSB3aW5uZXIgOiB0aGlzLmNvbG9yTWVtb3J5V2lubmVyID0gd2lubmVyO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSB3aW5uZXJcblx0ICogQHBhcmFtIHsqfSByZWFsIFxuXHQgKi9cblx0Z2V0V2lubmVyUGxheWVyKHJlYWwgPSB0cnVlKSB7XG5cdFx0cmV0dXJuIHRoaXMucGxheWVycy5maW5kKChwbGF5ZXIpID0+IHtcblx0XHRcdGNvbnN0IGNvbG9yID0gcmVhbCA/IHRoaXMuY29sb3JXaW5uZXIgOiB0aGlzLmNvbG9yTWVtb3J5V2lubmVyXG5cdFx0XHRyZXR1cm4gcGxheWVyLmNvbG9yID09PSBjb2xvclxuXHRcdH0pXG5cdH1cblxuXHQvKipcblx0ICogU2hvd3MgdXAgYW4gYWxlcnRcblx0ICogQHBhcmFtIHsqfSBtc2cgXG5cdCAqIEBwYXJhbSB7Kn0gdGltZW91dCBcblx0ICovXG5cdHByaW50TWVzc2FnZShtc2csIHRpbWVvdXQsIHJlc2V0KXtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGFsZXJ0KG1zZyk7XG5cdFx0XHRyZXNldCgpXG5cdFx0fSwgdGltZW91dCk7XG5cdH1cblxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsImV4cG9ydCBjbGFzcyBCb2FyZCB7XG5cblx0Y29uc3RydWN0b3IodGFibGUgPSBudWxsKSB7XG5cblx0XHRpZiAodGFibGUgPT09IG51bGwpIHtcblx0XHRcdHRoaXMudGFibGUgPSBbXG5cdFx0XHRcdFtudWxsLCBudWxsLCBudWxsXSxcblx0XHRcdFx0W251bGwsIG51bGwsIG51bGxdLFxuXHRcdFx0XHRbbnVsbCwgbnVsbCwgbnVsbF1dO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnRhYmxlID0gdGFibGVcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUGxheSB0aGUgdGFiIGluIHRoZSBib2FyZCBhbmQgY2hhbmdlIHRoZSBzdHlsZXNcblx0ICogQHBhcmFtIHsqfSBwb3NpdGlvbiBcblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBcblx0ICogQHBhcmFtIHsqfSBwb3MgXG5cdCAqL1xuXHRwbGF5KHBvc2l0aW9uLCB2YWx1ZSwgcG9zID0gYCR7cG9zaXRpb25bMF19XyR7cG9zaXRpb25bMV19YCkge1xuXG5cdFx0Y29uc3QgdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zKS5zdHlsZTtcblxuXHRcdHRoaXMudGFibGVbcG9zaXRpb25bMF1dW3Bvc2l0aW9uWzFdXSA9IHZhbHVlO1xuXHRcdHRhYi5iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZTtcblx0XHR0YWIuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQbGF5IHRoZSB0YWIgaW4gbWVtb3J5XG5cdCAqIEBwYXJhbSB7Kn0gcG9zaXRpb24gXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWUgXG5cdCAqIEBwYXJhbSB7Kn0gcG9zIFxuXHQgKi9cblx0cGxheU1lbW9yeShwb3NpdGlvbiwgdmFsdWUsIHBvcyA9IGAke3Bvc2l0aW9uWzBdfV8ke3Bvc2l0aW9uWzFdfWApIHtcblx0XHR0aGlzLnRhYmxlW3Bvc2l0aW9uWzBdXVtwb3NpdGlvblsxXV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qXG5cdCAqIFJlc2V0IHRoZSBib2FyZCBcblx0ICovXG5cdHJlc2V0KCkge1xuXHRcdHRoaXMudGFibGUgPSBbW251bGwsIG51bGwsIG51bGxdLFxuXHRcdFtudWxsLCBudWxsLCBudWxsXSxcblx0XHRbbnVsbCwgbnVsbCwgbnVsbF1dO1xuXG5cdFx0dGhpcy50YWJsZS5mb3JFYWNoKChyb3csIGkpID0+IHtcblx0XHRcdHJvdy5mb3JFYWNoKChjb2wsIGopID0+IHtcblx0XHRcdFx0Y29uc3QgdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aX1fJHtqfWApLnN0eWxlO1xuXHRcdFx0XHR0YWIuYmFja2dyb3VuZENvbG9yID0gXCIjZWVmMWVkXCI7XG5cdFx0XHRcdHRhYi5ib3JkZXJSYWRpdXMgPSAnMCUnO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fVxuXG5cdHByaW50KCkge1xuXHRcdGNvbnNvbGUubG9nKHRoaXMudGFibGUpXG5cdH1cblxuXHQvKlxuXHQgKiBDaGVjayBpZiB0aGVyZSBpcyBhbnkgc3BhY2UgdG8gcGxheVxuXHQgKi9cblx0aXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy50YWJsZS5zb21lKHJvdyA9PiB7XG5cdFx0XHRyZXR1cm4gcm93LnNvbWUocG9zID0+IHtcblx0XHRcdFx0cmV0dXJuIHBvcyA9PT0gbnVsbDtcblx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCb2FyZCgpIHtcblx0XHRyZXR1cm4gdGhpcy50YWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZSB0aGUgYm9hcmRcblx0ICovXG5cdGNsb25lQm9hcmQoKSB7XG5cdFx0Y29uc3QgbmV3QXJyYXkgPSB0aGlzLnRhYmxlLm1hcChmdW5jdGlvbihhcnIpIHtcblx0XHRcdHJldHVybiBhcnIuc2xpY2UoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBuZXcgQm9hcmQobmV3QXJyYXkpXG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhdmFpbGFibGUgbW92ZXNcblx0ICovXG5cdGdldEF2YWlsYWJsZU1vdmVzKCkge1xuXHRcdGxldCBtb3ZlcyA9IFtdO1xuXG5cdFx0dGhpcy50YWJsZS5mb3JFYWNoKChyb3csIGkpID0+IHtcblx0XHRcdHJvdy5mb3JFYWNoKChwb3MsIGopID0+IHtcblx0XHRcdFx0aWYgKHBvcyA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdG1vdmVzLnB1c2goW2ksIGpdKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gbW92ZXM7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgb3V0IGlmIGEgcG9zaXRpb25zIGlzIHBsYXllZFxuXHQgKiBAcGFyYW0geyp9IHBvc2l0aW9uIFxuXHQgKi9cblx0aXNQbGF5ZWQocG9zaXRpb24pIHtcblx0XHRyZXR1cm4gISh0aGlzLnRhYmxlW3Bvc2l0aW9uWzBdXVtwb3NpdGlvblsxXV0gPT09IG51bGwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFsZ29yaXRobVxuXHQgKiBAcGFyYW0geyp9IHdpbm5lciBjYWxsYmFja1xuXHQgKi9cblx0aGFzV2lubmVyKHdpbm5lcikge1xuXG5cdFx0cmV0dXJuIHRoaXMudGFibGUuc29tZSgocm93LCBpKSA9PiB7XG5cdFx0XHRyZXR1cm4gcm93LnNvbWUoKGNvbCwgaikgPT4ge1xuXG5cdFx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy50YWJsZVtpXVtqXTtcblxuXHRcdFx0XHRpZiAoZWxlbWVudCAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHQvL1RvRG86IHJld3JpdGUgYWxnb3JpdGhtXG5cblx0XHRcdFx0XHQvL1JvdyB3aW5uZXJcblx0XHRcdFx0XHRpZiAocm93LmV2ZXJ5KChlbGVtKSA9PiBlbGVtID09PSBlbGVtZW50KSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcblxuXHRcdFx0XHRcdC8vQ29sdW1uIHdpbm5lclxuXHRcdFx0XHRcdGlmIChlbGVtZW50ID09PSB0aGlzLnRhYmxlWzBdW2pdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMV1bal0gJiYgZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVtqXSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcblxuXHRcdFx0XHRcdGlmIChpID09PSAwICYmIGogPT09IDApXG5cdFx0XHRcdFx0XHRpZiAoZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVsyXSAmJiBlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdKSByZXR1cm4gd2lubmVyKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0aWYgKGkgPT09IDAgJiYgaiA9PT0gMilcblx0XHRcdFx0XHRcdGlmIChlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMl1bMF0pIHJldHVybiB3aW5uZXIoZWxlbWVudCk7XG5cblx0XHRcdFx0XHRpZiAoaSA9PT0gMSAmJiBqID09PSAxKVxuXHRcdFx0XHRcdFx0aWYgKGVsZW1lbnQgPT09IHRoaXMudGFibGVbMF1bMF0gJiYgZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVsyXSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcblxuXHRcdFx0XHRcdGlmIChpID09PSAyICYmIGogPT09IDApXG5cdFx0XHRcdFx0XHRpZiAoZWxlbWVudCA9PT0gdGhpcy50YWJsZVsxXVsxXSAmJiBlbGVtZW50ID09PSB0aGlzLnRhYmxlWzBdWzJdKSByZXR1cm4gd2lubmVyKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0aWYgKGkgPT09IDIgJiYgaiA9PT0gMilcblx0XHRcdFx0XHRcdGlmIChlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMF1bMF0pIHJldHVybiB3aW5uZXIoZWxlbWVudCk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYm9hcmQuanMiLCJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuXG5cdGNvbnN0cnVjdG9yKG5hbWUsIGNvbG9yKSB7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLmNvbG9yID0gY29sb3I7XG5cdH1cblxuXHRnZXRDb2xvcigpIHtcblx0XHRyZXR1cm4gdGhpcy5jb2xvcjtcblx0fVxuXG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMubmFtZTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsImV4cG9ydCBjbGFzcyBBSSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBib2FyZCwgYWlQbGF5ZXIsIG9wcG9uZW50KSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy5haVBsYXllciA9IGFpUGxheWVyO1xuICAgICAgICB0aGlzLm9wcG9uZW50ID0gb3Bwb25lbnQ7XG4gICAgfVxuXG4gICAgcGxheUFJKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLmRyYXcodGhpcy5nZXRCZXN0TW92ZSh0aGlzLmJvYXJkLmNsb25lQm9hcmQoKSkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBiZXN0IG1vdmVcbiAgICAgKiBAcGFyYW0geyp9IGJvYXJkIFxuICAgICAqL1xuICAgIGdldEJlc3RNb3ZlKGJvYXJkKSB7XG4gICAgICAgIGxldCBiZXN0U2NvcmUgPSAtMTAwXG4gICAgICAgIGxldCBjdXJyZW50U2NvcmU7XG4gICAgICAgIGxldCBiZXN0TW92ZTtcblxuICAgICAgICBjb25zdCBtb3ZlcyA9IGJvYXJkLmdldEF2YWlsYWJsZU1vdmVzKCk7XG4gICAgICAgIGNvbnN0IGNvcm5lcnMgPSBbWzAsIDBdLCBbMCwgMl0sIFsyLCAwXSwgWzIsIDJdXVxuICAgICAgICBjb25zdCB0dXJuID0gdGhpcy5nYW1lLmdldFR1cm5Db3VudCgpXG5cbiAgICAgICAgaWYgKHR1cm4gPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbMSwxXTtcbiAgICAgICAgfSBlbHNlIGlmICh0dXJuID09PSAxICYmICFib2FyZC5pc1BsYXllZChbMSwgMV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gWzEsMV07XG4gICAgICAgIH0gZWxzZSBpZiAodHVybiA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvcm5lcnMuZmluZChjb3JuZXIgPT4gKCFib2FyZC5pc1BsYXllZChjb3JuZXIpKSlcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdmVzLmZvckVhY2gobW92ZSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3Qm9hcmQgPSBib2FyZC5jbG9uZUJvYXJkKCk7XG4gICAgICAgICAgICBuZXdCb2FyZC5wbGF5TWVtb3J5KG1vdmUsIHRoaXMuYWlQbGF5ZXIuY29sb3IpO1xuICAgICAgICAgICAgY3VycmVudFNjb3JlID0gdGhpcy5taW5pbWF4KG5ld0JvYXJkLCBmYWxzZSlcbiAgICAgICAgICAgIGlmIChjdXJyZW50U2NvcmUgPiBiZXN0U2NvcmUpIHtcbiAgICAgICAgICAgICAgICBiZXN0U2NvcmUgPSBjdXJyZW50U2NvcmVcbiAgICAgICAgICAgICAgICBiZXN0TW92ZSA9IG1vdmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gYmVzdE1vdmVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNaW5pbWF4IGFsZ29yaXRobVxuICAgICAqIEBwYXJhbSB7Kn0gYm9hcmQgXG4gICAgICogQHBhcmFtIHsqfSBtYXhpbWl6aW5nIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVwdGggXG4gICAgICovXG4gICAgbWluaW1heChib2FyZCwgbWF4aW1pemluZyA9IHRydWUsIGRlcHRoID0gMCkge1xuICAgICAgICBjb25zdCB3aW5uZXIgPSB0aGlzLmdhbWUuZ2V0V2lubmVyKGJvYXJkLCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKCFib2FyZC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIGlmICghd2lubmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5nZXRXaW5uZXJQbGF5ZXIoZmFsc2UpLmdldENvbG9yKCkgPT09ICdyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxMDAgLSBkZXB0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTEwMCArIGRlcHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5uZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2V0V2lubmVyUGxheWVyKGZhbHNlKS5nZXRDb2xvcigpID09PSAncmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiAxMDAgLSBkZXB0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xMDAgKyBkZXB0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGN1cnJlbnRTY29yZSA9IDBcbiAgICAgICAgY29uc3QgbW92ZXMgPSBib2FyZC5nZXRBdmFpbGFibGVNb3ZlcygpO1xuXG4gICAgICAgIC8vIE1heGltYXppbmdcbiAgICAgICAgaWYgKG1heGltaXppbmcpIHtcbiAgICAgICAgICAgIGxldCBiZXN0U2NvcmUgPSAtMTAwXG4gICAgICAgICAgICBtb3Zlcy5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdCb2FyZCA9IGJvYXJkLmNsb25lQm9hcmQoKTtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5wbGF5TWVtb3J5KG1vdmUsIHRoaXMuYWlQbGF5ZXIuY29sb3IpXG4gICAgICAgICAgICAgICAgY3VycmVudFNjb3JlID0gdGhpcy5taW5pbWF4KG5ld0JvYXJkLCBmYWxzZSwgZGVwdGgrKylcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNjb3JlID4gYmVzdFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RTY29yZSA9IGN1cnJlbnRTY29yZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJlc3RTY29yZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWluaW1hemluZ1xuICAgICAgICBpZiAoIW1heGltaXppbmcpIHtcbiAgICAgICAgICAgIGxldCBiZXN0U2NvcmUgPSAxMDBcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2gobW92ZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0JvYXJkID0gYm9hcmQuY2xvbmVCb2FyZCgpO1xuICAgICAgICAgICAgICAgIG5ld0JvYXJkLnBsYXlNZW1vcnkobW92ZSwgdGhpcy5vcHBvbmVudClcbiAgICAgICAgICAgICAgICBjdXJyZW50U2NvcmUgPSB0aGlzLm1pbmltYXgobmV3Qm9hcmQsIHRydWUsIGRlcHRoKyspXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY29yZSA8IGJlc3RTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICBiZXN0U2NvcmUgPSBjdXJyZW50U2NvcmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGJlc3RTY29yZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL2FpLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGVzLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGVzLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGVzLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Njc3Mvc3R5bGVzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY29udGFpbmVyX190aXRsZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgfVxcblxcbi5jb250YWluZXJfX2JvYXJkIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDQ1dmg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3gtc2hhZG93OiAwIDAgNXB4IGJsYWNrO1xcbiAgaGVpZ2h0OiA0NXZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZjFlZDsgfVxcbiAgLmNvbnRhaW5lcl9fYm9hcmQgLmJveCB7XFxuICAgIHdpZHRoOiAxNXZoO1xcbiAgICBoZWlnaHQ6IDE1dmg7XFxuICAgIGJveC1zaGFkb3c6IDAgMCAwcHggMXB4IGJsYWNrO1xcbiAgICBmbG9hdDogbGVmdDsgfVxcbiAgICAuY29udGFpbmVyX19ib2FyZCAuYm94IGRpdiB7XFxuICAgICAgd2lkdGg6IDkwJTtcXG4gICAgICBoZWlnaHQ6IDkwJTtcXG4gICAgICBtYXJnaW46IDAgYXV0bztcXG4gICAgICBtYXJnaW4tdG9wOiAxdmg7IH1cXG5cXG4uY29udGFpbmVyX19jb25maWcge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgcGFkZGluZy10b3A6IDNyZW07IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHRpZiAodHlwZW9mIG1lbW9bc2VsZWN0b3JdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAoc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuXHRcdFx0XHRcdC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcblx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0c3R5bGVUYXJnZXQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRtZW1vW3NlbGVjdG9yXSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9