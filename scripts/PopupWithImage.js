import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._linkPopupImagen = this._popupSelector.querySelector(
      ".popup__body-imagen"
    );
    this._leyendaPopupTitle =
      this._popupSelector.querySelector(".popup__body-title");
    this._closePopupBtnImage = this._popupSelector.querySelector("#imagen");
    this._closePopupOverlay =
      this._popupSelector.querySelector("#overlay-card");
  }
  _handleEscClose(event) {
    super._handleEscClose(event);
  }
  open(link, name) {
    this._linkPopupImagen.src = link;
    this._leyendaPopupTitle.textContent = name;
    this._linkPopupImagen.alt = `Imagen de ${name}`;
    super.open();
  }
  close() {
    super.close();
  }
  setEventListeners() {
    if (this._closePopupBtnImage) {
      this._closePopupBtnImage.addEventListener("click", () => {
        this.close();
      });
    }
    if (this._closePopupOverlay) {
      this._closePopupOverlay.addEventListener("click", () => {
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
