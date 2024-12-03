import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupSelector.querySelectorAll(".form__input");
    this._contentPopupFormCard = this._popupSelector.closest(
      ".popup-content-add-card"
    );
    this._myIdUser = "d83fab7e242c9aeb842baac1";
  }

  close() {
    this._contentPopupFormCard.classList.remove("popup__opened");
    this._popupSelector.reset();
  }
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.id] = input.value;
    });
    formValues.iduser = this._myIdUser;
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((error) => {
          console.error("Error al enviar el  formulario", error);
        });
    });
  }
}
