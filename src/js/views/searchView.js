import basicView from "./basicView.js";

class searchView extends basicView {
  _typed;
  _data;
  _tags = [];
  _tagSelected;

  getQuery() {
    const query = this._searchInput.value;
    this._clear();
    this._searchListTags.innerHTML = " ";
    return query;
  }
  addHandlerSearch(handler) {
    this._searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  _renderCat(data) {
    this._data = data;

    this.renderSearchTags();
  }
  renderSearchTags() {
    this._tags.length = 0;
    this._data.forEach((cat) => {
      const lowerCase = this._typed.toLowerCase();
      if (cat.includes(lowerCase) && this._typed !== "") {
        this._tags.push(cat);
        this.tagsMockup();
      }
      if (this._typed === "") {
        this._searchListTags.innerHTML = " ";
      }
    });
  }
  tagsMockup() {
    this._searchListTags.innerHTML = " ";

    this._tags.forEach((tag) => {
      const highlighted = tag
        .toLowerCase()
        .replace(
          this._typed.toLowerCase(),
          `<b class="highlight">${this._typed.toLowerCase()}</b>`
        );
      if (tag.toLowerCase() === this._typed.toLowerCase()) {
        console.log("BINGO");
      }
      const li = document.createElement("li");
      li.classList.add("search-tags-item");
      li.innerHTML = `${highlighted}`;
      li.addEventListener("click", (e) => {
        this._searchInput.value = this._tagSelected =
          e.target.closest(".search-tags-item").textContent;
        this._searchInput.focus();
        // setTimeout(this._searchForm.submit(), 2000);
        this._searchListTags.innerHTML = " ";
      });
      this._searchListTags.append(li);
    });
  }
  _clear() {
    this._searchInput.value = "";
    this._searchInput.blur();
  }
  suggestedValues(handler) {
    this._searchInput.addEventListener("input", (e) => {
      this._typed = this._searchInput.value;
      handler();
    });
  }
}

export default new searchView();
