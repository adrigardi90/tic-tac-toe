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
		process(value === 'minimax', value === 'minimax-pruning');
	});

	var process = function process(minimax, minimaxPruning) {
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
							game.printMessage('Winner: ' + game.getWinnerPlayer().getName(), 150, reset);
						}

						if (!game.canPlay() && !game.getWinner(board)) {
							game.printMessage('Draw', 150, reset);
						}

						if (minimax || minimaxPruning) {
							if (game.canPlay() && game.getTurnColor() === 'red' && aiPlayer.playAI(minimaxPruning)) {
								game.changeTurn();
								turn.innerHTML = title + game.getTurnName();
							}

							if (game.getWinner(board)) {
								game.printMessage('Winner: ' + game.getWinnerPlayer().getName(), 150, reset);
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
var title = "Next turn: ";

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
        value: function playAI(pruning) {
            return this.game.draw(this.getBestMove(this.board.cloneBoard(), pruning));
        }

        /**
         * Get the best move. AI player always look for maximizing the score 
         * The desired outcome for AI player will be 1
         * @param {*} board 
         */

    }, {
        key: 'getBestMove',
        value: function getBestMove(board, pruning) {
            var _this = this;

            var init = Date.now();
            var bestScore = -100; // Maximizing
            var currentScore = void 0;
            var bestMove = void 0;

            // Just for minimax pruning
            var alpha = -100; //maximazing
            var beta = 100; //minimizing

            var moves = board.getAvailableMoves();
            var corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
            var turn = this.game.getTurnCount();

            if (turn === 0) return [1, 1];

            if (turn === 1 && !board.isPlayed([1, 1])) return [1, 1];

            if (turn === 1) return corners.find(function (corner) {
                return !board.isPlayed(corner);
            });

            moves.forEach(function (move) {
                var newBoard = board.cloneBoard();
                newBoard.playMemory(move, _this.aiPlayer.color);
                currentScore = pruning ? _this.minimaxPruning(newBoard, false, 0, alpha, beta) : _this.minimax(newBoard, false, 0);

                if (pruning) alpha = currentScore;

                if (currentScore > bestScore) {
                    bestScore = currentScore;
                    bestMove = move;
                }
            });

            var end = Date.now();
            var diff = end - init;
            console.log(diff);
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
            var depth = arguments[2];

            var winner = this.game.getWinner(board, false);

            var score = this.checkScore(board, winner, depth);
            if (!isNaN(score)) return score;

            var currentScore = 0;
            var moves = board.getAvailableMoves();

            // Maximazing
            if (maximizing) {
                var bestScore = -100;
                moves.forEach(function (move) {
                    var newBoard = board.cloneBoard();
                    newBoard.playMemory(move, _this2.aiPlayer.color);
                    currentScore = _this2.minimax(newBoard, false, ++depth);
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
                    currentScore = _this2.minimax(newBoard, true, ++depth);
                    if (currentScore < _bestScore) {
                        _bestScore = currentScore;
                    }
                });
                return _bestScore;
            }
        }

        /**
         * Check the node score
         * @param {*} board 
         * @param {*} winner 
         * @param {*} depth 
         */

    }, {
        key: 'checkScore',
        value: function checkScore(board, winner, depth) {
            if (!board.isEmpty()) {
                if (!winner) return 0;
                return this.getWinnerScore(depth);
            }

            if (winner) {
                return this.getWinnerScore(depth);
            }
        }

        /**
         * Get winner socreo
         */

    }, {
        key: 'getWinnerScore',
        value: function getWinnerScore(depth) {
            if (this.game.getWinnerPlayer(false).getColor() === 'red') return 100 - depth;

            return -100 + depth;
        }
    }, {
        key: 'minimaxPruning',
        value: function minimaxPruning(board, maximizing, depth, alpha, beta) {
            var winner = this.game.getWinner(board, false);

            var score = this.checkScore(board, winner, depth);
            if (!isNaN(score)) return score;

            var currentScore = 0;
            var localalpha = alpha;
            var localbeta = beta;
            var moves = board.getAvailableMoves();

            // Maximazing
            if (maximizing) {
                var bestScore = -100;

                for (var index = 0; index < moves.length; index++) {
                    var newBoard = board.cloneBoard();
                    newBoard.playMemory(moves[index], this.aiPlayer.color);
                    currentScore = this.minimaxPruning(newBoard, false, ++depth, localalpha, localbeta);

                    if (currentScore > bestScore) {
                        bestScore = currentScore;
                        localalpha = currentScore;
                    }

                    if (currentScore > localbeta) {
                        break;
                    }
                }
                return bestScore;
            }

            // Minimazing
            if (!maximizing) {
                var _bestScore2 = 100;

                for (var _index = 0; _index < moves.length; _index++) {
                    var _newBoard = board.cloneBoard();
                    _newBoard.playMemory(moves[_index], this.opponent);
                    currentScore = this.minimaxPruning(_newBoard, true, ++depth, localalpha, localbeta);

                    if (currentScore < _bestScore2) {
                        _bestScore2 = currentScore;
                        localbeta = currentScore;
                    }

                    if (currentScore < localalpha) {
                        break;
                    }
                }
                return _bestScore2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDcyMzU3ODc4NTc5YzM1YmU5NzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2FpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzP2JkM2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbIm1haW4iLCJ0YWJsZSIsImJvYXJkIiwiZ2V0Qm9hcmQiLCJjb25maWciLCJhZGRFdmVudExpc3RlbmVyIiwidmFsdWUiLCJ0YXJnZXQiLCJkaXNhYmxlZCIsInByb2Nlc3MiLCJtaW5pbWF4IiwibWluaW1heFBydW5pbmciLCJ0dXJuIiwiaW5uZXJIVE1MIiwidGl0bGUiLCJnYW1lIiwiZ2V0VHVybk5hbWUiLCJmb3JFYWNoIiwicm93IiwiaSIsImNvbCIsImoiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwib25jbGljayIsImUiLCJzcmNFbGVtZW50IiwicG9zaXRpb24iLCJpZCIsInN1YnN0ciIsImxlbmd0aCIsInNwbGl0IiwiY2FuUGxheSIsImRyYXciLCJjaGFuZ2VUdXJuIiwiZ2V0V2lubmVyIiwicHJpbnRNZXNzYWdlIiwiZ2V0V2lubmVyUGxheWVyIiwiZ2V0TmFtZSIsInJlc2V0IiwiZ2V0VHVybkNvbG9yIiwiYWlQbGF5ZXIiLCJwbGF5QUkiLCJHYW1lIiwiYWRyaWFuIiwicGxheWVyMiIsIkFJIiwiZ2V0Q29sb3IiLCJQbGF5ZXIiLCJCb2FyZCIsInBsYXllcjEiLCJwbGF5ZXJzIiwiYXJndW1lbnRzIiwidHVybkNvbG9yIiwidHVybk5hbWUiLCJjb2xvcldpbm5lciIsImNvbG9yTWVtb3J5V2lubmVyIiwidHVybkNvdW50IiwiaXNQbGF5ZWQiLCJwbGF5IiwiaXNFbXB0eSIsInJlYWwiLCJoYXNXaW5uZXIiLCJ3aW5uZXIiLCJmaW5kIiwicGxheWVyIiwiY29sb3IiLCJtc2ciLCJ0aW1lb3V0Iiwic2V0VGltZW91dCIsImFsZXJ0IiwicG9zIiwidGFiIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJSYWRpdXMiLCJjb25zb2xlIiwibG9nIiwic29tZSIsIm5ld0FycmF5IiwibWFwIiwiYXJyIiwic2xpY2UiLCJtb3ZlcyIsInB1c2giLCJlbGVtZW50IiwiZXZlcnkiLCJlbGVtIiwibmFtZSIsIm9wcG9uZW50IiwicHJ1bmluZyIsImdldEJlc3RNb3ZlIiwiY2xvbmVCb2FyZCIsImluaXQiLCJEYXRlIiwibm93IiwiYmVzdFNjb3JlIiwiY3VycmVudFNjb3JlIiwiYmVzdE1vdmUiLCJhbHBoYSIsImJldGEiLCJnZXRBdmFpbGFibGVNb3ZlcyIsImNvcm5lcnMiLCJnZXRUdXJuQ291bnQiLCJjb3JuZXIiLCJuZXdCb2FyZCIsInBsYXlNZW1vcnkiLCJtb3ZlIiwiZW5kIiwiZGlmZiIsIm1heGltaXppbmciLCJkZXB0aCIsInNjb3JlIiwiY2hlY2tTY29yZSIsImlzTmFOIiwiZ2V0V2lubmVyU2NvcmUiLCJsb2NhbGFscGhhIiwibG9jYWxiZXRhIiwiaW5kZXgiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFD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QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNzIzNTc4Nzg1NzljMzViZTk3MyIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL21vZHVsZXMvZ2FtZSc7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gJy4vbW9kdWxlcy9ib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL21vZHVsZXMvcGxheWVyJztcbmltcG9ydCB7IEFJIH0gZnJvbSAnLi9tb2R1bGVzL2FpJztcbmltcG9ydCAnLi9zY3NzL3N0eWxlcy5zY3NzJztcblxuZnVuY3Rpb24gbWFpbigpe1xuXG5cdGNvbnN0IHRhYmxlID0gYm9hcmQuZ2V0Qm9hcmQoKTtcblxuXHRjb25maWcuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKHsgdGFyZ2V0OiB7IHZhbHVlIH0gfSkgPT4ge1xuXHRcdGNvbmZpZy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0cHJvY2Vzcyh2YWx1ZSA9PT0gJ21pbmltYXgnLCB2YWx1ZSA9PT0gJ21pbmltYXgtcHJ1bmluZycpXG5cdH0pXG5cblx0Y29uc3QgcHJvY2VzcyA9IChtaW5pbWF4LCBtaW5pbWF4UHJ1bmluZykgPT4ge1xuXHRcdHR1cm4uaW5uZXJIVE1MID0gdGl0bGUgKyBnYW1lLmdldFR1cm5OYW1lKCk7XG5cblx0XHR0YWJsZS5mb3JFYWNoKChyb3csIGkpID0+IHtcblx0XHRcdHJvdy5mb3JFYWNoKChjb2wsIGopID0+IHtcblxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYm94JHtpfV8ke2p9YCkub25jbGljayA9IChlKSA9PiB7XG5cdFx0XHRcdFx0Y29uZmlnLmRpc2FibGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblx0XHRcdFx0XHRjb25zdCBwb3NpdGlvbiA9IHRhcmdldC5pZC5zdWJzdHIodGFyZ2V0LmlkLmxlbmd0aCAtIDMsIDMpLnNwbGl0KCdfJyk7XG5cblx0XHRcdFx0XHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgZ2FtZS5nZXRUdXJuTmFtZSgpO1xuXG5cdFx0XHRcdFx0aWYgKGdhbWUuY2FuUGxheSgpKSB7XG5cblx0XHRcdFx0XHRcdGlmIChnYW1lLmRyYXcocG9zaXRpb24pKSB7XG5cdFx0XHRcdFx0XHRcdGdhbWUuY2hhbmdlVHVybigpO1xuXHRcdFx0XHRcdFx0XHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgZ2FtZS5nZXRUdXJuTmFtZSgpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoZ2FtZS5nZXRXaW5uZXIoYm9hcmQpKSB7XG5cdFx0XHRcdFx0XHRcdGdhbWUucHJpbnRNZXNzYWdlKGBXaW5uZXI6ICR7Z2FtZS5nZXRXaW5uZXJQbGF5ZXIoKS5nZXROYW1lKCl9YCwgMTUwLCByZXNldClcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKCFnYW1lLmNhblBsYXkoKSAmJiAhZ2FtZS5nZXRXaW5uZXIoYm9hcmQpKSB7XG5cdFx0XHRcdFx0XHRcdGdhbWUucHJpbnRNZXNzYWdlKCdEcmF3JywgMTUwLCByZXNldClcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG1pbmltYXggfHwgbWluaW1heFBydW5pbmcpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGdhbWUuY2FuUGxheSgpICYmIGdhbWUuZ2V0VHVybkNvbG9yKCkgPT09ICdyZWQnICYmIGFpUGxheWVyLnBsYXlBSShtaW5pbWF4UHJ1bmluZykpIHtcblx0XHRcdFx0XHRcdFx0XHRnYW1lLmNoYW5nZVR1cm4oKTtcblx0XHRcdFx0XHRcdFx0XHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgZ2FtZS5nZXRUdXJuTmFtZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGdhbWUuZ2V0V2lubmVyKGJvYXJkKSkge1xuXHRcdFx0XHRcdFx0XHRcdGdhbWUucHJpbnRNZXNzYWdlKGBXaW5uZXI6ICR7Z2FtZS5nZXRXaW5uZXJQbGF5ZXIoKS5nZXROYW1lKCl9YCwgMTUwLCByZXNldClcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG59O1xuXG4vL1Jlc2V0IHRoZSBib2FyZCBhbmQgbmV3IGdhbWVcbmZ1bmN0aW9uIHJlc2V0KCl7XG5cdGJvYXJkLnJlc2V0KCk7XG5cdGdhbWUgPSBuZXcgR2FtZShhZHJpYW4sIHBsYXllcjIsIGJvYXJkKTtcblx0YWlQbGF5ZXIgPSBuZXcgQUkoZ2FtZSwgYm9hcmQsIHBsYXllcjIsIGFkcmlhbi5nZXRDb2xvcigpKTtcblx0Y29uZmlnLmRpc2FibGVkID0gZmFsc2U7XG5cdHR1cm4uaW5uZXJIVE1MID0gdGl0bGUgKyBhZHJpYW4uZ2V0TmFtZSgpO1xufVxuXG4vLyBDb25maWdcbmNvbnN0IHR1cm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm5cIik7XG5jb25zdCBjb25maWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ1wiKTtcbmNvbnN0IHRpdGxlID0gXCJOZXh0IHR1cm46IFwiO1xuXG4vL1BsYXllcnNcbmNvbnN0IGFkcmlhbiA9IG5ldyBQbGF5ZXIoXCJBZHJpYW5cIiwgXCJncmVlblwiKTtcbmNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKFwiUGxheWVyIDJcIiwgXCJyZWRcIik7XG5cbi8vQm9hcmRcbmNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKCk7XG5cbi8vR2FtZVxubGV0IGdhbWUgPSBuZXcgR2FtZShhZHJpYW4sIHBsYXllcjIsIGJvYXJkKTtcblxuLy8gSW5pdGlhbGl6ZSBQbGF5ZXIyIGFzIEFJIHBsYXllclxubGV0IGFpUGxheWVyID0gbmV3IEFJKGdhbWUsIGJvYXJkLCBwbGF5ZXIyLCBhZHJpYW4uZ2V0Q29sb3IoKSlcblxuLy9NYWluXG5tYWluKCk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIlxuZXhwb3J0IGNsYXNzIEdhbWUge1xuXG5cdGNvbnN0cnVjdG9yKHBsYXllcjEsIHBsYXllcjIsIGJvYXJkKSB7XG5cdFx0dGhpcy5wbGF5ZXJzID0gWy4uLmFyZ3VtZW50c107XG5cdFx0dGhpcy50dXJuQ29sb3IgPSBwbGF5ZXIxLmdldENvbG9yKCk7XG5cdFx0dGhpcy50dXJuTmFtZSA9IHBsYXllcjEuZ2V0TmFtZSgpO1xuXHRcdHRoaXMuYm9hcmQgPSBib2FyZDtcblx0XHR0aGlzLmNvbG9yV2lubmVyID0gJyc7XG5cdFx0dGhpcy5jb2xvck1lbW9yeVdpbm5lciA9ICcnO1xuXHRcdHRoaXMudHVybkNvdW50ID0gMDtcblx0fVxuXG5cdGdldFR1cm5Db2xvcigpIHtcblx0XHRyZXR1cm4gdGhpcy50dXJuQ29sb3I7XG5cdH1cblxuXHRnZXRUdXJuTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy50dXJuTmFtZTtcblx0fVxuXG5cdGdldFR1cm5Db3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy50dXJuQ291bnQ7XG5cdH1cblxuXHQvKlxuXHQgKiBDaGFuZ2UgdGhlIGdhbWUncyB0dXJuXG5cdCAqL1xuXHRjaGFuZ2VUdXJuKCkge1xuXHRcdHRoaXMudHVybkNvbG9yID09PSB0aGlzLnBsYXllcnNbMF0uZ2V0Q29sb3IoKSA/IHRoaXMudHVybkNvbG9yID0gdGhpcy5wbGF5ZXJzWzFdLmdldENvbG9yKCkgOiB0aGlzLnR1cm5Db2xvciA9IHRoaXMucGxheWVyc1swXS5nZXRDb2xvcigpO1xuXHRcdHRoaXMudHVybk5hbWUgPT09IHRoaXMucGxheWVyc1swXS5nZXROYW1lKCkgPyB0aGlzLnR1cm5OYW1lID0gdGhpcy5wbGF5ZXJzWzFdLmdldE5hbWUoKSA6IHRoaXMudHVybk5hbWUgPSB0aGlzLnBsYXllcnNbMF0uZ2V0TmFtZSgpO1xuXHRcdHRoaXMudHVybkNvdW50Kys7XG5cdH1cblxuXHQvKipcblx0ICogUGxheSB0aGUgdGFiXG5cdCAqIEBwYXJhbSB7Kn0gcG9zaXRpb24gXG5cdCAqL1xuXHRkcmF3KHBvc2l0aW9uKSB7XG5cdFx0aWYgKCF0aGlzLmJvYXJkLmlzUGxheWVkKHBvc2l0aW9uKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuYm9hcmQucGxheShwb3NpdGlvbiwgdGhpcy50dXJuQ29sb3IpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKlxuXHQgKiBDaGVjayBvdXQgaWYgdGhlcmUgaXMgc3BhY2UgdG8gcGxheVxuXHQgKi9cblx0Y2FuUGxheSgpIHtcblx0XHRyZXR1cm4gdGhpcy5ib2FyZC5pc0VtcHR5KCk7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgb3V0IGlmIHRoZXJlIGlzIGEgd2lubmVyXG5cdCAqIEBwYXJhbSB7Kn0gYm9hcmQgXG5cdCAqIEBwYXJhbSB7Kn0gcmVhbCBcblx0ICovXG5cdGdldFdpbm5lcihib2FyZCwgcmVhbCA9IHRydWUpIHtcblx0XHRyZXR1cm4gYm9hcmQuaGFzV2lubmVyKCh3aW5uZXIpID0+IHtcblx0XHRcdHJlYWwgPyB0aGlzLmNvbG9yV2lubmVyID0gd2lubmVyIDogdGhpcy5jb2xvck1lbW9yeVdpbm5lciA9IHdpbm5lcjtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgd2lubmVyXG5cdCAqIEBwYXJhbSB7Kn0gcmVhbCBcblx0ICovXG5cdGdldFdpbm5lclBsYXllcihyZWFsID0gdHJ1ZSkge1xuXHRcdHJldHVybiB0aGlzLnBsYXllcnMuZmluZCgocGxheWVyKSA9PiB7XG5cdFx0XHRjb25zdCBjb2xvciA9IHJlYWwgPyB0aGlzLmNvbG9yV2lubmVyIDogdGhpcy5jb2xvck1lbW9yeVdpbm5lclxuXHRcdFx0cmV0dXJuIHBsYXllci5jb2xvciA9PT0gY29sb3Jcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqIFNob3dzIHVwIGFuIGFsZXJ0XG5cdCAqIEBwYXJhbSB7Kn0gbXNnIFxuXHQgKiBAcGFyYW0geyp9IHRpbWVvdXQgXG5cdCAqL1xuXHRwcmludE1lc3NhZ2UobXNnLCB0aW1lb3V0LCByZXNldCl7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRhbGVydChtc2cpO1xuXHRcdFx0cmVzZXQoKVxuXHRcdH0sIHRpbWVvdXQpO1xuXHR9XG5cblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJleHBvcnQgY2xhc3MgQm9hcmQge1xuXG5cdGNvbnN0cnVjdG9yKHRhYmxlID0gbnVsbCkge1xuXG5cdFx0aWYgKHRhYmxlID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLnRhYmxlID0gW1xuXHRcdFx0XHRbbnVsbCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRcdFtudWxsLCBudWxsLCBudWxsXSxcblx0XHRcdFx0W251bGwsIG51bGwsIG51bGxdXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy50YWJsZSA9IHRhYmxlXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFBsYXkgdGhlIHRhYiBpbiB0aGUgYm9hcmQgYW5kIGNoYW5nZSB0aGUgc3R5bGVzXG5cdCAqIEBwYXJhbSB7Kn0gcG9zaXRpb24gXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWUgXG5cdCAqIEBwYXJhbSB7Kn0gcG9zIFxuXHQgKi9cblx0cGxheShwb3NpdGlvbiwgdmFsdWUsIHBvcyA9IGAke3Bvc2l0aW9uWzBdfV8ke3Bvc2l0aW9uWzFdfWApIHtcblxuXHRcdGNvbnN0IHRhYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvcykuc3R5bGU7XG5cblx0XHR0aGlzLnRhYmxlW3Bvc2l0aW9uWzBdXVtwb3NpdGlvblsxXV0gPSB2YWx1ZTtcblx0XHR0YWIuYmFja2dyb3VuZENvbG9yID0gdmFsdWU7XG5cdFx0dGFiLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogUGxheSB0aGUgdGFiIGluIG1lbW9yeVxuXHQgKiBAcGFyYW0geyp9IHBvc2l0aW9uIFxuXHQgKiBAcGFyYW0geyp9IHZhbHVlIFxuXHQgKiBAcGFyYW0geyp9IHBvcyBcblx0ICovXG5cdHBsYXlNZW1vcnkocG9zaXRpb24sIHZhbHVlKSB7XG5cdFx0dGhpcy50YWJsZVtwb3NpdGlvblswXV1bcG9zaXRpb25bMV1dID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKlxuXHQgKiBSZXNldCB0aGUgYm9hcmQgXG5cdCAqL1xuXHRyZXNldCgpIHtcblx0XHR0aGlzLnRhYmxlID0gW1tudWxsLCBudWxsLCBudWxsXSwgW251bGwsIG51bGwsIG51bGxdLCBbbnVsbCwgbnVsbCwgbnVsbF1dO1xuXG5cdFx0dGhpcy50YWJsZS5mb3JFYWNoKChyb3csIGkpID0+IHtcblx0XHRcdHJvdy5mb3JFYWNoKChjb2wsIGopID0+IHtcblx0XHRcdFx0Y29uc3QgdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aX1fJHtqfWApLnN0eWxlO1xuXHRcdFx0XHR0YWIuYmFja2dyb3VuZENvbG9yID0gXCIjZWVmMWVkXCI7XG5cdFx0XHRcdHRhYi5ib3JkZXJSYWRpdXMgPSAnMCUnO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fVxuXG5cdHByaW50KCkge1xuXHRcdGNvbnNvbGUubG9nKHRoaXMudGFibGUpXG5cdH1cblxuXHQvKlxuXHQgKiBDaGVjayBpZiB0aGVyZSBpcyBhbnkgc3BhY2UgdG8gcGxheVxuXHQgKi9cblx0aXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gdGhpcy50YWJsZS5zb21lKHJvdyA9PiB7XG5cdFx0XHRyZXR1cm4gcm93LnNvbWUocG9zID0+IHtcblx0XHRcdFx0cmV0dXJuIHBvcyA9PT0gbnVsbDtcblx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCb2FyZCgpIHtcblx0XHRyZXR1cm4gdGhpcy50YWJsZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZSB0aGUgYm9hcmRcblx0ICovXG5cdGNsb25lQm9hcmQoKSB7XG5cdFx0Y29uc3QgbmV3QXJyYXkgPSB0aGlzLnRhYmxlLm1hcChmdW5jdGlvbihhcnIpIHtcblx0XHRcdHJldHVybiBhcnIuc2xpY2UoKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBuZXcgQm9hcmQobmV3QXJyYXkpXG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhdmFpbGFibGUgbW92ZXNcblx0ICovXG5cdGdldEF2YWlsYWJsZU1vdmVzKCkge1xuXHRcdGxldCBtb3ZlcyA9IFtdO1xuXG5cdFx0dGhpcy50YWJsZS5mb3JFYWNoKChyb3csIGkpID0+IHtcblx0XHRcdHJvdy5mb3JFYWNoKChwb3MsIGopID0+IHtcblx0XHRcdFx0aWYgKHBvcyA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdG1vdmVzLnB1c2goW2ksIGpdKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gbW92ZXM7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2sgb3V0IGlmIGEgcG9zaXRpb25zIGlzIHBsYXllZFxuXHQgKiBAcGFyYW0geyp9IHBvc2l0aW9uIFxuXHQgKi9cblx0aXNQbGF5ZWQocG9zaXRpb24pIHtcblx0XHRyZXR1cm4gISh0aGlzLnRhYmxlW3Bvc2l0aW9uWzBdXVtwb3NpdGlvblsxXV0gPT09IG51bGwpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFsZ29yaXRobVxuXHQgKiBAcGFyYW0geyp9IHdpbm5lciBjYWxsYmFja1xuXHQgKi9cblx0aGFzV2lubmVyKHdpbm5lcikge1xuXG5cdFx0cmV0dXJuIHRoaXMudGFibGUuc29tZSgocm93LCBpKSA9PiB7XG5cdFx0XHRyZXR1cm4gcm93LnNvbWUoKGNvbCwgaikgPT4ge1xuXG5cdFx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy50YWJsZVtpXVtqXTtcblxuXHRcdFx0XHRpZiAoZWxlbWVudCAhPSBudWxsKSB7XG5cblx0XHRcdFx0XHQvL1RvRG86IHJld3JpdGUgYWxnb3JpdGhtXG5cblx0XHRcdFx0XHQvL1JvdyB3aW5uZXJcblx0XHRcdFx0XHRpZiAocm93LmV2ZXJ5KChlbGVtKSA9PiBlbGVtID09PSBlbGVtZW50KSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcblxuXHRcdFx0XHRcdC8vQ29sdW1uIHdpbm5lclxuXHRcdFx0XHRcdGlmIChlbGVtZW50ID09PSB0aGlzLnRhYmxlWzBdW2pdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMV1bal0gJiYgZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVtqXSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcblxuXHRcdFx0XHRcdGlmIChpID09PSAwICYmIGogPT09IDApXG5cdFx0XHRcdFx0XHRpZiAoZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVsyXSAmJiBlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdKSByZXR1cm4gd2lubmVyKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0aWYgKGkgPT09IDAgJiYgaiA9PT0gMilcblx0XHRcdFx0XHRcdGlmIChlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMl1bMF0pIHJldHVybiB3aW5uZXIoZWxlbWVudCk7XG5cblx0XHRcdFx0XHRpZiAoaSA9PT0gMSAmJiBqID09PSAxKVxuXHRcdFx0XHRcdFx0aWYgKGVsZW1lbnQgPT09IHRoaXMudGFibGVbMF1bMF0gJiYgZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVsyXSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcblxuXHRcdFx0XHRcdGlmIChpID09PSAyICYmIGogPT09IDApXG5cdFx0XHRcdFx0XHRpZiAoZWxlbWVudCA9PT0gdGhpcy50YWJsZVsxXVsxXSAmJiBlbGVtZW50ID09PSB0aGlzLnRhYmxlWzBdWzJdKSByZXR1cm4gd2lubmVyKGVsZW1lbnQpO1xuXG5cdFx0XHRcdFx0aWYgKGkgPT09IDIgJiYgaiA9PT0gMilcblx0XHRcdFx0XHRcdGlmIChlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMF1bMF0pIHJldHVybiB3aW5uZXIoZWxlbWVudCk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYm9hcmQuanMiLCJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuXG5cdGNvbnN0cnVjdG9yKG5hbWUsIGNvbG9yKSB7XG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcblx0XHR0aGlzLmNvbG9yID0gY29sb3I7XG5cdH1cblxuXHRnZXRDb2xvcigpIHtcblx0XHRyZXR1cm4gdGhpcy5jb2xvcjtcblx0fVxuXG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMubmFtZTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsImV4cG9ydCBjbGFzcyBBSSB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lLCBib2FyZCwgYWlQbGF5ZXIsIG9wcG9uZW50KSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy5haVBsYXllciA9IGFpUGxheWVyO1xuICAgICAgICB0aGlzLm9wcG9uZW50ID0gb3Bwb25lbnQ7XG4gICAgfVxuXG4gICAgcGxheUFJKHBydW5pbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZS5kcmF3KHRoaXMuZ2V0QmVzdE1vdmUodGhpcy5ib2FyZC5jbG9uZUJvYXJkKCksIHBydW5pbmcpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYmVzdCBtb3ZlLiBBSSBwbGF5ZXIgYWx3YXlzIGxvb2sgZm9yIG1heGltaXppbmcgdGhlIHNjb3JlIFxuICAgICAqIFRoZSBkZXNpcmVkIG91dGNvbWUgZm9yIEFJIHBsYXllciB3aWxsIGJlIDFcbiAgICAgKiBAcGFyYW0geyp9IGJvYXJkIFxuICAgICAqL1xuICAgIGdldEJlc3RNb3ZlKGJvYXJkLCBwcnVuaW5nKSB7XG4gICAgICAgIGNvbnN0IGluaXQgPSBEYXRlLm5vdygpXG4gICAgICAgIGxldCBiZXN0U2NvcmUgPSAtMTAwIC8vIE1heGltaXppbmdcbiAgICAgICAgbGV0IGN1cnJlbnRTY29yZTtcbiAgICAgICAgbGV0IGJlc3RNb3ZlO1xuXG4gICAgICAgIC8vIEp1c3QgZm9yIG1pbmltYXggcHJ1bmluZ1xuICAgICAgICBsZXQgYWxwaGEgPSAtMTAwOyAvL21heGltYXppbmdcbiAgICAgICAgbGV0IGJldGEgPSAxMDA7IC8vbWluaW1pemluZ1xuXG4gICAgICAgIGNvbnN0IG1vdmVzID0gYm9hcmQuZ2V0QXZhaWxhYmxlTW92ZXMoKTtcbiAgICAgICAgY29uc3QgY29ybmVycyA9IFtbMCwgMF0sIFswLCAyXSwgWzIsIDBdLCBbMiwgMl1dXG4gICAgICAgIGNvbnN0IHR1cm4gPSB0aGlzLmdhbWUuZ2V0VHVybkNvdW50KClcblxuICAgICAgICBpZiAodHVybiA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBbMSwgMV07XG5cbiAgICAgICAgaWYgKHR1cm4gPT09IDEgJiYgIWJvYXJkLmlzUGxheWVkKFsxLCAxXSkpXG4gICAgICAgICAgICByZXR1cm4gWzEsIDFdO1xuXG4gICAgICAgIGlmICh0dXJuID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIGNvcm5lcnMuZmluZChjb3JuZXIgPT4gKCFib2FyZC5pc1BsYXllZChjb3JuZXIpKSlcblxuICAgICAgICBtb3Zlcy5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld0JvYXJkID0gYm9hcmQuY2xvbmVCb2FyZCgpO1xuICAgICAgICAgICAgbmV3Qm9hcmQucGxheU1lbW9yeShtb3ZlLCB0aGlzLmFpUGxheWVyLmNvbG9yKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZSA9IHBydW5pbmcgPyB0aGlzLm1pbmltYXhQcnVuaW5nKG5ld0JvYXJkLCBmYWxzZSwgMCwgYWxwaGEsIGJldGEpIDogdGhpcy5taW5pbWF4KG5ld0JvYXJkLCBmYWxzZSwgMClcblxuICAgICAgICAgICAgaWYgKHBydW5pbmcpIGFscGhhID0gY3VycmVudFNjb3JlXG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50U2NvcmUgPiBiZXN0U2NvcmUpIHtcbiAgICAgICAgICAgICAgICBiZXN0U2NvcmUgPSBjdXJyZW50U2NvcmVcbiAgICAgICAgICAgICAgICBiZXN0TW92ZSA9IG1vdmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBlbmQgPSBEYXRlLm5vdygpXG4gICAgICAgIGNvbnN0IGRpZmYgPSBlbmQgLSBpbml0XG4gICAgICAgIGNvbnNvbGUubG9nKGRpZmYpXG4gICAgICAgIHJldHVybiBiZXN0TW92ZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1pbmltYXggYWxnb3JpdGhtXG4gICAgICogQHBhcmFtIHsqfSBib2FyZCBcbiAgICAgKiBAcGFyYW0geyp9IG1heGltaXppbmcgXG4gICAgICogQHBhcmFtIHsqfSBkZXB0aCBcbiAgICAgKi9cbiAgICBtaW5pbWF4KGJvYXJkLCBtYXhpbWl6aW5nID0gdHJ1ZSwgZGVwdGgpIHtcbiAgICAgICAgY29uc3Qgd2lubmVyID0gdGhpcy5nYW1lLmdldFdpbm5lcihib2FyZCwgZmFsc2UpO1xuXG4gICAgICAgIGNvbnN0IHNjb3JlID0gdGhpcy5jaGVja1Njb3JlKGJvYXJkLCB3aW5uZXIsIGRlcHRoKVxuICAgICAgICBpZiAoIWlzTmFOKHNjb3JlKSkgcmV0dXJuIHNjb3JlXG5cbiAgICAgICAgbGV0IGN1cnJlbnRTY29yZSA9IDBcbiAgICAgICAgY29uc3QgbW92ZXMgPSBib2FyZC5nZXRBdmFpbGFibGVNb3ZlcygpO1xuXG4gICAgICAgIC8vIE1heGltYXppbmdcbiAgICAgICAgaWYgKG1heGltaXppbmcpIHtcbiAgICAgICAgICAgIGxldCBiZXN0U2NvcmUgPSAtMTAwXG4gICAgICAgICAgICBtb3Zlcy5mb3JFYWNoKG1vdmUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdCb2FyZCA9IGJvYXJkLmNsb25lQm9hcmQoKTtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5wbGF5TWVtb3J5KG1vdmUsIHRoaXMuYWlQbGF5ZXIuY29sb3IpXG4gICAgICAgICAgICAgICAgY3VycmVudFNjb3JlID0gdGhpcy5taW5pbWF4KG5ld0JvYXJkLCBmYWxzZSwgKytkZXB0aClcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNjb3JlID4gYmVzdFNjb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RTY29yZSA9IGN1cnJlbnRTY29yZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJlc3RTY29yZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWluaW1hemluZ1xuICAgICAgICBpZiAoIW1heGltaXppbmcpIHtcbiAgICAgICAgICAgIGxldCBiZXN0U2NvcmUgPSAxMDBcbiAgICAgICAgICAgIG1vdmVzLmZvckVhY2gobW92ZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0JvYXJkID0gYm9hcmQuY2xvbmVCb2FyZCgpO1xuICAgICAgICAgICAgICAgIG5ld0JvYXJkLnBsYXlNZW1vcnkobW92ZSwgdGhpcy5vcHBvbmVudClcbiAgICAgICAgICAgICAgICBjdXJyZW50U2NvcmUgPSB0aGlzLm1pbmltYXgobmV3Qm9hcmQsIHRydWUsICsrZGVwdGgpXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY29yZSA8IGJlc3RTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICBiZXN0U2NvcmUgPSBjdXJyZW50U2NvcmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGJlc3RTY29yZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIG5vZGUgc2NvcmVcbiAgICAgKiBAcGFyYW0geyp9IGJvYXJkIFxuICAgICAqIEBwYXJhbSB7Kn0gd2lubmVyIFxuICAgICAqIEBwYXJhbSB7Kn0gZGVwdGggXG4gICAgICovXG4gICAgY2hlY2tTY29yZShib2FyZCwgd2lubmVyLCBkZXB0aCkge1xuICAgICAgICBpZiAoIWJvYXJkLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgaWYgKCF3aW5uZXIpIHJldHVybiAwXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRXaW5uZXJTY29yZShkZXB0aClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5uZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFdpbm5lclNjb3JlKGRlcHRoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHdpbm5lciBzb2NyZW9cbiAgICAgKi9cbiAgICBnZXRXaW5uZXJTY29yZShkZXB0aCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lLmdldFdpbm5lclBsYXllcihmYWxzZSkuZ2V0Q29sb3IoKSA9PT0gJ3JlZCcpXG4gICAgICAgICAgICByZXR1cm4gMTAwIC0gZGVwdGg7XG5cbiAgICAgICAgcmV0dXJuIC0xMDAgKyBkZXB0aDtcbiAgICB9XG5cbiAgICBtaW5pbWF4UHJ1bmluZyhib2FyZCwgbWF4aW1pemluZywgZGVwdGgsIGFscGhhLCBiZXRhKSB7XG4gICAgICAgIGNvbnN0IHdpbm5lciA9IHRoaXMuZ2FtZS5nZXRXaW5uZXIoYm9hcmQsIGZhbHNlKTtcblxuICAgICAgICBjb25zdCBzY29yZSA9IHRoaXMuY2hlY2tTY29yZShib2FyZCwgd2lubmVyLCBkZXB0aClcbiAgICAgICAgaWYgKCFpc05hTihzY29yZSkpIHJldHVybiBzY29yZVxuXG4gICAgICAgIGxldCBjdXJyZW50U2NvcmUgPSAwXG4gICAgICAgIGxldCBsb2NhbGFscGhhID0gYWxwaGFcbiAgICAgICAgbGV0IGxvY2FsYmV0YSA9IGJldGFcbiAgICAgICAgY29uc3QgbW92ZXMgPSBib2FyZC5nZXRBdmFpbGFibGVNb3ZlcygpO1xuXG4gICAgICAgIC8vIE1heGltYXppbmdcbiAgICAgICAgaWYgKG1heGltaXppbmcpIHtcbiAgICAgICAgICAgIGxldCBiZXN0U2NvcmUgPSAtMTAwXG5cbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBtb3Zlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdCb2FyZCA9IGJvYXJkLmNsb25lQm9hcmQoKTtcbiAgICAgICAgICAgICAgICBuZXdCb2FyZC5wbGF5TWVtb3J5KG1vdmVzW2luZGV4XSwgdGhpcy5haVBsYXllci5jb2xvcilcbiAgICAgICAgICAgICAgICBjdXJyZW50U2NvcmUgPSB0aGlzLm1pbmltYXhQcnVuaW5nKG5ld0JvYXJkLCBmYWxzZSwgKytkZXB0aCwgbG9jYWxhbHBoYSwgbG9jYWxiZXRhKVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY29yZSA+IGJlc3RTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICBiZXN0U2NvcmUgPSBjdXJyZW50U2NvcmVcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxhbHBoYSA9IGN1cnJlbnRTY29yZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2NvcmUgPiBsb2NhbGJldGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmVzdFNjb3JlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBNaW5pbWF6aW5nXG4gICAgICAgIGlmICghbWF4aW1pemluZykge1xuICAgICAgICAgICAgbGV0IGJlc3RTY29yZSA9IDEwMFxuXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbW92ZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBib2FyZC5jbG9uZUJvYXJkKCk7XG4gICAgICAgICAgICAgICAgbmV3Qm9hcmQucGxheU1lbW9yeShtb3Zlc1tpbmRleF0sIHRoaXMub3Bwb25lbnQpXG4gICAgICAgICAgICAgICAgY3VycmVudFNjb3JlID0gdGhpcy5taW5pbWF4UHJ1bmluZyhuZXdCb2FyZCwgdHJ1ZSwgKytkZXB0aCwgbG9jYWxhbHBoYSwgbG9jYWxiZXRhKVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY29yZSA8IGJlc3RTY29yZSkge1xuICAgICAgICAgICAgICAgICAgICBiZXN0U2NvcmUgPSBjdXJyZW50U2NvcmVcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxiZXRhID0gY3VycmVudFNjb3JlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTY29yZSA8IGxvY2FsYWxwaGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmVzdFNjb3JlXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYWkuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZXMuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZXMuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZXMuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2Nzcy9zdHlsZXMuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jb250YWluZXJfX3RpdGxlIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyB9XFxuXFxuLmNvbnRhaW5lcl9fYm9hcmQge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aWR0aDogNDV2aDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggYmxhY2s7XFxuICBoZWlnaHQ6IDQ1dmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVmMWVkOyB9XFxuICAuY29udGFpbmVyX19ib2FyZCAuYm94IHtcXG4gICAgd2lkdGg6IDE1dmg7XFxuICAgIGhlaWdodDogMTV2aDtcXG4gICAgYm94LXNoYWRvdzogMCAwIDBweCAxcHggYmxhY2s7XFxuICAgIGZsb2F0OiBsZWZ0OyB9XFxuICAgIC5jb250YWluZXJfX2JvYXJkIC5ib3ggZGl2IHtcXG4gICAgICB3aWR0aDogOTAlO1xcbiAgICAgIGhlaWdodDogOTAlO1xcbiAgICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICAgIG1hcmdpbi10b3A6IDF2aDsgfVxcblxcbi5jb250YWluZXJfX2NvbmZpZyB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBwYWRkaW5nLXRvcDogM3JlbTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9zY3NzL3N0eWxlcy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSBcImJvb2xlYW5cIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=