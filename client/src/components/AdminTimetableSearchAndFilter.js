import { Pagination } from "./FnPagination.js";
import { rowHtml } from "./HTMLTemplate.js";

export class AdminTimetableSearchAndFilter {
  constructor() {
    this._ttSearchAndFilterEl = document.getElementById(
      "manageTimetableFilters",
    );
    this._classFilterEl = document.querySelector(
      "#manageTimetableFilters #classFilter",
    );
    this._statusEl = document.querySelector(
      "#manageTimetableFilters #statusFilter",
    );
    this._timetableList = document.querySelector(
      "table#adminTimetableList tbody",
    );
    this._paginationContainer = document.querySelector(
      "#pagination-container-admin-timetable",
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
    this._statusEl.addEventListener("change", () => this.handleSearchFilter());
  }

  buildQuery(page = 1, limit = 10) {
    const classFilter = this._classFilterEl.value;
    const statusFilter = this._statusEl.value;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return new URLSearchParams({
      classId: classFilter || "",
      status: statusFilter || "active",
      page,
      limit,
    }).toString();
  }

  async fetchTimetables(query) {
    try {
      const res = await fetch(
        `/auth/admin/manage-timetable/search-filter?${query}`,
      );
      const data = await res.json();
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

  editButtonHtml(timetableId) {
    return `<a href="/auth/admin/timetableForm/${timetableId}/edit" class="btn btn-sm btn-limeGreen">
        Edit
      </a>`;
  }

  updateTimetableList(timetables) {
    this._timetableList.innerHTML = "";

    if (timetables.length === 0) {
      const row = document.createElement("tr");
      const noDataCell = document.createElement("td");
      noDataCell.colSpan = 10;
      noDataCell.textContent = "No timetable found.";
      row.appendChild(noDataCell);
      this._timetableList.appendChild(row);
      return;
    }

    timetables.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      ${rowHtml("NO#", item.timetableNo)}
      ${rowHtml("class", item.className)}
      ${rowHtml("date", new Date(item.startDateTime).toLocaleString())}
      ${rowHtml("duration", item.duration)}
      ${rowHtml("trainer", item.trainerFirstName)}
      ${rowHtml("level", item.level)}
      ${rowHtml("capacity", item.capacity)}
      ${rowHtml("availability", item.availability)}
      ${rowHtml("status", new Date(item.startDateTime) < Date.now() ? "finished" : "active")}
      ${rowHtml("edit", this.editButtonHtml(item.timetableId))}
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
      paginationContainer: "#pagination-container-admin-timetable",
      captionContainer: "table#adminTimetableList caption",
    });

    this.pagination.render();
  }
}
