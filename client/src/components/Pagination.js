export class Pagination {
  constructor({
    currentPage,
    totalPages,
    totalItems,
    limit,
    onPageChange,
    container,
  }) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.limit = limit;
    this.onPageChange = onPageChange;
    this._container = document.querySelector(container);
  }

  render() {
    const startIndex = (this.currentPage - 1) * this.limit + 1;
    const endIndex = Math.min(this.currentPage * this.limit, this.totalItems);

    const paginationHtml = `<div class="block py-4">
    <div class="flex flex-col items-center justify-center md:flex-row md:justify-between">
    <!-- Showing X to Y of Z Entries -->
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">
          ${startIndex}
        <span>
        to
        <span class="font-semibold text-gray-900 dark:text-white">
          ${endIndex}
        <span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">
          ${this.totalItems}
        <span>
        Entries
      </span>
  
      <!-- Pagination Controls -->
      <nav aria-label="page navigation">
        <ul class="flex items-center -space-x-px h-8 text-sm">
          <!-- First Button -->
          <li>
            <a href="?page=1" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              &laquo;&laquo; First
            </a>
          </li>
  
          <!-- Previous Button -->
          <li>
            <a href="?page=${this.currentPage - 1}" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${this.currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}">
              &laquo; Prev
            </a>
          </li>
  
          <!-- Numbered Pages -->
          ${this.renderPageNumbers()}
  
          <!-- Next Button -->
          <li>
            <a href="${this.currentPage + 1}" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${this.currentPage === this.totalPages ? "cursor-not-allowed opacity-50" : ""}">
              Next &raquo;
            </a>
          </li>
  
          <!-- Last Button -->
          <li>
            <a href="${this.totalPages}" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${this.currentPage === this.totalPages ? "cursor-not-allowed opacity-50" : ""}">
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
          <a href="#" data-page="${i}" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${this.currentPage === i ? "bg-limeGreen text-darkCyan" : ""}">${i}</a>
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
