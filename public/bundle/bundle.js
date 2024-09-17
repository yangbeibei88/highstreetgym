/******/ var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/FlashMessage.js":
/*!****************************************!*\
  !*** ./src/components/FlashMessage.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlashMessage: () => (/* binding */ FlashMessage)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FlashMessage = /*#__PURE__*/function () {
  function FlashMessage() {
    _classCallCheck(this, FlashMessage);
    this._dismissBtns = document.querySelectorAll(".dismissBtn");
    this.addEventListener();
  }
  return _createClass(FlashMessage, [{
    key: "addEventListener",
    value: function addEventListener() {
      this._dismissBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var flashContainerEl = btn.closest("#flashContainer");
          if (flashContainerEl) {
            flashContainerEl.remove();
          }
        });
      });
    }
  }]);
}();

/***/ }),

/***/ "./src/components/MainNav.js":
/*!***********************************!*\
  !*** ./src/components/MainNav.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainNav: () => (/* binding */ MainNav)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MainNav = /*#__PURE__*/function () {
  function MainNav() {
    _classCallCheck(this, MainNav);
    this._navbarToggleBtn = document.getElementById("navbarToggle");
    this._mobileNavbarEl = document.querySelector("#mobile-mainnav");
    this._toggleOpen = document.getElementById("toggleOpen");
    this._toggleClosed = document.getElementById("toggleClosed");
    this.addEventListener();
  }
  return _createClass(MainNav, [{
    key: "addEventListener",
    value: function addEventListener() {
      var _this = this;
      this._navbarToggleBtn.addEventListener("click", function () {
        return _this.toggleHandler();
      });
    }
  }, {
    key: "toggleHandler",
    value: function toggleHandler() {
      var isExpanded = this._navbarToggleBtn.getAttribute("aria-expanded") === "true";
      this._navbarToggleBtn.setAttribute("aria-expanded", !isExpanded);
      this._mobileNavbarEl.classList.toggle("translate-x-full");
      this._toggleClosed.classList.toggle("hidden");
      this._toggleOpen.classList.toggle("hidden");
    }
  }]);
}();

/***/ }),

/***/ "./src/components/Spinner.js":
/*!***********************************!*\
  !*** ./src/components/Spinner.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Spinner: () => (/* binding */ Spinner)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Spinner = /*#__PURE__*/function () {
  function Spinner() {
    _classCallCheck(this, Spinner);
    this._spinnerEl = document.getElementById("spinner");
    this.addEventListener();
  }
  return _createClass(Spinner, [{
    key: "addEventListener",
    value: function addEventListener() {
      document.addEventListener("DOMContentLoaded", window.addEventListener("beforeunload", this.addBeforeunload.bind(this)));
    }
  }, {
    key: "addBeforeunload",
    value: function addBeforeunload() {
      this._spinnerEl.classList.remove("hidden");
    }
  }]);
}();

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		loaded: false,
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Flag the module as loaded
/******/ 	module.loaded = true;
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __webpack_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/ensure chunk */
/******/ (() => {
/******/ 	__webpack_require__.f = {};
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = (chunkId) => {
/******/ 		return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 			__webpack_require__.f[key](chunkId, promises);
/******/ 			return promises;
/******/ 		}, []));
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + chunkId + ".bundle.js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get mini-css chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.miniCssF = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return undefined;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/load script */
/******/ (() => {
/******/ 	var inProgress = {};
/******/ 	var dataWebpackPrefix = "hsg_frontend:";
/******/ 	// loadScript function to load a script via script tag
/******/ 	__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 		if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 		var script, needAttach;
/******/ 		if(key !== undefined) {
/******/ 			var scripts = document.getElementsByTagName("script");
/******/ 			for(var i = 0; i < scripts.length; i++) {
/******/ 				var s = scripts[i];
/******/ 				if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 			}
/******/ 		}
/******/ 		if(!script) {
/******/ 			needAttach = true;
/******/ 			script = document.createElement('script');
/******/ 			script.type = "module";
/******/ 			script.charset = 'utf-8';
/******/ 			script.timeout = 120;
/******/ 			if (__webpack_require__.nc) {
/******/ 				script.setAttribute("nonce", __webpack_require__.nc);
/******/ 			}
/******/ 			script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 	
/******/ 			script.src = url;
/******/ 		}
/******/ 		inProgress[url] = [done];
/******/ 		var onScriptComplete = (prev, event) => {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var doneFns = inProgress[url];
/******/ 			delete inProgress[url];
/******/ 			script.parentNode && script.parentNode.removeChild(script);
/******/ 			doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 			if(prev) return prev(event);
/******/ 		}
/******/ 		var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 		script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 		script.onload = onScriptComplete.bind(null, script.onload);
/******/ 		needAttach && document.head.appendChild(script);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/node module decorator */
/******/ (() => {
/******/ 	__webpack_require__.nmd = (module) => {
/******/ 		module.paths = [];
/******/ 		if (!module.children) module.children = [];
/******/ 		return module;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/publicPath */
/******/ (() => {
/******/ 	__webpack_require__.p = "/bundle/";
/******/ })();
/******/ 
/******/ /* webpack/runtime/jsonp chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/ 	
/******/ 	__webpack_require__.f.j = (chunkId, promises) => {
/******/ 			// JSONP chunk loading for javascript
/******/ 			var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 			if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 	
/******/ 				// a Promise means "currently loading".
/******/ 				if(installedChunkData) {
/******/ 					promises.push(installedChunkData[2]);
/******/ 				} else {
/******/ 					if(true) { // all chunks have JS
/******/ 						// setup Promise in chunk cache
/******/ 						var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 						promises.push(installedChunkData[2] = promise);
/******/ 	
/******/ 						// start chunk loading
/******/ 						var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 						// create error before stack unwound to get useful stacktrace later
/******/ 						var error = new Error();
/******/ 						var loadingEnded = (event) => {
/******/ 							if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 								installedChunkData = installedChunks[chunkId];
/******/ 								if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 								if(installedChunkData) {
/******/ 									var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 									var realSrc = event && event.target && event.target.src;
/******/ 									error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 									error.name = 'ChunkLoadError';
/******/ 									error.type = errorType;
/******/ 									error.request = realSrc;
/******/ 									installedChunkData[1](error);
/******/ 								}
/******/ 							}
/******/ 						};
/******/ 						__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 	};
/******/ 	
/******/ 	// no prefetching
/******/ 	
/******/ 	// no preloaded
/******/ 	
/******/ 	// no HMR
/******/ 	
/******/ 	// no HMR manifest
/******/ 	
/******/ 	// no on chunks loaded
/******/ 	
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 		var [chunkIds, moreModules, runtime] = data;
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 		}
/******/ 		if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 	
/******/ 	}
/******/ 	
/******/ 	var chunkLoadingGlobal = self["webpackChunkhsg_frontend"] = self["webpackChunkhsg_frontend"] || [];
/******/ 	chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 	chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _components_MainNav_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/MainNav.js */ "./src/components/MainNav.js");
/* harmony import */ var _components_Spinner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Spinner.js */ "./src/components/Spinner.js");
/* harmony import */ var _components_FlashMessage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FlashMessage.js */ "./src/components/FlashMessage.js");
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-unused-vars */
// import "quill/dist/quill.snow.css";




document.addEventListener("DOMContentLoaded", function () {
  return new _components_MainNav_js__WEBPACK_IMPORTED_MODULE_1__.MainNav();
});
document.addEventListener("DOMContentLoaded", function () {
  return new _components_FlashMessage_js__WEBPACK_IMPORTED_MODULE_3__.FlashMessage();
});
document.addEventListener("DOMContentLoaded", function () {
  return new _components_Spinner_js__WEBPACK_IMPORTED_MODULE_2__.Spinner();
});

// const spinner = new Spinner();

// DYNAMIC IMPORT CHUNKS
document.addEventListener("DOMContentLoaded", function () {
  var chunkLoaders = [{
    match: function match(path) {
      return path === "/timetable";
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_TimetableSearchAndFilter_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/TimetableSearchAndFilter.js */ "./src/components/TimetableSearchAndFilter.js"));
    },
    componentNames: ["TimetableSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/blog";
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_BlogSearchAndFilter_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/BlogSearchAndFilter.js */ "./src/components/BlogSearchAndFilter.js"));
    },
    componentNames: ["BlogSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/auth/admin/manage-users";
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_UsersSearchAndFilter_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/UsersSearchAndFilter.js */ "./src/components/UsersSearchAndFilter.js"));
    },
    componentNames: ["UsersSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/auth/account/manage-bookings";
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_AccbookingsSearchAndFilter_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/AccbookingsSearchAndFilter.js */ "./src/components/AccbookingsSearchAndFilter.js"));
    },
    componentNames: ["AccbookingsSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/auth/account/manage-articles";
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_CommentsDialog_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/CommentsDialog.js */ "./src/components/CommentsDialog.js"));
    },
    componentNames: ["CommentsDialog"]
  }, {
    match: function match(path) {
      return path === "/auth/admin/manage-timetable";
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_AdminTimetableSearchAndFilter_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/AdminTimetableSearchAndFilter.js */ "./src/components/AdminTimetableSearchAndFilter.js"));
    },
    componentNames: ["AdminTimetableSearchAndFilter"]
  }, {
    match: function match(path) {
      return /^\/auth\/account\/timetable\/\d+\/bookingForm$/.test(path);
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_BookingForm_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/BookingForm.js */ "./src/components/BookingForm.js"));
    },
    componentNames: ["BookingForm"]
  }, {
    match: function match(path) {
      return path === "/auth/admin/classForm/create" || /^\/auth\/admin\/classForm\/\d+\/edit$/.test(path);
    },
    load: function load() {
      return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_quill_quill_js"), __webpack_require__.e("src_components_QuillEditor_js"), __webpack_require__.e("src_components_ClassForm_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ClassForm.js */ "./src/components/ClassForm.js"));
    },
    componentNames: ["ClassForm"]
  }, {
    match: function match(path) {
      return path === "/auth/account/articleForm/create" || /^\/auth\/account\/articleForm\/\d+\/edit$/.test(path);
    },
    load: function load() {
      return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_quill_quill_js"), __webpack_require__.e("src_components_QuillEditor_js"), __webpack_require__.e("src_components_ArticleForm_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/ArticleForm.js */ "./src/components/ArticleForm.js"));
    },
    componentNames: ["ArticleForm"]
  }, {
    match: function match(path) {
      return /^\/auth\/(admin|account)(\/.*)?$/.test(path);
    },
    load: function load() {
      return __webpack_require__.e(/*! import() */ "src_components_SideNav_js").then(__webpack_require__.bind(__webpack_require__, /*! ./components/SideNav.js */ "./src/components/SideNav.js"));
    },
    componentNames: ["SideNav"]
  }];
  chunkLoaders.forEach(function (_ref) {
    var match = _ref.match,
      load = _ref.load,
      componentNames = _ref.componentNames;
    if (match(window.location.pathname)) {
      load().then(function (module) {
        componentNames.forEach(function (componentName) {
          var Component = module[componentName];
          if (Component) {
            var component = new Component();
          } else {
            console.log("Component ".concat(componentName, " not found in module."));
          }
        });
      })["catch"](console.error);
    }
  });
});

//# sourceMappingURL=bundle.js.map