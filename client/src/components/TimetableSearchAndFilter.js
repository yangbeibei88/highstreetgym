import { Pagination } from "./FnPagination.js";
import { rowHtml } from "./HTMLTemplate.js";

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

  bookingButtonTemplate(timetableId, avail) {
    const isDisabled =
      this._myBookingTimetableIds.includes(timetableId) || !avail;
    const href = isDisabled
      ? "#"
      : `/auth/account/timetable/${timetableId}/bookingForm`;
    const classList = isDisabled
      ? "btn-bullet btn-limeGreen btn-sm cursor-not-allowed text-gray-600 saturate-50 hover:no-underline"
      : "btn-bullet btn-limeGreen btn-sm";

    const buttonText = isDisabled ? "Booked" : "Book Now";

    const btnUI = `<a href="${href}" class="${classList}">
        ${buttonText}
      </a>`;

    return rowHtml("action", btnUI);
  }

  updateTimetableList(timetables) {
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
      const row = document.createElement("tr");
      row.innerHTML = `
      ${rowHtml("date", new Date(item.startDateTime).toLocaleDateString("en-AU"))}
      ${rowHtml("weekday", new Date(item.startDateTime).toLocaleDateString("en-AU", { weekday: "short" }))}
      ${rowHtml("time", new Date(item.startDateTime).toLocaleTimeString("en-AU", { timeStyle: "short", hour12: false }))}
      ${rowHtml("class", item.className)}
      ${rowHtml("duration", item.duration)}
      ${rowHtml("level", item.level)}
      ${rowHtml("trainer", item.trainerFirstName)}
      ${rowHtml("availability", item.availability)}
      ${this.bookingButtonTemplate(item.timetableId, item.availability)}
      `;

      this._timetableList.appendChild(row);
    });
  }

  updatePagination(paginationData) {
    // console.log("Fontend Pagination Data:", paginationData);

    // RE-NITIALIZE PAGINATION EVERYTIME NEW DATA IS FETCHED, OTHERWISE, THE PAGINATION NUMBERS WILL STAY AT THE FIRST TIME!
    if (this.pagination) {
      this._paginationContainer.innerHTML = "";
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
