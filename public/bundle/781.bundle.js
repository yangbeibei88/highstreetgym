(self["webpackChunkhsg_frontend"] = self["webpackChunkhsg_frontend"] || []).push([[781],{

/***/ 781:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClassForm: () => (/* binding */ ClassForm)
/* harmony export */ });
/* harmony import */ var _QuillEditor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(239);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var ClassForm = /*#__PURE__*/function () {
  function ClassForm() {
    _classCallCheck(this, ClassForm);
    this._classEditorEl = document.getElementById("classEditor");
    this._hiddenContentInput = document.getElementById("longDesc");
    this.editor();
  }
  return _createClass(ClassForm, [{
    key: "editor",
    value: function editor() {
      if (this._classEditorEl) {
        this.classEditor = new _QuillEditor_js__WEBPACK_IMPORTED_MODULE_0__/* .QuillEditor */ .t(this._classEditorEl, this._hiddenContentInput);
      }
    }
  }]);
}();

/***/ }),

/***/ 239:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ QuillEditor)
/* harmony export */ });
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(690);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var QuillEditor = /*#__PURE__*/function () {
  function QuillEditor(editorEl, hiddenInputEl) {
    _classCallCheck(this, QuillEditor);
    this.editorEl = editorEl;
    this.hiddenInputEl = hiddenInputEl;
    this.editor = new quill__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay(this.editorEl, {
      modules: {
        toolbar: [["bold", "italic"], [{
          size: ["small", false, "large", "huge"]
        }], [{
          header: [2, 3, 4, 5, 6, false]
        }], ["link", "blockquote", "code-block"], [{
          list: "ordered"
        }, {
          list: "bullet"
        }],
        // remove format button
        ["clean"]]
      },
      placeholder: "Compose an epic...",
      theme: "snow"
    });

    // this.editor.getModule("toolbar").addHandler("image", () => {
    //   this.selectLocalImage();
    // });

    // If there's initial content (e.g., sanitized HTML), set it in the editor
    // if (initialContent) {
    //   this.editor.clipboard.dangerouslyPasteHTML(initialContent);
    // }

    this.addOnEvent();
  }
  return _createClass(QuillEditor, [{
    key: "addOnEvent",
    value: function addOnEvent() {
      this.editor.on("text-change", this.assignValue.bind(this));
    }
  }, {
    key: "assignValue",
    value: function assignValue() {
      this.hiddenInputEl.value = this.editor.root.innerHTML;
    }

    // selectLocalImage() {
    //   const input = document.createElement("input");
    //   input.setAttribute("type", "file");
    //   input.setAttribute("accept", "image/*");
    //   input.click();

    //   input.onchange = () => {
    //     const file = input.files[0];
    //     console.log("clicked image upload");
    //     if (/image\//.test(file.type)) {
    //       this.saveToServer(file);
    //     } else {
    //       window.alert("You can only upload images");
    //     }
    //   };
    // }

    // // TODO: ADD TO SERVER
    // async saveToServer(file) {
    //   const formData = new FormData();
    //   formData.append("image", file);
    //   try {
    //     const res = await fetch("/images/blog", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     const data = await res.json();
    //     if (data && data.url) {
    //       this.insertToEditor(data.url);
    //     }
    //   } catch (error) {
    //     console.error("Failed to upload image", error);
    //   }
    // }

    // insertToEditor(url) {
    //   const range = this.editor.getSelection();
    //   this.editor.insertEmbed(range.index, "image", url);
    // }
  }]);
}();

/***/ })

}])
//# sourceMappingURL=781.bundle.js.map