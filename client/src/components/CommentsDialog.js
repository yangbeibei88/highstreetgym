export class CommentsDialog {
  constructor() {
    this._dialogOpenBtnEls = document.querySelectorAll(
      ".articleCommentsDialogBtn",
    );
    this._dialogCloseBtnEls = document.querySelectorAll(
      ".articleCommentsCloseBtn",
    );
    this.addOpenEventListener();
    this.addCloseEventListener();
  }

  addOpenEventListener() {
    this._dialogOpenBtnEls.forEach((btn) => {
      const articleId = btn.getAttribute("data-articleid");
      const articleCommentsDialogEl = document.getElementById(
        `articleCommentsDialog-${articleId}`,
      );
      if (articleCommentsDialogEl) {
        btn.addEventListener("click", () => {
          // console.log(articleCommentsDialogEl);
          articleCommentsDialogEl.showModal();
        });
      }
    });
  }

  addCloseEventListener() {
    this._dialogCloseBtnEls.forEach((btn) => {
      const articleCommentsDialogEl = btn.closest(".articleCommentsDialog");

      if (articleCommentsDialogEl) {
        btn.addEventListener("click", () => {
          articleCommentsDialogEl.close();
        });
      }
    });
  }
}
