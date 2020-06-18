export default class Task {
  constructor(text) {
    this.textForSearch = text.toLowerCase();
    this.textForUI = text;
    this.pinned = false;
  }
}
