(self["webpackChunkhsg_frontend"] = self["webpackChunkhsg_frontend"] || []).push([["src_components_BlogSearchAndFilter_js"],{

/***/ "./src/components/BlogSearchAndFilter.js":
/*!***********************************************!*\
  !*** ./src/components/BlogSearchAndFilter.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlogSearchAndFilter: () => (/* binding */ BlogSearchAndFilter)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BlogSearchAndFilter = /*#__PURE__*/function () {
  function BlogSearchAndFilter() {
    _classCallCheck(this, BlogSearchAndFilter);
    this._topicFilterEl = document.querySelector("#articleFilter #topicFilter");
    this._visFilterEl = document.querySelector("#articleFilter #visFilter");
    this._articleList = document.querySelector("#blog #articleList");
    this._blogFilterEls = document.querySelectorAll("#blogFilterBy details");
    if (!this._topicFilterEl || !this._articleList) {
      return;
    }
    this.handleSearchFilter();
    this.initializeListeners();
    this.toggleFilters();
  }
  return _createClass(BlogSearchAndFilter, [{
    key: "initializeListeners",
    value: function initializeListeners() {
      var _this = this;
      this._topicFilterEl.addEventListener("change", function () {
        return _this.handleSearchFilter();
      });
      if (this._visFilterEl) {
        this._visFilterEl.addEventListener("change", function () {
          return _this.handleSearchFilter();
        });
      }
      window.addEventListener("resize", function () {
        return _this.toggleFilters();
      });
    }
  }, {
    key: "toggleFilters",
    value: function toggleFilters() {
      var screenWidth = window.innerWidth;
      this._blogFilterEls.forEach(function (el) {
        if (screenWidth < 768) {
          el.removeAttribute("open");
        } else {
          el.setAttribute("open", "");
        }
      });
    }
  }, {
    key: "getSelectedTopics",
    value: function getSelectedTopics() {
      var selectedTopics = [];
      var checkBoxes = this._topicFilterEl.querySelectorAll("input[type='checkbox']:checked");
      checkBoxes.forEach(function (checkbox) {
        return selectedTopics.push(checkbox.value);
      });
      return selectedTopics;
    }
  }, {
    key: "getSelectedViss",
    value: function getSelectedViss() {
      var selectedViss = [];
      var checkBoxes;
      if (this._visFilterEl) {
        checkBoxes = this._visFilterEl.querySelectorAll("input[type='checkbox']:checked");
      }
      if (checkBoxes) {
        checkBoxes.forEach(function (checkbox) {
          return selectedViss.push(checkbox.value);
        });
      }
      return selectedViss;
    }
  }, {
    key: "buildQuery",
    value: function buildQuery() {
      var selectedTopics = this.getSelectedTopics();
      var selectedViss = this.getSelectedViss();
      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      return new URLSearchParams({
        topics: selectedTopics.length > 0 ? selectedTopics.join(",") : "",
        visibilities: selectedViss.length > 0 ? selectedViss.join(",") : ""
      }).toString();
    }
  }, {
    key: "fetchArticles",
    value: function () {
      var _fetchArticles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
        var res, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch("/blog/search-filter?".concat(query));
            case 3:
              res = _context.sent;
              _context.next = 6;
              return res.json();
            case 6:
              data = _context.sent;
              // console.log(data);
              this.updateArticleList(data.articles);
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error("Fetch articles error: ", _context.t0);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 10]]);
      }));
      function fetchArticles(_x) {
        return _fetchArticles.apply(this, arguments);
      }
      return fetchArticles;
    }()
  }, {
    key: "handleSearchFilter",
    value: function handleSearchFilter() {
      var query = this.buildQuery();
      this.fetchArticles(query);
    }
  }, {
    key: "updateArticleList",
    value: function updateArticleList(articles) {
      var _this2 = this;
      this._articleList.innerHTML = "";
      if (articles.length === 0) {
        this._articleList.textContent = "No article found.";
        return;
      }
      articles.forEach(function (item) {
        var row = document.createElement("article");
        row.innerHTML = "\n            <img\n          src=\"/images/blog/".concat(item.imageCover, "\"\n          alt=\"").concat(item.articleTitle, "\"\n          class=\"max-h-52 object-cover rounded-t-lg md:max-h-full md:rounded-tr-none md:rounded-l-lg md:w-1/3\">\n        <div\n          class=\"w-full py-4 px-2 flex flex-col md:w-2/3\">\n          <small\n            class=\"text-xs font-semibold bg-orange-700 text-white rounded-full w-fit px-3 py-1\">").concat(item.topicName, "</small>\n          <h2 class=\"text-xl\">").concat(item.articleTitle, "</h2>\n          <div class=\"shortDesc\">\n            <div class=\"line-clamp-3\">").concat(item.articleContent, "</div>\n          <div>\n          <div\n            class=\"w-full flex flex-col items-center justify-between lg:flex-row\">\n            <div\n              class=\"flex items-center space-x-2 mr-auto\">\n              <img\n                src=\"/images/users/").concat(item.avatar, "\"\n                alt=\"").concat(item.firstName, "\"\n                class=\"size-8 rounded-full border border-darkCyan object-cover md:size-12\">\n              <small class=\"text-xs\">").concat(item.firstName, " ").concat(item.lastName, "</small>\n              <small\n                class=\"text-xs\">").concat(new Date(item.createdAt).toLocaleDateString("en-AU"), "</small>\n            </div>\n            <a class=\"btn-bullet btn-limeGreen btn-sm ml-auto\"\n              href=\"/blog/").concat(item.articleId, "\">\n              Read\n              More &gt;&gt;</a>\n          </div>\n        </div>\n      ");
        row.classList = "flex flex-col rounded-lg bg-white shadow md:flex-row md:space-x-4";
        _this2._articleList.appendChild(row);
      });
    }
  }]);
}();

/***/ })

}])
//# sourceMappingURL=src_components_BlogSearchAndFilter_js.bundle.js.map