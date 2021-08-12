import basicView from "./basicView.js";

class settingsView extends basicView {
  name;
  bookmarkClicked = false;

  checkLocalStorage() {
    if (!localStorage.getItem("userName")) {
      setTimeout(() => {
        this._popup.classList.add("notiMark-Active");
        this._popupBTN.addEventListener("click", () => {
          this.triggerChanges();
          this._popup.classList.remove("notiMark-Active");
        });
      }, 3000);
    }
    if (localStorage.getItem("userName")) {
      this.name = JSON.parse(localStorage.getItem("userName"));
      this.updateAvatar(this.name);
    }
  }

  addClickHandler(handler) {
    this._profile.addEventListener("click", () => {
      handler();
    });
  }
  addSubmitHandler(handler) {
    this._profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
  loadBookmarksHandler(handler) {
    this._favoritesLink.addEventListener("click", () => {
      this.triggerChanges();
      handler();
      this.updateResultDetails();
      this.bookmarkClicked === true;
      console.log(this.bookmarkClicked);
    });
  }
  updateResultDetails(query) {
    console.log(query.toString());
    this._resultDetailsSpan.innerHTML = `<span>Here are all your ${query.toString()} bookmarks!</span>`;
  }
  updateResultDetailsQuery(num, query) {
    this._resultDetailsSpan.innerHTML = `<span>Showing <span class="list-query-num">${num}</span> results for <span class="list-query-text">${query}</span>.</span>`;
  }

  triggerChanges() {
    this._firstName.focus();
    this._settings.classList.toggle("settings-active");
    this._avatarSpan.classList.toggle("toggle-Avatar");
  }
  updateAvatar(userName) {
    const upper = userName[0].toUpperCase();
    document.querySelector(".head-user-avatar-span").textContent = upper;
    this._userName.textContent = `👋 Hello, ${userName}`;
    this._firstName.placeholder = `Need to update your name, ${userName}?`;
  }
  updateProfile() {
    if (this._firstName.value === "") {
    }
    this.updateAvatar(this._firstName.value);
    this.name = this._firstName.value;
    this._profileForm.reset();
    this._settings.classList.toggle("settings-active");
    localStorage.setItem("userName", JSON.stringify(this.name));
  }
}

export default new settingsView();
