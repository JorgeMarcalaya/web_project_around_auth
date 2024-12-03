export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
  }
}
