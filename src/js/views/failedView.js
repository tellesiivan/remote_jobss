import basicView from "./basicView.js";

class failedView extends basicView {
  item;

  addHandlerSuggestion(handler) {
    this._sggtList.addEventListener("click", (e) => {
      const itemClicked = e.target.closest(".suggestion-item");
      if (!itemClicked) return;
      const itemInfo = itemClicked.textContent;
      this.item = itemInfo;
      this.suggetedItem();
      handler();
    });
  }
  suggetedItem(e) {
    this._overlay.classList.remove("overlay-active");
    this._searchS.classList.remove("searchS-active");
  }
  reloadResultsHandler(handler) {
    this._logo.addEventListener("click", () => {
      handler();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this._infoContainer.classList.remove("ji-info-active");
    });
  }
}

export default new failedView();
