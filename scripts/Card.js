import { PopupDelete } from "./index.js";

export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = Array.isArray(data.likes) ? data.likes : [];
    this._idUser = data.iduser;
    this._idCard = data.idcard;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likesArray = [];
    this._myid = "d83fab7e242c9aeb842baac1";
    this._buttonConfirmDelete = document.querySelector("#trashcard");
    this._confirmDeleteHandler = (evt) => {
      evt.preventDefault();
      if (this._cardIdToDelete) {
        this._deleteCard(this._cardIdToDelete);
        PopupDelete.close();
        this._cardIdToDelete = null; // Restablece la variable temporal
      }
    };
    this._buttonConfirmDelete.addEventListener(
      "click",
      this._confirmDeleteHandler
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _viewLikeCount() {
    this._element.querySelector(".element__count-like").textContent =
      this._likes.length;
  }
  _btnTrashActive() {
    this._element.querySelector(".element__icon-delete").style.display =
      "block";
  }
  _btnTrashInactive() {
    this._element.querySelector(".element__icon-delete").style.display = "none";
  }
  _deleteCard(cardIdDelete) {
    fetch(
      `https://around.nomoreparties.co/v1/web_es_10/cards/${cardIdDelete}`,
      {
        method: "DELETE",
        headers: {
          authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        this._element.remove();
        console.log("Tarjeta eliminada con éxito");
      });
  }
  _addLikeCard(cardId) {
    fetch(
      `https://around.nomoreparties.co/v1/web_es_10/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        console.log("Se agrego un me gusta");
      });
  }
  _deleteLikeCard(cardId) {
    fetch(
      `https://around.nomoreparties.co/v1/web_es_10/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        console.log("Se retiro un me gusta");
      });
  }
  generateCard() {
    // Almacenar el marcado en el campo privado _element para que otros elementos puedan acceder a él
    this._element = this._getTemplate();
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__imagen").src = this._link;
    this._element.querySelector(
      ".element__imagen"
    ).alt = `Imagen de ${this._name}`;
    this._toogleTrashButton();
    this._viewLikeCount();
    // Buttton like
    this._element
      .querySelector(".element__icon-like")
      .addEventListener("click", (evt) => {
        const cardIdLike = this._idCard;
        //Añadir o quitar me gustas en base a que el elemento este activo
        if (evt.target.classList.contains("element__icon-like_active")) {
          this._deleteLikeCard(cardIdLike);
          this._likes = this._likes.filter((id) => id !== this._myid);
        } else {
          this._addLikeCard(cardIdLike);
          this._likes.push(this._myid);
        }
        //Alternar la clase de estilo
        evt.target.classList.toggle("element__icon-like_active");
        this._viewLikeCount();
      });
    // Button delete
    this._element
      .querySelector(".element__icon-delete")
      .addEventListener("click", () => {
        PopupDelete.open();
        this._cardIdToDelete = this._idCard;
        console.log("ID de tarjeta a eliminar:", this._cardIdToDelete);
      });

    // Open popup image
    this._element
      .querySelector(".element__popup-image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });

    return this._element;
  }
  _toogleTrashButton() {
    //Button trash active/inactive
    if (this._idUser === this._myid) {
      this._btnTrashActive();
    } else {
      this._btnTrashInactive();
    }
  }
}
