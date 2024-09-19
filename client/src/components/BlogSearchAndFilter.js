export class BlogSearchAndFilter {
  constructor() {
    this._topicFilterEl = document.querySelector("#articleFilter #topicFilter");
    this._visFilterEl = document.querySelector("#articleFilter #visFilter");
    this._articleList = document.querySelector("#blog #articleList");
    this._blogFilterEls = document.querySelectorAll("#blogFilterBy details");
    if (!this._topicFilterEl || !this._articleList) {
      return;
    }
    this.handleSearchFilter();
    this.initializeListeners();
    this.toggleFilters();
  }

  initializeListeners() {
    this._topicFilterEl.addEventListener("change", () =>
      this.handleSearchFilter(),
    );
    this._visFilterEl.addEventListener("change", () =>
      this.handleSearchFilter(),
    );
    window.addEventListener("resize", () => this.toggleFilters());
  }

  toggleFilters() {
    const screenWidth = window.innerWidth;
    this._blogFilterEls.forEach((el) => {
      if (screenWidth < 768) {
        el.removeAttribute("open");
      } else {
        el.setAttribute("open", "");
      }
    });
  }

  getSelectedTopics() {
    const selectedTopics = [];
    const checkBoxes = this._topicFilterEl.querySelectorAll(
      "input[type='checkbox']:checked",
    );
    checkBoxes.forEach((checkbox) => selectedTopics.push(checkbox.value));

    return selectedTopics;
  }

  getSelectedViss() {
    const selectedViss = [];
    const checkBoxes = this._visFilterEl.querySelectorAll(
      "input[type='checkbox']:checked",
    );
    checkBoxes.forEach((checkbox) => selectedViss.push(checkbox.value));

    return selectedViss;
  }

  buildQuery() {
    const selectedTopics = this.getSelectedTopics();
    const selectedViss = this.getSelectedViss();
    // eslint-disable-next-line node/no-unsupported-features/node-builtins
    return new URLSearchParams({
      topics: selectedTopics.length > 0 ? selectedTopics.join(",") : "",
      visibilities: selectedViss.length > 0 ? selectedViss.join(",") : "",
    }).toString();
  }

  async fetchArticles(query) {
    try {
      const res = await fetch(`/blog/search-filter?${query}`);
      const data = await res.json();
      // console.log(data);
      this.updateArticleList(data.articles);
    } catch (error) {
      console.error(`Fetch articles error: `, error);
    }
  }

  handleSearchFilter() {
    const query = this.buildQuery();
    this.fetchArticles(query);
  }

  updateArticleList(articles) {
    this._articleList.innerHTML = "";

    if (articles.length === 0) {
      this._articleList.textContent = "No article found.";
      return;
    }

    articles.forEach((item) => {
      const row = document.createElement("article");
      row.innerHTML = `
            <img
          src="/images/blog/${item.imageCover}"
          alt="${item.articleTitle}"
          class="max-h-52 object-cover rounded-t-lg md:max-h-full md:rounded-tr-none md:rounded-l-lg md:w-1/3">
        <div
          class="w-full py-4 px-2 flex flex-col md:w-2/3">
          <small
            class="text-xs font-semibold bg-orange-700 text-white rounded-full w-fit px-3 py-1">${item.topicName}</small>
          <h2 class="text-xl">${item.articleTitle}</h2>
          <div class="shortDesc">
            <div class="line-clamp-3">${item.articleContent}</div>
          <div>
          <div
            class="w-full flex flex-col items-center justify-between lg:flex-row">
            <div
              class="flex items-center space-x-2 mr-auto">
              <img
                src="/images/users/${item.avatar}"
                alt="${item.firstName}"
                class="size-8 rounded-full border border-darkCyan object-cover md:size-12">
              <small class="text-xs">${item.firstName} ${item.lastName}</small>
              <small
                class="text-xs">${new Date(item.createdAt).toLocaleDateString("en-AU")}</small>
            </div>
            <a class="btn-bullet btn-limeGreen btn-sm ml-auto"
              href="/blog/${item.articleId}">
              Read
              More &gt;&gt;</a>
          </div>
        </div>
      `;
      row.classList =
        "flex flex-col rounded-lg bg-white shadow md:flex-row md:space-x-4";

      this._articleList.appendChild(row);
    });
  }
}
