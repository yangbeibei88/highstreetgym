import { Pagination } from "./FnPagination.js";

export class TimetableSearchAndFilter {
  constructor() {
    this._ttSearchAndFilterEl = document.getElementById("ttSearchAndFilter");
    this._classFilterEl = document.querySelector(
      "#ttSearchAndFilter #classFilter",
    );
    this._fromDateEl = document.querySelector("#ttSearchAndFilter #fromDate");
    this._toDateEl = document.querySelector("#ttSearchAndFilter #toDate");
    this._timetableList = document.querySelector("table#timetableList tbody");
    this._myBookingTimetableIds = [];
    this._paginationContainer = document.querySelector(
      "#pagination-container-timetable",
    );
    this.pagination = null;
    if (!this._ttSearchAndFilterEl || !this._timetableList) {
      return;
    }
    this.handleSearchFilter();
    this.initializeListeners();
  }

  initializeListeners() {
    this._classFilterEl.addEventListener("change", () =>
      this.handleSearchFilter(),
    );
    this._fromDateEl.addEventListener("change", () =>
      this.handleSearchFilter(),
    );
    this._toDateEl.addEventListener("change", () => this.handleSearchFilter());
  }

  buildQuery(page = 1, limit = 10) {
    const classFilter = this._classFilterEl.value;
    const fromDate = this._fromDateEl.value;
    const toDate = this._toDateEl.value;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return new URLSearchParams({
      classFilter: classFilter || "",
      fromDate: fromDate || "",
      toDate: toDate || "",
      page,
      limit,
    }).toString();
  }

  async fetchTimetables(query) {
    try {
      const res = await fetch(`/timetable/search-filter?${query}`);
      const data = await res.json();
      this._myBookingTimetableIds = data.myBookingTimetableIds;
      this.updateTimetableList(data.timetables);
      // console.log(data.timetables);
      this.updatePagination(data.pagination);
    } catch (error) {
      console.error(`Fetch timetable error: `, error);
    }
  }

  handleSearchFilter(page = 1) {
    const query = this.buildQuery(page);
    this.fetchTimetables(query);
  }

  rowHtmlTemplate(field, value) {
    return `<td data-cell=${field} class='grid grid-cols-2 before:content-[attr(data-cell)] before:uppercase before:font-semibold md:text-center md:table-cell md:before:content-none'>${value}</td>`;
  }

  bookingButtonTemplate(timetableId) {
    const isDisabled = this._myBookingTimetableIds.includes(timetableId);
    const href = isDisabled
      ? "#"
      : `/auth/account/timetable/${timetableId}/bookingForm`;
    const classList = isDisabled
      ? "btn-bullet btn-limeGreen btn-sm cursor-not-allowed text-gray-600 saturate-50 hover:no-underline"
      : "btn-bullet btn-limeGreen btn-sm";

    const buttonText = isDisabled ? "Booked" : "Book Now";

    return `
    <td class="grid grid-cols-2 before:content-[attr(data-cell)] before:uppercase before:font-semibold md:text-center md:table-cell md:before:content-none" data-cell="action">
      <a href="${href}" class="${classList}">
        ${buttonText}
      </a>
    </td>
  `;
  }

  updateTimetableList(timetables) {
    // this._timetableList.innerHTML = "";
    this._timetableList.innerHTML = "";

    if (timetables.length === 0) {
      const row = document.createElement("tr");
      const noDataCell = document.createElement("td");
      noDataCell.colSpan = 9;
      noDataCell.textContent = "No class sessions found.";
      row.appendChild(noDataCell);
      this._timetableList.appendChild(row);
      return;
    }

    timetables.forEach((item) => {
      const startDateTime = new Date(item.startDateTime);
      const row = document.createElement("tr");
      row.innerHTML = `
      ${this.rowHtmlTemplate("date", startDateTime.toLocaleDateString("en-AU"))}
      ${this.rowHtmlTemplate("weekday", startDateTime.toLocaleDateString("en-AU", { weekday: "short" }))}
      ${this.rowHtmlTemplate("time", startDateTime.toLocaleTimeString("en-AU", { timeStyle: "short", hour12: false }))}
      ${this.rowHtmlTemplate("class", item.className)}
      ${this.rowHtmlTemplate("duration", item.duration)}
      ${this.rowHtmlTemplate("level", item.level)}
      ${this.rowHtmlTemplate("trainer", item.trainerFirstName)}
      ${this.rowHtmlTemplate("availability", item.availability)}
      ${this.bookingButtonTemplate(item.timetableId)}
      `;

      this._timetableList.appendChild(row);
    });
  }

  updatePagination(paginationData) {
    // // Debug: Log the received pagination data
    // console.log("Fontend Pagination Data:", paginationData);

    // RE-NITIALIZE PAGINATION EVERYTIME NEW DATA IS FETCHED, OTHERWISE, THE PAGINATION NUMBERS WILL STAY AT THE FIRST TIME!
    if (this.pagination) {
      this.pagination._container.innerHTML = "";
    }

    this.pagination = new Pagination({
      currentPage: paginationData.currentPage,
      totalPages: paginationData.totalPages,
      totalItems: paginationData.totalItems,
      limit: paginationData.limit,
      onPageChange: (page) => {
        this.handleSearchFilter(page);
      },
      paginationContainer: "#pagination-container-timetable",
      captionContainer: "table#timetableList caption",
    });

    this.pagination.render();
  }
}
