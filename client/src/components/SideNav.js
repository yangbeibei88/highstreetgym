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
      let pathnames = [window.location.pathname, item.pathname];
      // const windowLocationPathname = window.location.pathname;
      pathnames = pathnames.map((pn) => {
        if (pn.slice(-1) !== "/") {
          pn += "/";
        }
        return pn;
      });

      const isActive = pathnames[0] === pathnames[1];

      if (isActive) {
        listItem.setAttribute("data-active", "true");
        item.classList.add("bg-limeGreen");
      }
    });
  }
}
