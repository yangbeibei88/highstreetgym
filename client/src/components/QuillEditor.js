import Quill from "quill";

export class QuillEditor {
  constructor(editorEl, hiddenInputEl) {
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

    this.editor.getModule("toolbar").addHandler("image", () => {
      this.selectLocalImage();
    });

    // If there's initial content (e.g., sanitized HTML), set it in the editor
    // if (initialContent) {
    //   this.editor.clipboard.dangerouslyPasteHTML(initialContent);
    // }

    this.addOnEvent();
  }

  addOnEvent() {
    this.editor.on("text-change", this.assignValue.bind(this));
  }

  assignValue() {
    this.hiddenInputEl.value = this.editor.root.innerHTML;
  }

  selectLocalImage() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      console.log("clicked image upload");
      if (/îmage\//.test(file.type)) {
        this.saveToServer(file);
      } else {
        console.warn("You can only upload images");
      }
    };
  }

  async saveToServer(file) {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/images/blog", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data && data.url) {
        this.insertToEditor(data.url);
      }
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  }

  insertToEditor(url) {
    const range = this.editor.getSelection();
    this.editor.insertEmbed(range.index, "image", url);
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
