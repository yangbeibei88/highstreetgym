export class TimetableSearchAndFilter {
  constructor() {
    this._classFilterEl = document.querySelector(
      "#ttSearchAndFilter #classFilter",
    );
    this._fromDateEl = document.querySelector("#ttSearchAndFilter #fromDate");
    this._toDateEl = document.querySelector("#ttSearchAndFilter #toDate");
    this._myBookingTimetableIds = [];
    this._timetableList = document.querySelector("table#timetableList tbody");
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

  buildQuery() {
    const classFilter = this._classFilterEl.value;
    const fromDate = this._fromDateEl.value;
    const toDate = this._toDateEl.value;

    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return new URLSearchParams({
      classFilter: classFilter || "",
      fromDate: fromDate || "",
      toDate: toDate || "",
    }).toString();
  }

  async fetchTimetables(query) {
    try {
      const res = await fetch(`/timetable/search-filter?${query}`);
      const data = await res.json();
      this._myBookingTimetableIds = data.myBookingTimetableIds;
      this.updatedTimetableList(data.timetables);
    } catch (error) {
      console.error(`Fetch timetable error: `, error);
    }
  }

  handleSearchFilter() {
    const query = this.buildQuery();
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

  updatedTimetableList(timetables) {
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
}
