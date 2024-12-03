//Importaciones
import "../styles/index.css";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { FormValidator, forms } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { Popup } from "./Popup.js";
import { Api } from "./Api.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";

// Declaracion de Variables
const buttonOpenEditProfile = document.querySelector("#btnedit");
const buttonOpenAddCard = document.querySelector("#btnadd");
const buttonOpenEditPhotoProfile = document.querySelector(".nav__edit-perfil");
const buttonEditPhoto = document.querySelector("#editPhoto");
let formElement = document.querySelector("#form__edit");
let formCard = document.querySelector("#form__add");
const profileName = document.querySelector("#name");
const profileAbout = document.querySelector("#about");
const profilePhoto = document.querySelector("#photo");
const popupProfile = document.querySelector(".popup-content-profile");
const nameProfile = document.querySelector(".nav__profile-nombre");
const aboutProfie = document.querySelector(".nav__profile-about");
const photoProfile = document.querySelector(".nav__profile-avatar");
const popupAddCard = document.querySelector(".popup-content-add-card");
const popupDeleteConfirm = document.querySelector(".popup-content-eraser");
const popupEditePhotoProfile = document.querySelector(".popup-content-perfil");
const cardArea = document.querySelector(".elements");
const contentPopupImagen = document.querySelector(".popup-content-imagen");
const buttonEditProfile = document.querySelector("#profilebutton");
const buttonNewCard = document.querySelector("#cardbutton");
const formValidatorPopupEdit = new FormValidator(forms, formElement);
const formValidatorPopupAdd = new FormValidator(forms, formCard);
const PopupProfile = new Popup(popupProfile);
const PopupCard = new Popup(popupAddCard);
const PopupEditPhotoProfile = new Popup(popupEditePhotoProfile);
const closePopup = new PopupWithImage(contentPopupImagen);
const userInfo = new UserInfo(nameProfile, aboutProfie);
const popupWithImage = new PopupWithImage(contentPopupImagen);
const submitCard = new PopupWithForm(formCard, handleCardFormSubmit);
export const PopupDelete = new PopupWithConfirmation(popupDeleteConfirm);

//Ver Perfil mediante el servidor

const apiUser = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10/users/me",
  headers: {
    authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
    "Content-Type": "application/json",
  },
});
apiUser.getUserInfo();
// Ver lista de tarjetas

const apiAvatar = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10/users/me/avatar",
  headers: {
    authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
    "Content-Type": "application/json",
  },
});

const initialCards = [];
export const apiCards = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10/cards",
  headers: {
    authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
    "Content-Type": "application/json",
  },
});
apiCards.getInitialCards(initialCards, (cards) => {
  const cardsList = new Section(
    {
      items: cards,
      renderer: (cardItem) => {
        const card = new Card(cardItem, ".template-cards", handleCardClick);
        const cardNewElement = card.generateCard();
        cardsList.addItem(cardNewElement);
      },
    },
    cardArea
  );
  cardsList.renderItems();
});

//Funciones
function handleCardClick(imagen, title) {
  popupWithImage.open(imagen, title);
}

function handleProfileFormSubmit(evt) {
  buttonEditProfile.textContent = "Guardando...";
  evt.preventDefault();
  let setname = profileName.value;
  let setabout = profileAbout.value;
  userInfo.setUserInfo({
    name: setname,
    about: setabout,
  });
  apiUser.editUserInfo();
  popupProfile.classList.remove("popup__opened");
}

function handleEditPhotoProfileFormSubmit(evt) {
  buttonEditPhoto.textContent = "Guardando...";
  evt.preventDefault();
  let setphoto = profilePhoto.value;
  photoProfile.src = setphoto;
  apiAvatar.editPhotoProfile();
  popupEditePhotoProfile.classList.remove("popup__opened");
}

function handleCardFormSubmit(formData) {
  buttonNewCard.textContent = "Creando...";
  return apiCards.cardAditional(formData).then((newCardId) => {
    formData.idcard = newCardId;

    const newCard = new Card(
      {
        name: formData.place,
        link: formData.link,
        iduser: formData.iduser,
        idcard: formData.idcard,
      },
      ".template-cards",
      handleCardClick
    );
    const cardToAdd = newCard.generateCard();
    cardArea.prepend(cardToAdd);
  });
}

function popup__open_edit() {
  profileName.value = userInfo.getUserInfo().name;
  profileAbout.value = userInfo.getUserInfo().about;
  formValidatorPopupEdit.enableValidation();
  PopupProfile.open();
}
function popup__open_add() {
  formValidatorPopupAdd.enableValidation();
  PopupCard.open();
}

//Eventos y lista
submitCard.setEventListeners();
PopupProfile.setEventListeners();
PopupCard.setEventListeners();
closePopup.setEventListeners();
PopupDelete.setEventListeners();
PopupEditPhotoProfile.setEventListeners();

buttonOpenEditProfile.addEventListener("click", popup__open_edit);
buttonOpenAddCard.addEventListener("click", popup__open_add);
buttonOpenEditPhotoProfile.addEventListener("click", () => {
  PopupEditPhotoProfile.open();
});
formElement.addEventListener("submit", handleProfileFormSubmit);
buttonEditPhoto.addEventListener("click", handleEditPhotoProfileFormSubmit);
