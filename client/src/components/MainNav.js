export class MainNav {
  constructor() {
    this._navbarToggleBtn = document.getElementById("navbarToggle");
    this._mobileNavbarEl = document.querySelector("#mobile-mainnav");
    this._toggleOpen = document.getElementById("toggleOpen");
    this._toggleClosed = document.getElementById("toggleClosed");
    this.addEventListener();
  }

  addEventListener() {
    this._navbarToggleBtn.addEventListener("click", () => this.toggleHandler());
  }

  toggleHandler() {
    const isExpanded =
      this._navbarToggleBtn.getAttribute("aria-expanded") === "true";
    this._navbarToggleBtn.setAttribute("aria-expanded", !isExpanded);
    this._mobileNavbarEl.classList.toggle("translate-x-full");

    this._toggleClosed.classList.toggle("hidden");
    this._toggleOpen.classList.toggle("hidden");
  }
}
