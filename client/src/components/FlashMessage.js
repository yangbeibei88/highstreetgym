export class FlashMessage {
  constructor() {
    this._dismissBtns = document.querySelectorAll(".dismissBtn");
    this.addEventListener();
  }

  addEventListener() {
    this._dismissBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const flashContainerEl = btn.closest("#flashContainer");
        if (flashContainerEl) {
          flashContainerEl.remove();
        }
      });
    });
  }
}
