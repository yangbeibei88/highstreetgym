(self["webpackChunkhsg_frontend"] = self["webpackChunkhsg_frontend"] || []).push([["src_components_CommentsDialog_js"],{

/***/ "./src/components/CommentsDialog.js":
/*!******************************************!*\
  !*** ./src/components/CommentsDialog.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentsDialog: () => (/* binding */ CommentsDialog)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CommentsDialog = /*#__PURE__*/function () {
  function CommentsDialog() {
    _classCallCheck(this, CommentsDialog);
    this._dialogOpenBtnEls = document.querySelectorAll(".articleCommentsDialogBtn");
    this._dialogCloseBtnEls = document.querySelectorAll(".articleCommentsCloseBtn");
    this.addOpenEventListener();
    this.addCloseEventListener();
  }
  return _createClass(CommentsDialog, [{
    key: "addOpenEventListener",
    value: function addOpenEventListener() {
      this._dialogOpenBtnEls.forEach(function (btn) {
        var articleId = btn.getAttribute("data-articleid");
        var articleCommentsDialogEl = document.getElementById("articleCommentsDialog-".concat(articleId));
        if (articleCommentsDialogEl) {
          btn.addEventListener("click", function () {
            // console.log(articleCommentsDialogEl);
            articleCommentsDialogEl.showModal();
          });
        }
      });
    }
  }, {
    key: "addCloseEventListener",
    value: function addCloseEventListener() {
      this._dialogCloseBtnEls.forEach(function (btn) {
        var articleCommentsDialogEl = btn.closest(".articleCommentsDialog");
        if (articleCommentsDialogEl) {
          btn.addEventListener("click", function () {
            articleCommentsDialogEl.close();
          });
        }
      });
    }
  }]);
}();

/***/ })

}])
//# sourceMappingURL=src_components_CommentsDialog_js.bundle.js.map