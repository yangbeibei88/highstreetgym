export class SideNav {
  constructor() {
    this._sideNavItems = document.querySelectorAll(".sideNavItem");
    if (!this._sideNavItems) {
      return;
    }
    this.activeState();
  }

  activeState() {
    Array.from(this._sideNavItems).forEach((item) => {
      const listItem = item.parentElement;
      const isActive = window.location.pathname === item.pathname;

      if (isActive) {
        listItem.setAttribute("data-active", "true");
        item.classList.add("bg-limeGreen");
      }
    });
  }
}
