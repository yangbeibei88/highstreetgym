import { Pagination } from "./FnPagination.js";
import { HTMLTemplate } from "./HTMLTemplate.js";

export class AccbookingsSearchAndFilter {
  constructor() {
    this._accbksSearchAndFilterEl = document.getElementById("myBookingFilters");
    this._statusFilterEl = document.querySelector(
      "#myBookingFilters #statusFilter",
    );
    this._classFilterEl = document.querySelector(
      "#myBookingFilters #classFilter",
    );
    this._bookingList = document.querySelector("#bookingList tbody");
    this._paginationContainer = document.querySelector(
      "#pagination-container-myBookings",
    );
    this.currentPage = 1;
    this.limit = 10;
    this.pagination = null;
    if (!this._accbksSearchAndFilterEl || !this._bookingList) {
      return;
    }

    this.handleSearchFilter();
    this.initializeListeners();
  }

  initializeListeners() {
    this._statusFilterEl.addEventListener("change", () =>
      this.handleSearchFilter(),
    );
    this._classFilterEl.addEventListener("change", () =>
      this.handleSearchFilter(),
    );
  }

  getSelectedStatuses() {
    const selectedStatuses = [];
    Array.from(this._statusFilterEl.selectedOptions).forEach((item) =>
      selectedStatuses.push(item.value),
    );

    return selectedStatuses;
  }

  getSelectedClasses() {
    const selectedClasses = [];
    Array.from(this._classFilterEl.selectedOptions).forEach((item) =>
      selectedClasses.push(item.value),
    );
    return selectedClasses;
  }

  buildQuery(page = this.currentPage, limit = this.limit) {
    const selectedStatuses = this.getSelectedStatuses();
    const selectedClasses = this.getSelectedClasses();
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return new URLSearchParams({
      status: selectedStatuses.length > 0 ? selectedStatuses.join(",") : "",
      classId: selectedClasses.length > 0 ? selectedClasses.join(",") : "",
      page,
      limit,
    }).toString();
  }

  async fetchBookings(query) {
    try {
      const res = await fetch(
        `/auth/account/manage-bookings/search-filter?${query}`,
      );
      const data = await res.json();
      console.log(data);
      this.updateBookingList(data.bookings);
      this.updatePagination(data.pagination);
    } catch (error) {
      console.error(`Fetch bookings error: `, error);
    }
  }

  handleSearchFilter(page = 1) {
    const query = this.buildQuery(page);
    this.fetchBookings(query);
  }

  updateBookingList(bookings) {
    this._bookingList.innerHTML = "";
    if (bookings.length === 0) {
      this._bookingList.textContent = "No bookings found.";
      return;
    }

    bookings.forEach((item) => {
      const row = document.createElement("tr");

      row.innerHTML = `
      ${new HTMLTemplate().rowHtmlTemplate("No#", new HTMLTemplate().linkHtmlTemplate(item.bookingNo, `/auth/account/booking-confirmation/${item.bookingId}`))}
      ${new HTMLTemplate().rowHtmlTemplate("member", `${item.userFirstName} ${item.userLastName}`)}
      ${new HTMLTemplate().rowHtmlTemplate("booking_date", new Date(item.createdAt).toLocaleString("en-AU", { hour12: false }))}
      ${new HTMLTemplate().rowHtmlTemplate("class_datetime", new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "long", timeZone: "Australia/Brisbane" }).format(new Date(item.startDateTime)))}
      ${new HTMLTemplate().rowHtmlTemplate("class", item.className)}
      ${new HTMLTemplate().rowHtmlTemplate("duration", `${item.duration} mins`)}
      ${new HTMLTemplate().rowHtmlTemplate("level", item.level)}
      ${new HTMLTemplate().rowHtmlTemplate("trainer", item.trainerFirstName)}
      ${new HTMLTemplate().rowHtmlTemplate("status", item.status)}
      `;

      this._bookingList.appendChild(row);
    });
  }

  updatePagination(paginationData) {
    if (this.pagination) {
      this._paginationContainer.innerHTML = "";
    }

    const { currentPage, totalPages, totalItems, limit } = paginationData;
    this.pagination = new Pagination({
      currentPage,
      totalPages,
      totalItems,
      limit,
      onPageChange: (page) => {
        this.handleSearchFilter(page);
      },
      paginationContainer: "#pagination-container-myBookings",
      captionContainer: "table#bookingList caption",
    });
    this.pagination.render();
  }
}
