import { QuillEditor } from "./QuillEditor.js";

export class ArticleForm {
  constructor() {
    this._articleEditorEl = document.getElementById("articleEditor");
    this._hiddenContentInput = document.querySelector(
      "input[name='articleContent']",
    );
    this.editor();
  }

  editor() {
    if (this._articleEditorEl) {
      this.articleEditor = new QuillEditor(this._articleEditorEl);
      this._hiddenContentInput.value = this.articleEditor.getSemanticHTML;
    }
  }
}
