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
        window.alert("You can only upload images");
      }
    };
  }

  // TODO: ADD TO SERVER
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
