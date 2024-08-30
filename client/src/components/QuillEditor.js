import Quill from "quill";

export class QuillEditor {
  constructor(editorEl, hiddenInputEl, initialContent = "") {
    this.editorEl = editorEl;
    this.hiddenInputEl = hiddenInputEl;
    this.editor = new Quill(this.editorEl, {
      modules: {
        toolbar: [
          ["bold", "italic"],
          ["link", "blockquote", "code-block", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
      placeholder: "Compose an epic...",
      theme: "snow",
    });

    // If there's initial content (e.g., sanitized HTML), set it in the editor
    if (initialContent) {
      this.editor.clipboard.dangerouslyPasteHTML(initialContent);
    }

    this.addOnEvent();
  }

  addOnEvent() {
    this.editor.on("text-change", this.assignValue.bind(this));
  }

  assignValue() {
    this.hiddenInputEl.value = this.editor.root.innerHTML;
  }
}

// export class QuillEditor {
//   constructor() {
//     this._textareas = document.querySelectorAll(".quill-editor");
//     this.addEventListener();
//   }

//   addEventListener() {
//     document.addEventListener("DOMContentLoaded", this.insertQuill.bind(this));
//   }

//   insertQuill() {
//     this._textareas.forEach((textarea) => {
//       const editor = document.createElement("div");
//       editor.innerHTML = textarea.value;
//       textarea.parentNode.insertBefore(editor, textarea);
//       textarea.style.display = "none";
//       editor.style.height = "300px";

//       const quill = new Quill(editor, {
//         modules: {
//           toolbar: [
//             ["bold", "italic"],
//             ["link", "blockquote", "code-block", "image"],
//             [{ list: "ordered" }, { list: "bullet" }],
//           ],
//         },
//         placeholder: "Compose an epic...",
//         theme: "snow",
//       });

//       quill.on("text-change", () => {
//         textarea.value = quill.root.innerHTML;
//       });
//     });
//   }
// }
