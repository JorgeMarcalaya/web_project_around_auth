export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._buttonCloseProfile = this._popupSelector.querySelector("#profile");
    this._overlayCloseProfile = this._popupSelector.querySelector(
      "#overlay-formprofile"
    );
    this._buttonCloseCard = this._popupSelector.querySelector("#add");
    this._overlayCloseCard =
      this._popupSelector.querySelector("#overlay-formcard");
  }
  open() {
    this._popupSelector.classList.add("popup__opened");
  }
  close() {
    this._popupSelector.classList.remove("popup__opened");
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    if (this._buttonCloseProfile) {
      this._buttonCloseProfile.addEventListener("click", () => {
        this.close();
      });
    }
    if (this._overlayCloseProfile) {
      this._overlayCloseProfile.addEventListener("click", () => {
        this.close();
      });
    }
    if (this._buttonCloseCard) {
      this._buttonCloseCard.addEventListener("click", () => {
        this.close();
      });
    }
    if (this._overlayCloseCard) {
      this._overlayCloseCard.addEventListener("click", () => {
        this.close();
      });
    }
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
    document.removeEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }
}
