import { Pagination } from "./FnPagination.js";
import { avatarHtml, rowHtml } from "./HTMLTemplate.js";

export class UsersSearchAndFilter {
  constructor() {
    this._userSearchAndFilterEl = document.querySelector("#userFilters");
    this._userList = document.querySelector("table#userList tbody");
    this._manageUsersContainer = document.querySelector("main#manage-users");
    this._roleFilterEl = document.querySelector("#userFilters #roleFilter");
    this._searchEl = document.querySelector("#userFilters #searchUser");
    this._paginationContainer = document.querySelector(
      "#pagination-container-users",
    );
    if (!this._userSearchAndFilterEl || !this._userList) {
      return;
    }
    this.currentPage = 1;
    this.limit = 10;
    this.pagination = null;
    this.handleSearchFilter();
    this.initializeListeners();
  }

  initializeListeners() {
    this._roleFilterEl.addEventListener("change", () =>
      this.handleSearchFilter(),
    );
    this._searchEl.addEventListener("input", () => this.handleSearchFilter());
  }

  getSelectedRoles() {
    const selectedRoles = [];
    Array.from(this._roleFilterEl.selectedOptions).forEach((item) =>
      selectedRoles.push(item.value),
    );
    return selectedRoles;
  }

  getSearchTerm() {
    return this._searchEl.value;
  }

  buildQuery(page = this.currentPage, limit = this.limit) {
    const selectedRoles = this.getSelectedRoles();
    const searchTerm = this.getSearchTerm();
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return new URLSearchParams({
      role: selectedRoles.length > 0 ? selectedRoles.join(",") : "",
      search: searchTerm || "",
      page,
      limit,
    }).toString();
  }

  async fetchUsers(query) {
    try {
      const res = await fetch(
        `/auth/admin/manage-users/search-filter?${query}`,
      );
      const data = await res.json();
      // console.log(data);
      this.updateUserList(data.users);
      this.updatePagination(data.pagination);
      this._manageUsersContainer.style.display = "block";
    } catch (error) {
      console.error("fetch users error: ", error);
    }
  }

  handleSearchFilter(page = 1) {
    const query = this.buildQuery(page);
    this.fetchUsers(query);
  }

  updateUserList(users) {
    this._userList.innerHTML = "";
    if (!users.length) {
      this._userList.textContent = "No users found";
    }

    users.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      ${rowHtml("ID#", item.userId)}
      ${rowHtml("avatar", avatarHtml(`/images/users/${item.avatar}`, item.firstName))}
      ${rowHtml("user_name", `${item.firstName} ${item.lastName}`)}
      ${rowHtml("email", item.emailAddress)}
      ${rowHtml("phone", item.phoneNumber)}
      ${rowHtml("role", item.userRole)}
      ${rowHtml("created_at", new Date(item.createdAt).toLocaleDateString())}
      `;

      this._userList.appendChild(row);
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
      paginationContainer: "#pagination-container-users",
      captionContainer: "table#userList caption",
    });

    this.pagination.render();
  }
}
