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

__webpack_require__(4);

var main = function main() {

	var turn = document.getElementById("turn");
	var table = board.getBoard();
	var title = "Turno de ";

	turn.innerHTML = title + game.getTurnName();

	table.forEach(function (row, i) {
		row.forEach(function (col, j) {

			document.getElementById('box' + i + '_' + j).onclick = function (e) {

				var target = e.target || e.srcElement;
				var position = target.id.substr(target.id.length - 3, 3);

				turn.innerHTML = title + game.getTurnName();

				if (game.canPlay()) {

					if (game.draw(position)) {
						game.changeTurn();
						turn.innerHTML = title + game.getTurnName();
					}

					if (game.getWinner()) {
						setTimeout(function () {
							alert('Ha ganado ' + game.getWinnerPlayer().getName());
							reset();
						}, 150);
					}

					if (!game.canPlay() && !game.getWinner()) {
						setTimeout(function () {
							alert("Empate");
							reset();
						}, 150);
					}
				}
			};
		});
	});
};

//Reset the board and new game
var reset = function reset() {

	board.reset();
	game = new _game.Game(adrian, juanjo, board);
};

//Players
var adrian = new _player.Player("Player 1", "green");
var juanjo = new _player.Player("Player 2", "red");

//Board
var board = new _board.Board();

//Game
var game = new _game.Game(adrian, juanjo, board);

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

		/*
   * Change the game's turn
   */

	}, {
		key: 'changeTurn',
		value: function changeTurn() {
			this.turnColor === this.players[0].getColor() ? this.turnColor = this.players[1].getColor() : this.turnColor = this.players[0].getColor();
			this.turnName === this.players[0].getName() ? this.turnName = this.players[1].getName() : this.turnName = this.players[0].getName();
		}

		/*
   * Play the tab
   */

	}, {
		key: 'draw',
		value: function draw(position) {
			var pos = position.split("_");

			if (!this.board.isPlayed(pos)) return this.board.play(pos, this.turnColor);

			return false;
		}

		/*
   * Check if the is space to play
   */

	}, {
		key: 'canPlay',
		value: function canPlay() {
			return this.board.isEmpty();
		}

		/*
   * Check if there is some winner
   */

	}, {
		key: 'getWinner',
		value: function getWinner() {
			var _this = this;

			return this.board.hasWinner(function (winner) {
				_this.colorWinner = winner;
				return true;
			});
		}

		/*
   * Get the winner player
   */

	}, {
		key: 'getWinnerPlayer',
		value: function getWinnerPlayer() {
			var _this2 = this;

			var winner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			this.players.forEach(function (player) {
				if (player.color === _this2.colorWinner) winner = player;
			});

			return winner;
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
		_classCallCheck(this, Board);

		this.table = [[null, null, null], [null, null, null], [null, null, null]];
	}

	/*
  * Play the tab in the board and change the styles
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

		/*
   * Get if a position is already played
   */

	}, {
		key: 'isPlayed',
		value: function isPlayed(position) {
			return !(this.table[position[0]][position[1]] === null);
		}

		/*
   * Algorithm
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

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, ".container {\n  margin: 0 auto;\n  width: 45vh;\n  text-align: center;\n  box-shadow: 0 0 5px black;\n  height: 45vh;\n  background-color: #eef1ed; }\n\n.box {\n  width: 15vh;\n  height: 15vh;\n  box-shadow: 0 0 0px 1px black;\n  float: left; }\n  .box div {\n    width: 90%;\n    height: 90%;\n    margin: 0 auto;\n    margin-top: 1vh; }\n\nh2 {\n  text-align: center;\n  font-family: sans-serif; }\n", ""]);

// exports


/***/ }),
/* 6 */
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
/* 7 */
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

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

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
/* 8 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjU3ZGM4MThjNjVhZDVmMmUwMzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL3N0eWxlcy5zY3NzP2JkM2UiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Njc3Mvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIl0sIm5hbWVzIjpbIm1haW4iLCJ0dXJuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRhYmxlIiwiYm9hcmQiLCJnZXRCb2FyZCIsInRpdGxlIiwiaW5uZXJIVE1MIiwiZ2FtZSIsImdldFR1cm5OYW1lIiwiZm9yRWFjaCIsInJvdyIsImkiLCJjb2wiLCJqIiwib25jbGljayIsImUiLCJ0YXJnZXQiLCJzcmNFbGVtZW50IiwicG9zaXRpb24iLCJpZCIsInN1YnN0ciIsImxlbmd0aCIsImNhblBsYXkiLCJkcmF3IiwiY2hhbmdlVHVybiIsImdldFdpbm5lciIsInNldFRpbWVvdXQiLCJhbGVydCIsImdldFdpbm5lclBsYXllciIsImdldE5hbWUiLCJyZXNldCIsImFkcmlhbiIsImp1YW5qbyIsIkdhbWUiLCJwbGF5ZXIxIiwicGxheWVyMiIsInBsYXllcnMiLCJhcmd1bWVudHMiLCJ0dXJuQ29sb3IiLCJnZXRDb2xvciIsInR1cm5OYW1lIiwiY29sb3JXaW5uZXIiLCJwb3MiLCJzcGxpdCIsImlzUGxheWVkIiwicGxheSIsImlzRW1wdHkiLCJoYXNXaW5uZXIiLCJ3aW5uZXIiLCJwbGF5ZXIiLCJjb2xvciIsIkJvYXJkIiwidmFsdWUiLCJ0YWIiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclJhZGl1cyIsImNvbnNvbGUiLCJsb2ciLCJzb21lIiwiZWxlbWVudCIsImV2ZXJ5IiwiZWxlbSIsIlBsYXllciIsIm5hbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQSxJQUFNQSxPQUFPLFNBQVBBLElBQU8sR0FBTTs7QUFFbEIsS0FBTUMsT0FBT0MsU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFiO0FBQ0EsS0FBTUMsUUFBUUMsTUFBTUMsUUFBTixFQUFkO0FBQ0EsS0FBTUMsUUFBUSxXQUFkOztBQUVBTixNQUFLTyxTQUFMLEdBQWlCRCxRQUFRRSxLQUFLQyxXQUFMLEVBQXpCOztBQUVBTixPQUFNTyxPQUFOLENBQWMsVUFBQ0MsR0FBRCxFQUFNQyxDQUFOLEVBQVk7QUFDekJELE1BQUlELE9BQUosQ0FBWSxVQUFDRyxHQUFELEVBQU1DLENBQU4sRUFBWTs7QUFFdkJiLFlBQVNDLGNBQVQsU0FBOEJVLENBQTlCLFNBQW1DRSxDQUFuQyxFQUF3Q0MsT0FBeEMsR0FBa0Qs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QUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEOztBQUVBLDZCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDNVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxXQUFXLEVBQUU7QUFDckQsd0NBQXdDLFdBQVcsRUFBRTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxzQ0FBc0M7QUFDdEMsR0FBRztBQUNIO0FBQ0EsOERBQThEO0FBQzlEOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNTdkYzgxOGM2NWFkNWYyZTAzOSIsImltcG9ydCB7IEdhbWUgfSBmcm9tICcuL21vZHVsZXMvZ2FtZSc7XG5pbXBvcnQgeyBCb2FyZCB9IGZyb20gJy4vbW9kdWxlcy9ib2FyZCc7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL21vZHVsZXMvcGxheWVyJztcbmltcG9ydCAnLi9zY3NzL3N0eWxlcy5zY3NzJztcblxuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuXG5cdGNvbnN0IHR1cm4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1cm5cIik7XG5cdGNvbnN0IHRhYmxlID0gYm9hcmQuZ2V0Qm9hcmQoKTtcblx0Y29uc3QgdGl0bGUgPSBcIlR1cm5vIGRlIFwiO1xuXG5cdHR1cm4uaW5uZXJIVE1MID0gdGl0bGUgKyBnYW1lLmdldFR1cm5OYW1lKCk7XG5cblx0dGFibGUuZm9yRWFjaCgocm93LCBpKSA9PiB7XG5cdFx0cm93LmZvckVhY2goKGNvbCwgaikgPT4ge1xuXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYm94JHtpfV8ke2p9YCkub25jbGljayA9IChlKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuXHRcdFx0XHRjb25zdCBwb3NpdGlvbiA9IHRhcmdldC5pZC5zdWJzdHIodGFyZ2V0LmlkLmxlbmd0aC0zLCAzKTtcblxuXHRcdFx0XHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgZ2FtZS5nZXRUdXJuTmFtZSgpO1xuXG5cdFx0XHRcdGlmKGdhbWUuY2FuUGxheSgpKXtcblxuXHRcdFx0XHRcdGlmKGdhbWUuZHJhdyhwb3NpdGlvbikpe1xuXHRcdFx0XHRcdFx0Z2FtZS5jaGFuZ2VUdXJuKCk7XG5cdFx0XHRcdFx0XHR0dXJuLmlubmVySFRNTCA9IHRpdGxlICsgZ2FtZS5nZXRUdXJuTmFtZSgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmKGdhbWUuZ2V0V2lubmVyKCkpe1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+e1xuXHRcdFx0XHRcdFx0XHRhbGVydChgSGEgZ2FuYWRvICR7Z2FtZS5nZXRXaW5uZXJQbGF5ZXIoKS5nZXROYW1lKCl9YCk7XG5cdFx0XHRcdFx0XHRcdHJlc2V0KCk7XG5cdFx0XHRcdFx0XHR9LDE1MCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYoIWdhbWUuY2FuUGxheSgpICYmICFnYW1lLmdldFdpbm5lcigpKXtcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0XHRcdFx0YWxlcnQoXCJFbXBhdGVcIik7XG5cdFx0XHRcdFx0XHRcdHJlc2V0KCk7XG5cdFx0XHRcdFx0XHR9LDE1MCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9XG5cblx0XHR9KTsgXG5cdH0pO1xufTtcblxuLy9SZXNldCB0aGUgYm9hcmQgYW5kIG5ldyBnYW1lXG5jb25zdCByZXNldCA9ICgpID0+IHtcblxuXHRib2FyZC5yZXNldCgpO1xuXHRnYW1lID0gbmV3IEdhbWUoYWRyaWFuLCBqdWFuam8sIGJvYXJkKTtcblxufVxuXG4vL1BsYXllcnNcbmNvbnN0IGFkcmlhbiA9IG5ldyBQbGF5ZXIoXCJQbGF5ZXIgMVwiLCBcImdyZWVuXCIpO1xuY29uc3QganVhbmpvID0gbmV3IFBsYXllcihcIlBsYXllciAyXCIsIFwicmVkXCIpO1xuXG4vL0JvYXJkXG5sZXQgYm9hcmQgPSBuZXcgQm9hcmQoKTtcblxuLy9HYW1lXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGFkcmlhbiwganVhbmpvLCBib2FyZCk7XG5cbi8vTWFpblxubWFpbigpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJleHBvcnQgY2xhc3MgR2FtZXtcblxuXHRjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyLCBib2FyZCl7XG5cdFx0dGhpcy5wbGF5ZXJzID0gWy4uLmFyZ3VtZW50c107XG5cdFx0dGhpcy50dXJuQ29sb3IgPSBwbGF5ZXIxLmdldENvbG9yKCk7XG5cdFx0dGhpcy50dXJuTmFtZSA9IHBsYXllcjEuZ2V0TmFtZSgpO1xuXHRcdHRoaXMuYm9hcmQgPSBib2FyZDtcblx0XHR0aGlzLmNvbG9yV2lubmVyID0gJyc7XG5cdH1cblxuXHRnZXRUdXJuQ29sb3IoKXtcblx0XHRyZXR1cm4gdGhpcy50dXJuQ29sb3I7XG5cdH1cblxuXHRnZXRUdXJuTmFtZSgpe1xuXHRcdHJldHVybiB0aGlzLnR1cm5OYW1lO1xuXHR9XG5cblx0Lypcblx0ICogQ2hhbmdlIHRoZSBnYW1lJ3MgdHVyblxuXHQgKi9cblx0Y2hhbmdlVHVybigpe1xuXHRcdHRoaXMudHVybkNvbG9yID09PSB0aGlzLnBsYXllcnNbMF0uZ2V0Q29sb3IoKSA/IHRoaXMudHVybkNvbG9yPXRoaXMucGxheWVyc1sxXS5nZXRDb2xvcigpOiB0aGlzLnR1cm5Db2xvcj10aGlzLnBsYXllcnNbMF0uZ2V0Q29sb3IoKTtcblx0XHR0aGlzLnR1cm5OYW1lID09PSB0aGlzLnBsYXllcnNbMF0uZ2V0TmFtZSgpID8gdGhpcy50dXJuTmFtZT10aGlzLnBsYXllcnNbMV0uZ2V0TmFtZSgpOiB0aGlzLnR1cm5OYW1lPXRoaXMucGxheWVyc1swXS5nZXROYW1lKCk7XG5cdH1cblxuXHQvKlxuXHQgKiBQbGF5IHRoZSB0YWJcblx0ICovXG5cdGRyYXcocG9zaXRpb24pe1xuXHRcdGNvbnN0IHBvcyA9IHBvc2l0aW9uLnNwbGl0KFwiX1wiKTtcblxuXHRcdGlmKCF0aGlzLmJvYXJkLmlzUGxheWVkKHBvcykpXG5cdFx0XHRyZXR1cm4gdGhpcy5ib2FyZC5wbGF5KHBvcywgdGhpcy50dXJuQ29sb3IpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Lypcblx0ICogQ2hlY2sgaWYgdGhlIGlzIHNwYWNlIHRvIHBsYXlcblx0ICovXG5cdGNhblBsYXkoKXtcblx0XHRyZXR1cm4gdGhpcy5ib2FyZC5pc0VtcHR5KCk7XG5cdH1cblxuXHQvKlxuXHQgKiBDaGVjayBpZiB0aGVyZSBpcyBzb21lIHdpbm5lclxuXHQgKi9cblx0Z2V0V2lubmVyKCl7XG5cdFx0cmV0dXJuIHRoaXMuYm9hcmQuaGFzV2lubmVyKCh3aW5uZXIpID0+IHsgXG5cdFx0XHR0aGlzLmNvbG9yV2lubmVyID0gd2lubmVyO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSk7XG5cdH1cblxuXHQvKlxuXHQgKiBHZXQgdGhlIHdpbm5lciBwbGF5ZXJcblx0ICovXG5cdGdldFdpbm5lclBsYXllcih3aW5uZXIgPSAnJyl7XG4gXHRcdHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiBcdFx0IFx0aWYocGxheWVyLmNvbG9yID09PSB0aGlzLmNvbG9yV2lubmVyKVxuIFx0XHQgXHRcdHdpbm5lciA9IHBsYXllclxuIFx0XHR9KVxuXG5cdFx0cmV0dXJuIHdpbm5lcjtcblx0fVxuXG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwiZXhwb3J0IGNsYXNzIEJvYXJkIHtcblxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMudGFibGUgPSBbW251bGwsIG51bGwsIG51bGxdLFxuXHRcdFx0XHRcdCAgW251bGwsIG51bGwsIG51bGxdLFxuXHRcdFx0XHRcdCAgW251bGwsIG51bGwsIG51bGxdXTtcblx0fVxuXG5cdC8qXG5cdCAqIFBsYXkgdGhlIHRhYiBpbiB0aGUgYm9hcmQgYW5kIGNoYW5nZSB0aGUgc3R5bGVzXG5cdCAqL1xuXHRwbGF5KHBvc2l0aW9uLCB2YWx1ZSwgcG9zPWAke3Bvc2l0aW9uWzBdfV8ke3Bvc2l0aW9uWzFdfWApe1xuXG5cdFx0Y29uc3QgdGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocG9zKS5zdHlsZTtcblxuXHRcdHRoaXMudGFibGVbcG9zaXRpb25bMF1dW3Bvc2l0aW9uWzFdXSA9IHZhbHVlO1xuXHRcdHRhYi5iYWNrZ3JvdW5kQ29sb3I9dmFsdWU7XG5cdFx0dGFiLmJvcmRlclJhZGl1cz0nNTAlJztcblxuXHRcdHJldHVybiB0cnVlOyBcblx0fVxuXG5cdC8qXG5cdCAqIFJlc2V0IHRoZSBib2FyZCBcblx0ICovXG5cdHJlc2V0KCl7XG5cdFx0dGhpcy50YWJsZSA9IFtbbnVsbCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRcdFx0ICBbbnVsbCwgbnVsbCwgbnVsbF0sXG5cdFx0XHRcdFx0ICBbbnVsbCwgbnVsbCwgbnVsbF1dO1xuXG5cdFx0dGhpcy50YWJsZS5mb3JFYWNoKChyb3csIGkpID0+IHtcblx0XHRcdHJvdy5mb3JFYWNoKChjb2wsIGopID0+IHtcblxuXHRcdFx0XHRjb25zdCB0YWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpfV8ke2p9YCkuc3R5bGU7IFxuXHRcdFx0XHR0YWIuYmFja2dyb3VuZENvbG9yPVwiI2VlZjFlZFwiO1xuXHRcdFx0XHR0YWIuYm9yZGVyUmFkaXVzPScwJSc7XG5cdFx0XHR9KTsgXG5cdFx0fSk7XG5cblx0fVxuXG5cdHByaW50KCl7XG5cdFx0Y29uc29sZS5sb2codGhpcy50YWJsZSlcblx0fVxuXG5cdC8qXG5cdCAqIENoZWNrIGlmIHRoZXJlIGlzIGFueSBzcGFjZSB0byBwbGF5XG5cdCAqL1xuXHRpc0VtcHR5KCl7XG5cdFx0cmV0dXJuIHRoaXMudGFibGUuc29tZShyb3cgPT4ge1xuXHRcdFx0cmV0dXJuIHJvdy5zb21lKCBwb3MgPT4ge1xuXHRcdFx0XHRyZXR1cm4gcG9zID09PSBudWxsO1xuXHRcdFx0fSlcblx0XHR9KTtcdFxuXHR9XG5cblx0Z2V0Qm9hcmQoKXtcblx0XHRyZXR1cm4gdGhpcy50YWJsZTtcblx0fVxuXG5cdC8qXG5cdCAqIEdldCBpZiBhIHBvc2l0aW9uIGlzIGFscmVhZHkgcGxheWVkXG5cdCAqL1xuXHRpc1BsYXllZChwb3NpdGlvbil7XG5cdFx0cmV0dXJuICEodGhpcy50YWJsZVtwb3NpdGlvblswXV1bcG9zaXRpb25bMV1dID09PSBudWxsKTtcblx0fVxuXG5cdC8qXG5cdCAqIEFsZ29yaXRobVxuXHQgKi9cblx0aGFzV2lubmVyKHdpbm5lcil7XG5cblx0XHRyZXR1cm4gdGhpcy50YWJsZS5zb21lKChyb3csIGkpID0+IHtcblx0XHRcdHJldHVybiByb3cuc29tZSgoY29sLCBqKSA9PiB7XG5cblx0XHRcdFx0bGV0IGVsZW1lbnQgPSB0aGlzLnRhYmxlW2ldW2pdO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYoZWxlbWVudCAhPSBudWxsKXtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHQvL1RvRG86IHJld3JpdGUgYWxnb3JpdGhtXG5cblx0XHRcdFx0XHQvL1JvdyB3aW5uZXJcblx0XHRcdFx0XHRpZihyb3cuZXZlcnkoKGVsZW0pPT4gZWxlbSA9PT0gZWxlbWVudCkpIHJldHVybiB3aW5uZXIoZWxlbWVudCk7XG5cblx0XHRcdFx0XHQvL0NvbHVtbiB3aW5uZXJcblx0XHRcdFx0XHRpZihlbGVtZW50ID09PSB0aGlzLnRhYmxlWzBdW2pdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMV1bal0gJiYgZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVtqXSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZihpID09PSAwICYmIGo9PT0wKVxuXHRcdFx0XHRcdFx0aWYoZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVsyXSAmJiBlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdKSByZXR1cm4gd2lubmVyKGVsZW1lbnQpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGkgPT09IDAgJiYgaj09PTIpXG5cdFx0XHRcdFx0XHRpZihlbGVtZW50ID09PSB0aGlzLnRhYmxlWzFdWzFdICYmIGVsZW1lbnQgPT09IHRoaXMudGFibGVbMl1bMF0pIHJldHVybiB3aW5uZXIoZWxlbWVudCk7XG4gXG5cdFx0XHRcdFx0aWYoaSA9PT0gMSAmJiBqPT09MSlcblx0XHRcdFx0XHRcdGlmKGVsZW1lbnQgPT09IHRoaXMudGFibGVbMF1bMF0gJiYgZWxlbWVudCA9PT0gdGhpcy50YWJsZVsyXVsyXSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcbiBcblx0XHRcdFx0XHRpZihpID09PSAyICYmIGo9PT0wKVxuXHRcdFx0XHRcdFx0aWYoZWxlbWVudCA9PT0gdGhpcy50YWJsZVsxXVsxXSAmJiBlbGVtZW50ID09PSB0aGlzLnRhYmxlWzBdWzJdKSByZXR1cm4gd2lubmVyKGVsZW1lbnQpO1xuXHQgXG5cdFx0XHRcdFx0aWYoaSA9PT0gMiAmJiBqPT09Milcblx0XHRcdFx0XHRcdGlmKGVsZW1lbnQgPT09IHRoaXMudGFibGVbMV1bMV0gJiYgZWxlbWVudCA9PT0gdGhpcy50YWJsZVswXVswXSkgcmV0dXJuIHdpbm5lcihlbGVtZW50KTtcdFx0XHRcdFx0XG5cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0fVxuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21vZHVsZXMvYm9hcmQuanMiLCJleHBvcnQgY2xhc3MgUGxheWVye1xuXG5cdGNvbnN0cnVjdG9yKG5hbWUsIGNvbG9yKXtcblx0XHR0aGlzLm5hbWUgPSBuYW1lO1xuXHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcblx0fVxuXG5cdGdldENvbG9yKCl7XG5cdFx0cmV0dXJuIHRoaXMuY29sb3I7XG5cdH1cblxuXHRnZXROYW1lKCl7XG5cdFx0cmV0dXJuIHRoaXMubmFtZTtcblx0fVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlcy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlcy5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlcy5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zY3NzL3N0eWxlcy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jb250YWluZXIge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aWR0aDogNDV2aDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggYmxhY2s7XFxuICBoZWlnaHQ6IDQ1dmg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVmMWVkOyB9XFxuXFxuLmJveCB7XFxuICB3aWR0aDogMTV2aDtcXG4gIGhlaWdodDogMTV2aDtcXG4gIGJveC1zaGFkb3c6IDAgMCAwcHggMXB4IGJsYWNrO1xcbiAgZmxvYXQ6IGxlZnQ7IH1cXG4gIC5ib3ggZGl2IHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgaGVpZ2h0OiA5MCU7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgICBtYXJnaW4tdG9wOiAxdmg7IH1cXG5cXG5oMiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3NyYy9zY3NzL3N0eWxlcy5zY3NzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9