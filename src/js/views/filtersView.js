import basicView from "./basicView.js";

class filersView extends basicView {
  scrollFilter;
  _filterBTN = document.querySelector(".filters");

  showFilters() {
    this._filterBTN.addEventListener("click", () => {
      this._overlay.classList.add("overlay-active");
      this._filterPopup.classList.add("show-filters");
    });
  }
}

export default new filersView();
