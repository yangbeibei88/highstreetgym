import Quill from "quill";

export class ArticleForm {
  constructor() {
    this._articleEditorEl = document.getElementById("article-editor");
    this.editor();
  }

  editor() {
    if (this._articleEditorEl) {
      // eslint-disable-next-line no-unused-vars
      this.articleEditor = new Quill(this._articleEditorEl, {
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
    }
  }
}
