(self["webpackChunkhsg_frontend"] = self["webpackChunkhsg_frontend"] || []).push([["src_components_SideNav_js"],{

/***/ "./src/components/SideNav.js":
/*!***********************************!*\
  !*** ./src/components/SideNav.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SideNav: () => (/* binding */ SideNav)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SideNav = /*#__PURE__*/function () {
  function SideNav() {
    _classCallCheck(this, SideNav);
    this._sideNavItems = document.querySelectorAll(".sideNavItem");
    if (!this._sideNavItems) {
      return;
    }
    this.activeState();
  }
  return _createClass(SideNav, [{
    key: "activeState",
    value: function activeState() {
      Array.from(this._sideNavItems).forEach(function (item) {
        var listItem = item.parentElement;
        var isActive = window.location.pathname === item.pathname;
        if (isActive) {
          listItem.setAttribute("data-active", "true");
          item.classList.add("bg-limeGreen");
        }
      });
    }
  }]);
}();

/***/ })

}])
//# sourceMappingURL=src_components_SideNav_js.bundle.js.map