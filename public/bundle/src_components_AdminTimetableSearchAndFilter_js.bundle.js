(self["webpackChunkhsg_frontend"] = self["webpackChunkhsg_frontend"] || []).push([["src_components_AdminTimetableSearchAndFilter_js"],{

/***/ "./src/components/AdminTimetableSearchAndFilter.js":
/*!*********************************************************!*\
  !*** ./src/components/AdminTimetableSearchAndFilter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminTimetableSearchAndFilter: () => (/* binding */ AdminTimetableSearchAndFilter)
/* harmony export */ });
/* harmony import */ var _FnPagination_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FnPagination.js */ "./src/components/FnPagination.js");
/* harmony import */ var _HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HTMLTemplate.js */ "./src/components/HTMLTemplate.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var AdminTimetableSearchAndFilter = /*#__PURE__*/function () {
  function AdminTimetableSearchAndFilter() {
    _classCallCheck(this, AdminTimetableSearchAndFilter);
    this._ttSearchAndFilterEl = document.getElementById("manageTimetableFilters");
    this._classFilterEl = document.querySelector("#manageTimetableFilters #classFilter");
    this._statusEl = document.querySelector("#manageTimetableFilters #statusFilter");
    this._timetableList = document.querySelector("table#adminTimetableList tbody");
    this._paginationContainer = document.querySelector("#pagination-container-admin-timetable");
    this.pagination = null;
    if (!this._ttSearchAndFilterEl || !this._timetableList) {
      return;
    }
    this.handleSearchFilter();
    this.initializeListeners();
  }
  return _createClass(AdminTimetableSearchAndFilter, [{
    key: "initializeListeners",
    value: function initializeListeners() {
      var _this = this;
      this._classFilterEl.addEventListener("change", function () {
        return _this.handleSearchFilter();
      });
      this._statusEl.addEventListener("change", function () {
        return _this.handleSearchFilter();
      });
    }
  }, {
    key: "buildQuery",
    value: function buildQuery() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var classFilter = this._classFilterEl.value;
      var statusFilter = this._statusEl.value;

      // eslint-disable-next-line node/no-unsupported-features/node-builtins
      return new URLSearchParams({
        classId: classFilter || "",
        status: statusFilter || "active",
        page: page,
        limit: limit
      }).toString();
    }
  }, {
    key: "fetchTimetables",
    value: function () {
      var _fetchTimetables = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
        var res, data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch("/auth/admin/manage-timetable/search-filter?".concat(query));
            case 3:
              res = _context.sent;
              _context.next = 6;
              return res.json();
            case 6:
              data = _context.sent;
              this.updateTimetableList(data.timetables);
              // console.log(data.timetables);
              this.updatePagination(data.pagination);
              _context.next = 14;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              console.error("Fetch timetable error: ", _context.t0);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 11]]);
      }));
      function fetchTimetables(_x) {
        return _fetchTimetables.apply(this, arguments);
      }
      return fetchTimetables;
    }()
  }, {
    key: "handleSearchFilter",
    value: function handleSearchFilter() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var query = this.buildQuery(page);
      this.fetchTimetables(query);
    }
  }, {
    key: "editButtonHtml",
    value: function editButtonHtml(timetableId) {
      return "<a href=\"/auth/admin/timetableForm/".concat(timetableId, "/edit\" class=\"btn btn-sm btn-limeGreen\">\n        Edit\n      </a>");
    }
  }, {
    key: "updateTimetableList",
    value: function updateTimetableList(timetables) {
      var _this2 = this;
      this._timetableList.innerHTML = "";
      if (timetables.length === 0) {
        var row = document.createElement("tr");
        var noDataCell = document.createElement("td");
        noDataCell.colSpan = 10;
        noDataCell.textContent = "No timetable found.";
        row.appendChild(noDataCell);
        this._timetableList.appendChild(row);
        return;
      }
      timetables.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = "\n      ".concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("NO#", item.timetableNo), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("class", item.className), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("date", new Date(item.startDateTime).toLocaleString()), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("duration", item.duration), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("trainer", item.trainerFirstName), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("level", item.level), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("capacity", item.capacity), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("availability", item.availability), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("status", new Date(item.startDateTime) < Date.now() ? "finished" : "active"), "\n      ").concat((0,_HTMLTemplate_js__WEBPACK_IMPORTED_MODULE_1__.rowHtml)("edit", _this2.editButtonHtml(item.timetableId)), "\n      ");
        _this2._timetableList.appendChild(row);
      });
    }
  }, {
    key: "updatePagination",
    value: function updatePagination(paginationData) {
      var _this3 = this;
      // console.log("Fontend Pagination Data:", paginationData);

      // RE-NITIALIZE PAGINATION EVERYTIME NEW DATA IS FETCHED, OTHERWISE, THE PAGINATION NUMBERS WILL STAY AT THE FIRST TIME!
      if (this.pagination) {
        this._paginationContainer.innerHTML = "";
      }
      this.pagination = new _FnPagination_js__WEBPACK_IMPORTED_MODULE_0__.Pagination({
        currentPage: paginationData.currentPage,
        totalPages: paginationData.totalPages,
        totalItems: paginationData.totalItems,
        limit: paginationData.limit,
        onPageChange: function onPageChange(page) {
          _this3.handleSearchFilter(page);
        },
        paginationContainer: "#pagination-container-admin-timetable",
        captionContainer: "table#adminTimetableList caption"
      });
      this.pagination.render();
    }
  }]);
}();

/***/ }),

/***/ "./src/components/FnPagination.js":
/*!****************************************!*\
  !*** ./src/components/FnPagination.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Pagination: () => (/* binding */ Pagination)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Pagination = /*#__PURE__*/function () {
  function Pagination(_ref) {
    var currentPage = _ref.currentPage,
      totalPages = _ref.totalPages,
      totalItems = _ref.totalItems,
      limit = _ref.limit,
      onPageChange = _ref.onPageChange,
      paginationContainer = _ref.paginationContainer,
      _ref$captionContainer = _ref.captionContainer,
      captionContainer = _ref$captionContainer === void 0 ? "" : _ref$captionContainer;
    _classCallCheck(this, Pagination);
    // console.log("Pagination Constructor:", {
    //   currentPage,
    //   totalPages,
    //   totalItems,
    //   limit,
    // });
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.limit = limit;
    this.onPageChange = onPageChange;
    this._paginationContainer = document.querySelector(paginationContainer);
    this._captionContainer = document.querySelector(captionContainer);
  }
  return _createClass(Pagination, [{
    key: "render",
    value: function render() {
      var startIndex = this.totalItems > 0 ? (this.currentPage - 1) * this.limit + 1 : 0;
      var endIndex = Math.min(this.currentPage * this.limit, this.totalItems);
      var captionHtml = "\n        <!-- Showing X to Y of Z Entries -->\n      <span class=\"text-sm text-center text-darkCyan\">\n        Showing\n        <span class=\"font-semibold\">\n          ".concat(startIndex, "\n        </span>\n        to\n        <span class=\"font-semibold\">\n          ").concat(endIndex, "\n        </span>\n        of\n        <span class=\"font-semibold\">\n          ").concat(this.totalItems, "\n        </span>\n        Entries\n      </span>\n    ");
      var paginationHtml = "<div class=\"block py-4\">\n    <div class=\"flex flex-col items-center justify-center md:flex-row md:justify-between\">\n    <!-- Showing X to Y of Z Entries -->\n      <span class=\"text-sm text-center text-darkCyan\">\n        Showing\n        <span class=\"font-semibold\">\n          ".concat(startIndex, "\n        </span>\n        to\n        <span class=\"font-semibold\">\n          ").concat(endIndex, "\n        </span>\n        of\n        <span class=\"font-semibold\">\n          ").concat(this.totalItems, "\n        </span>\n        Entries\n      </span>\n  \n      <!-- Pagination Controls -->\n      <nav aria-label=\"page navigation\">\n        <ul class=\"flex flex-wrap items-center -space-x-px h-8 text-sm\">\n          <!-- First Button -->\n          <li>\n            <a href=\"#\" data-page=\"1\" class=\"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-darkCyan bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-limeGreen ").concat(this.currentPage === 1 ? "cursor-not-allowed opacity-50" : "", "\">\n              &laquo;&laquo; First\n            </a>\n          </li>\n  \n          <!-- Previous Button -->\n          <li>\n            <a href=\"#\" data-page=\"").concat(this.currentPage - 1, "\" class=\"flex items-center justify-center px-3 h-8 ms-0 leading-tight text-darkCyan bg-white border border-e-0 border-gray-300 hover:bg-limeGreen ").concat(this.currentPage === 1 ? "cursor-not-allowed opacity-50" : "", "\">\n              &laquo; Prev\n            </a>\n          </li>\n  \n          <!-- Numbered Pages -->\n          ").concat(this.renderPageNumbers(), "\n  \n          <!-- Next Button -->\n          <li>\n            <a href=\"#\" data-page=\"").concat(this.currentPage + 1, "\" class=\"flex items-center justify-center px-3 h-8 leading-tight text-darkCyan bg-white border border-gray-300 hover:bg-limeGreen ").concat(this.currentPage === this.totalPages || !this.totalPages ? "cursor-not-allowed opacity-50" : "", "\">\n              Next &raquo;\n            </a>\n          </li>\n  \n          <!-- Last Button -->\n          <li>\n            <a href=\"#\" data-page=\"").concat(this.totalPages, "\" class=\"flex items-center justify-center px-3 h-8 leading-tight text-darkCyan bg-white border border-gray-300 rounded-e-lg hover:bg-limeGreen ").concat(this.currentPage === this.totalPages || !this.totalPages ? "cursor-not-allowed opacity-50" : "", "\">\n              Last &raquo;&raquo;\n            </a>\n          </li>\n        </ul>\n      </nav>\n    </div>\n  </div >");
      this._paginationContainer.innerHTML = paginationHtml;
      this._captionContainer.innerHTML = captionHtml;
      this.attachListeners();
    }
  }, {
    key: "renderPageNumbers",
    value: function renderPageNumbers() {
      var pageNumbersHtml = "";
      // eslint-disable-next-line no-plusplus
      for (var i = 1; i <= this.totalPages; i++) {
        pageNumbersHtml += "\n        <li>\n          <a href=\"#\" data-page=\"".concat(i, "\" class=\"flex items-center justify-center px-3 h-8 leading-tight text-darkCyan border border-gray-300 hover:bg-limeGreen ").concat(this.currentPage === i ? "bg-limeGreen" : "bg-white", "\">").concat(i, "</a>\n        </li>\n      ");
      }
      return pageNumbersHtml;
    }
  }, {
    key: "attachListeners",
    value: function attachListeners() {
      var _this = this;
      var pageLinks = this._paginationContainer.querySelectorAll("a[data-page]");
      pageLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          var page = parseInt(link.getAttribute("data-page"), 10);
          if (page >= 1 && page <= _this.totalPages && page !== _this.currentPage) {
            _this.onPageChange(page);
          }
        });
      });
    }
  }, {
    key: "update",
    value: function update(currentPage) {
      this.currentPage = currentPage;
      this.render();
    }
  }]);
}();

/***/ }),

/***/ "./src/components/HTMLTemplate.js":
/*!****************************************!*\
  !*** ./src/components/HTMLTemplate.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avatarHtml: () => (/* binding */ avatarHtml),
/* harmony export */   linkHtml: () => (/* binding */ linkHtml),
/* harmony export */   rowHtml: () => (/* binding */ rowHtml)
/* harmony export */ });
var rowHtml = function rowHtml(field, value) {
  return "<td data-cell=".concat(field, " class='grid grid-cols-2 before:content-[attr(data-cell)] before:uppercase before:font-semibold md:text-center md:table-cell md:before:content-none'>").concat(value, "</td>");
};
var linkHtml = function linkHtml(text, path) {
  return "\n        <a href=\"".concat(path, "\" class=\"text-sm text-darkCyan underline underline-offset-2 decoration-dotted hover:brightness-125 hover:decoration-solid\">\n      ").concat(text, "\n    </a>\n    ");
};
var avatarHtml = function avatarHtml(path, alt) {
  return "\n  <img class=\"size-10 rounded-full\" src=".concat(path, " alt=").concat(alt, " />\n");
};

/***/ })

}])
//# sourceMappingURL=src_components_AdminTimetableSearchAndFilter_js.bundle.js.map