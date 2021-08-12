import basicView from "./basicView.js";

class skeletonLoad extends basicView {
  _generateMarkup() {
    [this._results, this._resultDetailsSpan, this._descIntro].forEach((e) => {
      e.innerHTML = "";
    });
    const mockup = `<div class="placeholder-item">
		<span class="span-header"> </span>
		<span class="span-text-item"></span>
		<span class="span-text-item" style="width:95%;"></span>
		<span class="span-text-item" style="width:90%;"></span>
		<span class="span-text-item" style="width:95%;"></span>
		<span class="span-text-item" style="width:76%;"></span>
		<span class="span-text-item" style="width:95%;"></span>
		<span class="span-btn"></span>
	</div>`;

    const mockup2 = `<div class="placeholder-item">
		<span class="span-text-item" style="width:150px;"></span>
	</div>`;

    const mockup3 = `<div class="placeholder-item">
  <span class="span-btn"></span>
  <span class="span-text-item" style="width:90%;"></span>
  <span class="span-text-item" style="width:95%;"></span>
  <span class="span-text-item" style="width:76%;"></span>
</div>`;
    // results.innerHTML = mockup;
    this._resultDetailsSpan.innerHTML = mockup2;
    // infoContainer.innerHTML = mockup;
    [this._results, this._desc].forEach((e) => {
      e.innerHTML = mockup;
    });
    this._descIntro.innerHTML = mockup3;
  }
}

export default new skeletonLoad();
