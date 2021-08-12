import basicView from "./basicView.js";

class resultsView extends basicView {
  _data = [];
  _favData = [];
  _resultsData = [];
  resultID;
  query;
  _event;
  isbooked = false;
  _favorites = {};
  a = this.query === undefined;

  _renderData(data) {
    this._data = data;
    this.createMockup();
  }
  _renderFavs(data) {
    this._data = data;
  }
  createMockup() {
    // get browser lang
    const language = window.navigator.userLanguage || window.navigator.language;
    const options = {
      month: "long",
      day: "numeric",
    };
    console.log(language);
    this._results.innerHTML = "";
    this._descIntro.innerHTML = "";
    this._resultDetailsSpan.innerHTML = `<span>Showing <span class="list-query-num">${this._data.length}</span> results.</span>`;
    this._data.sort().forEach((job) => {
      // format time
      const jobDate = new Date(job.publication_date).toLocaleDateString(
        language,
        options
      );
      const today = new Date().toLocaleDateString(language, options);

      const result = document.createElement("div");
      result.classList.add("result-item");
      const mockup = `<div class="result-item-title">${job.title}</div>
              <div class="result-item-company">
                <h4 class="result-item-company-name">${job.company_name}</h4>
  
              </div>
              <div class="result-item-tags">
              ${
                job.candidate_required_location
                  ? `<span class="result-item-tags-remote tag">${job.candidate_required_location}</span>`
                  : ""
              }
              ${
                job.job_type
                  ? `<span class="result-item-tags-type tag">${
                      job.job_type === "full_time" ? "full time" : job.job_type
                    }</span>`
                  : ``
              }
                <span class="result-item-tags-category tag">${
                  job.category
                }</span>
             
              </div>
              <div class="result-item-date">
              <span><i class="far fa-calendar"></i>  ${
                jobDate === today ? "today" : jobDate
              }</span>
              </div>`;
      result.innerHTML = mockup;
      this._results.appendChild(result);

      // description side load

      this._desc.innerHTML = job.description;
      const intro = `<div class="intro-overview">
        <div class="info-intro-logo"><img src="${
          job.company_logo_url
            ? job.company_logo_url
            : "https://cdn1.vectorstock.com/i/thumb-large/36/75/placeholder-black-glyph-icon-vector-32173675.jpg"
        }" alt="" class="info-intro-logo-img"></div>
        <div class="overview">
          <div class="intro-overview-role">${job.category}</div>
          <div class="intro-overview-company">${job.company_name}</div>
        </div>
      </div>
      <div class="intro-tags">
      ${
        job.candidate_required_location
          ? `<span class="intro-tag">${job.candidate_required_location}</span>`
          : ""
      }
        ${job.type ? `<span class="intro-tag">${job.type}</span>` : ""}
        ${job.category ? `<span class="intro-tag">${job.category}</span>` : ""}
      </div>
      <div class="intro-salary">
        <span class="intro-salary-label">Salary</span>
        <span class="intro-salary-num">${job.salary ? job.salary : "N/A"}</span>
      </div>`;
      this._descIntro.innerHTML = intro;
      this._applyLink.href = job.url;
      result.id = job.id;
      result.addEventListener("click", (e) => {
        const selected = e.target.closest(".result-item").id;
        this._event = e.target.closest(".result-item");
        this._data.forEach((result) => {
          if (result.id == selected) {
            this.resultID = result.id;
            this._generateDesc(result);
          }
        });
      });
    });
  }
  _generateDesc(selected) {
    this._descIntro.innerHTML = "";
    if (window.innerWidth <= 750) {
      this._infoContainer.classList.add("ji-info-active");
      this._closeInfo.addEventListener("click", () => {
        this._infoContainer.classList.remove("ji-info-active");
      });
    }

    // this._desc.innerHTML = "";

    // Save bookmark

    let bookmark = document.createElement("div");
    bookmark.classList.add("bookmark");
    bookmark.id = selected.id; /// pass id to be used in eventListener
    this.verifyBook(selected);

    if (this.isbooked === true) {
      bookmark.innerHTML = `<i class="fas fa-bookmark bookmark-icon"></i>`;
    } else {
      bookmark.innerHTML = `<i class="far fa-bookmark bookmark-icon"></i>`;
    }
    bookmark.addEventListener("click", (e) => {
      const bookmarked = e.target.closest(".bookmark").id;
      const booked = e.target.closest(".bookmark");
      this._data.forEach((result) => {
        if (result.id == bookmarked && !this._favorites[bookmarked]) {
          bookmark.innerHTML = `<i class="fas fa-bookmark bookmark-icon"></i>`;
          this.resultID = result.id;
          this._favorites[bookmarked] = result;
          this.addToFav(bookmarked, result);
          // show save confirmation
          this._notiMark.classList.add("notiMark-Active");
          setTimeout(() => {
            this._notiMark.classList.remove("notiMark-Active");
          }, 3000);
        } else if (result.id == bookmarked && this._favorites[bookmarked]) {
          bookmark.innerHTML = `<i class="far fa-bookmark bookmark-icon"></i>`;
          delete this._favorites[bookmarked];
          this._favorites[bookmarked];
          this.addToFav();
          // this._renderData(Object.values(this._favorites));
        }
      });
    });
    this.isbooked = false;
    // intro
    const introDiv = document.createElement("div");
    introDiv.classList.add("intro-overview");
    introDiv.innerHTML = ` <div class="info-intro-logo"><img src="${
      selected.company_logo_url
        ? selected.company_logo_url
        : "https://cdn1.vectorstock.com/i/thumb-large/36/75/placeholder-black-glyph-icon-vector-32173675.jpg"
    }" alt="" class="info-intro-logo-img"></div>
    <div class="overview">
      <div class="intro-overview-role">${selected.title}</div>
      <div class="intro-overview-company">${selected.company_name}</div>
    </div>`;
    // intro tags
    const introTags = document.createElement("div");
    introTags.classList.add("intro-tags");
    introTags.innerHTML = `${
      selected.candidate_required_location
        ? `<span class="intro-tag">${selected.candidate_required_location}</span>`
        : ""
    }
      ${
        selected.job_type === "full_time"
          ? `<span class="intro-tag">Full Time</span>`
          : ""
      }
      ${
        selected.category
          ? `<span class="intro-tag">${selected.category}</span>`
          : ""
      }`;
    // intro salary
    const introSalary = document.createElement("div");
    introSalary.classList.add("intro-salary");
    introSalary.innerHTML = `<span class="intro-salary-label">Salary</span>
    <span class="intro-salary-num">${
      selected.salary ? selected.salary : "N/A"
    }</span>`;

    this._descIntro.append(introDiv, introTags, bookmark, introSalary);
    this._desc.innerHTML = selected.description;
    this._infoContainer.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  verifyBook(s) {
    for (const key in this._favorites) {
      if (key == s.id) {
        this.isbooked = true;
      }
    }
  }
  checkLocalStorage() {
    if (localStorage.getItem("userFavorites")) {
      this._favorites = JSON.parse(localStorage.getItem("userFavorites"));
      this.addToFav();
    }
  }
  addToFav(a, b) {
    this._favoritesText.textContent = `Bookmarks(${
      Object.keys(this._favorites).length
    })`;

    if (Object.keys(this._favorites).length >= 1) {
      this._favoritesNoti.style.display = "flex";
      this._favoritesInfo.style.display = "block";
      this._favoritesNoti.textContent = Object.keys(this._favorites).length;
    }
    if (Object.keys(this._favorites).length === 0) {
      this._favoritesNoti.style.display = "none";
      this._favoritesInfo.style.display = "none";
      // this._results.innerHTML = "";
      // this._renderData(this._resultsData);
    }

    localStorage.setItem("userFavorites", JSON.stringify(this._favorites));
  }

  _searchError() {
    const errorMssg = `<h3>Oops! no resutls found for "<span>${this.query}</span>" ...</h3>`;
    this._sggtMessage.innerHTML = errorMssg;
    this._overlay.classList.add("overlay-active");
    this._searchS.classList.add("searchS-active");
  }
}

export default new resultsView();
