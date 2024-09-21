(self["webpackChunkhsg_frontend"] = self["webpackChunkhsg_frontend"] || []).push([[526],{

/***/ 526:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingForm: () => (/* binding */ BookingForm)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BookingForm = /*#__PURE__*/function () {
  function BookingForm() {
    _classCallCheck(this, BookingForm);
    this._bookingConfirmCheckbox = document.getElementById("bookingConfirm");
    this._bookingSubmitBtn = document.getElementById("bookingSubmitBtn");
    this.addEventListener();
  }
  return _createClass(BookingForm, [{
    key: "addEventListener",
    value: function addEventListener() {
      if (this._bookingConfirmCheckbox) {
        this._bookingConfirmCheckbox.addEventListener("click", this.btnState.bind(this));
      }
    }
  }, {
    key: "btnState",
    value: function btnState() {
      if (this._bookingConfirmCheckbox.checked) {
        this._bookingSubmitBtn.disabled = false;
      } else {
        this._bookingSubmitBtn.disabled = true;
      }
    }
  }]);
}();

/***/ })

}])
//# sourceMappingURL=526.bundle.js.map