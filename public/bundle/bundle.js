/******/ var __webpack_modules__ = ({});
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
/******/ 		792: 0
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

;// CONCATENATED MODULE: ./src/components/MainNav.js
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
;// CONCATENATED MODULE: ./src/components/Spinner.js
function Spinner_typeof(o) { "@babel/helpers - typeof"; return Spinner_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Spinner_typeof(o); }
function Spinner_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function Spinner_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, Spinner_toPropertyKey(o.key), o); } }
function Spinner_createClass(e, r, t) { return r && Spinner_defineProperties(e.prototype, r), t && Spinner_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function Spinner_toPropertyKey(t) { var i = Spinner_toPrimitive(t, "string"); return "symbol" == Spinner_typeof(i) ? i : i + ""; }
function Spinner_toPrimitive(t, r) { if ("object" != Spinner_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Spinner_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Spinner = /*#__PURE__*/function () {
  function Spinner() {
    Spinner_classCallCheck(this, Spinner);
    this._spinnerEl = document.getElementById("spinner");
    this.addEventListener();
  }
  return Spinner_createClass(Spinner, [{
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
;// CONCATENATED MODULE: ./src/components/FlashMessage.js
function FlashMessage_typeof(o) { "@babel/helpers - typeof"; return FlashMessage_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, FlashMessage_typeof(o); }
function FlashMessage_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function FlashMessage_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, FlashMessage_toPropertyKey(o.key), o); } }
function FlashMessage_createClass(e, r, t) { return r && FlashMessage_defineProperties(e.prototype, r), t && FlashMessage_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function FlashMessage_toPropertyKey(t) { var i = FlashMessage_toPrimitive(t, "string"); return "symbol" == FlashMessage_typeof(i) ? i : i + ""; }
function FlashMessage_toPrimitive(t, r) { if ("object" != FlashMessage_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != FlashMessage_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FlashMessage = /*#__PURE__*/function () {
  function FlashMessage() {
    FlashMessage_classCallCheck(this, FlashMessage);
    this._dismissBtns = document.querySelectorAll(".dismissBtn");
    this.addEventListener();
  }
  return FlashMessage_createClass(FlashMessage, [{
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
;// CONCATENATED MODULE: ./src/index.js
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-unused-vars */
// import "quill/dist/quill.snow.css";




document.addEventListener("DOMContentLoaded", function () {
  return new MainNav();
});
document.addEventListener("DOMContentLoaded", function () {
  return new FlashMessage();
});
document.addEventListener("DOMContentLoaded", function () {
  return new Spinner();
});

// const spinner = new Spinner();

// DYNAMIC IMPORT CHUNKS
document.addEventListener("DOMContentLoaded", function () {
  var chunkLoaders = [{
    match: function match(path) {
      return path === "/timetable";
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 389).then(__webpack_require__.bind(__webpack_require__, 389));
    },
    componentNames: ["TimetableSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/blog";
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 372).then(__webpack_require__.bind(__webpack_require__, 372));
    },
    componentNames: ["BlogSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/auth/admin/manage-users";
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 256).then(__webpack_require__.bind(__webpack_require__, 256));
    },
    componentNames: ["UsersSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/auth/account/manage-bookings";
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 327).then(__webpack_require__.bind(__webpack_require__, 327));
    },
    componentNames: ["AccbookingsSearchAndFilter"]
  }, {
    match: function match(path) {
      return path === "/auth/account/manage-articles";
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 425).then(__webpack_require__.bind(__webpack_require__, 425));
    },
    componentNames: ["CommentsDialog"]
  }, {
    match: function match(path) {
      return path === "/auth/admin/manage-timetable";
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 642).then(__webpack_require__.bind(__webpack_require__, 642));
    },
    componentNames: ["AdminTimetableSearchAndFilter"]
  }, {
    match: function match(path) {
      return /^\/auth\/account\/timetable\/\d+\/bookingForm$/.test(path);
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 526).then(__webpack_require__.bind(__webpack_require__, 526));
    },
    componentNames: ["BookingForm"]
  }, {
    match: function match(path) {
      return path === "/auth/admin/classForm/create" || /^\/auth\/admin\/classForm\/\d+\/edit$/.test(path);
    },
    load: function load() {
      return Promise.all(/* import() */[__webpack_require__.e(690), __webpack_require__.e(781)]).then(__webpack_require__.bind(__webpack_require__, 781));
    },
    componentNames: ["ClassForm"]
  }, {
    match: function match(path) {
      return path === "/auth/account/articleForm/create" || /^\/auth\/account\/articleForm\/\d+\/edit$/.test(path);
    },
    load: function load() {
      return Promise.all(/* import() */[__webpack_require__.e(690), __webpack_require__.e(351)]).then(__webpack_require__.bind(__webpack_require__, 351));
    },
    componentNames: ["ArticleForm"]
  }, {
    match: function match(path) {
      return /^\/auth\/(admin|account)(\/.*)?$/.test(path);
    },
    load: function load() {
      return __webpack_require__.e(/* import() */ 615).then(__webpack_require__.bind(__webpack_require__, 615));
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