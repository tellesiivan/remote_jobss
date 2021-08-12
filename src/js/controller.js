import * as model from "./model.js";
import resultsView from "./views/resultsView.js";
import descView from "./views/descView.js";
import failedView from "./views/failedView.js";
import settingsView from "./views/settingsView.js";
import basicView from "./views/basicView.js";
import skeletonLoad from "./views/skeltonLoad.js";
import searchView from "./views/searchView.js";
import filtersView from "./views/filtersView.js";

async function loadResults() {
  try {
    skeletonLoad._generateMarkup();
    await model.onLoad();
    resultsView._resultsData = model.state.results;
    resultsView._renderData(model.state.results);
    settingsView.checkLocalStorage();
    resultsView.checkLocalStorage();
  } catch (error) {
    console.log("Add ui error");
  }
}
const logoReload = function () {
  loadResults();
  failedView.suggetedItem();
};

const controlSearchResults = async function () {
  try {
    skeletonLoad._generateMarkup();

    // 1) Get search query
    const query = searchView.getQuery();
    resultsView.query = query;
    if (!query) return;

    // 2) Load search results
    await model.onSearch(query);
    resultsView._resultsData = model.state.results;
    if (resultsView._resultsData.length === 0) {
      resultsView._searchError();
    }

    // 3) Render results
    resultsView._renderData(model.state.results);

    // 4) Adjust results details
    const num = model.state.results.length;
    settingsView.updateResultDetailsQuery(num, query);
  } catch (err) {
    console.log("bingo");
  }
};
const loadBookmarks = function () {
  skeletonLoad._generateMarkup();
  const length = Object.keys(resultsView._favorites).length;
  if (length === 0) return;

  resultsView._renderData(Object.values(resultsView._favorites));
  settingsView.updateResultDetails(length);
};
const profileStart = function () {
  settingsView.triggerChanges();
};
const profileInfo = function () {
  settingsView.updateProfile();
};

const suggestedSearch = async function () {
  skeletonLoad._generateMarkup();
  try {
    failedView.suggetedItem();
    // 2) Load search results
    await model.onSearch(failedView.item);

    // 3) Render results
    resultsView._renderData(model.state.results);
  } catch (error) {
    console.log(error);
  }
};

const typedSearchSugg = async function () {
  searchView._renderCat(model.state.sugge);
};

// Event Listeners
searchView.addHandlerSearch(controlSearchResults);
settingsView.addClickHandler(profileStart);
settingsView.addSubmitHandler(profileInfo);
failedView.addHandlerSuggestion(suggestedSearch);
settingsView.loadBookmarksHandler(loadBookmarks);
failedView.reloadResultsHandler(logoReload); // hide error search suggestions

searchView.suggestedValues(typedSearchSugg);
filtersView.showFilters();

// Load results to page on load

loadResults();
