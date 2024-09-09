export class Pagination {
  constructor({
    currentPage,
    totalPages,
    totalItems,
    limit,
    onPageChange,
    container,
  }) {
    // // Debug: Log pagination constructor values
    // console.log("Pagination Constructor:", {
    //   currentPage,
    //   totalPages,
    //   totalItems,
    //   limit,
    // });
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.limit = limit;
    this.onPageChange = onPageChange;
    this._container = document.querySelector(container);
  }

  render() {
    const startIndex =
      this.totalItems > 0 ? (this.currentPage - 1) * this.limit + 1 : 0;
    const endIndex = Math.min(this.currentPage * this.limit, this.totalItems);

    const paginationHtml = `<div class="block py-4">
    <div class="flex flex-col items-center justify-center md:flex-row md:justify-between">
    <!-- Showing X to Y of Z Entries -->
      <span class="text-sm text-center text-darkCyan">
        Showing
        <span class="font-semibold">
          ${startIndex}
        </span>
        to
        <span class="font-semibold">
          ${endIndex}
        </span>
        of
        <span class="font-semibold">
          ${this.totalItems}
        </span>
        Entries
      </span>
  
      <!-- Pagination Controls -->
      <nav aria-label="page navigation">
        <ul class="flex flex-wrap items-center -space-x-px h-8 text-sm">
          <!-- First Button -->
          <li>
            <a href="#" data-page="1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-darkCyan bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-limeGreen ${this.currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}">
              &laquo;&laquo; First
            </a>
          </li>
  
          <!-- Previous Button -->
          <li>
            <a href="#" data-page="${this.currentPage - 1}" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-darkCyan bg-white border border-e-0 border-gray-300 hover:bg-limeGreen ${this.currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}">
              &laquo; Prev
            </a>
          </li>
  
          <!-- Numbered Pages -->
          ${this.renderPageNumbers()}
  
          <!-- Next Button -->
          <li>
            <a href="#" data-page="${this.currentPage + 1}" class="flex items-center justify-center px-3 h-8 leading-tight text-darkCyan bg-white border border-gray-300 hover:bg-limeGreen ${this.currentPage === this.totalPages || !this.totalPages ? "cursor-not-allowed opacity-50" : ""}">
              Next &raquo;
            </a>
          </li>
  
          <!-- Last Button -->
          <li>
            <a href="#" data=page="${this.totalPages}" class="flex items-center justify-center px-3 h-8 leading-tight text-darkCyan bg-white border border-gray-300 rounded-e-lg hover:bg-limeGreen ${this.currentPage === this.totalPages || !this.totalPages ? "cursor-not-allowed opacity-50" : ""}">
              Last &raquo;&raquo;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div >`;

    this._container.innerHTML = paginationHtml;

    this.attachListeners();
  }

  renderPageNumbers() {
    let pageNumbersHtml = "";
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbersHtml += `
        <li>
          <a href="#" data-page="${i}" class="flex items-center justify-center px-3 h-8 leading-tight text-darkCyan border border-gray-300 hover:bg-limeGreen ${this.currentPage === i ? "bg-limeGreen" : "bg-white"}">${i}</a>
        </li>
      `;
    }

    return pageNumbersHtml;
  }

  attachListeners() {
    const pageLinks = this._container.querySelectorAll("a[data-page]");

    pageLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute("data-page"), 10);

        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
          this.onPageChange(page);
        }
      });
    });
  }

  update(currentPage) {
    this.currentPage = currentPage;
    this.render();
  }
}
