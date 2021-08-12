class descView {
  _data = "";

  _generateMarkup(e) {
    this._data = e;
    console.log(this._data);
  }
}

export default new descView();
