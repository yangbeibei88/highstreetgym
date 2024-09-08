export class Spinner {
  constructor() {
    this._spinnerEl = document.getElementById("spinner");
    this.addEventListener();
  }

  addEventListener() {
    document.addEventListener(
      "DOMContentLoaded",
      window.addEventListener("beforeunload", this.addBeforeunload.bind(this)),
    );
  }

  addBeforeunload() {
    this._spinnerEl.classList.remove("hidden");
  }
}
