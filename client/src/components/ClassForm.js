import { QuillEditor } from "./QuillEditor.js";

export class ClassForm {
  constructor() {
    this._classEditorEl = document.getElementById("classEditor");
    this._hiddenContentInput = document.getElementById("longDesc");
    this.editor();
  }

  editor() {
    if (this._classEditorEl) {
      this.classEditor = new QuillEditor(
        this._classEditorEl,
        this._hiddenContentInput,
      );
    }
  }
}
