class Api {
  constructor(options) {
    this._options = options;
    this._userName = document.querySelector(".nav__profile-nombre");
    this._userAbout = document.querySelector(".nav__profile-about");
    this._userAvatar = document.querySelector(".nav__profile-avatar");
    this._textButtonProfile = document.querySelector("#profilebutton");
    this._textButtonCard = document.querySelector("#cardbutton");
    this._textButtonPhotoProfile = document.querySelector("#editPhoto");
  }
  getUserInfo() {
    // Cargando la informacion del usuario desde el servidor
    return fetch(this._options.baseUrl, {
      method: "GET",
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getInitialCards(cardInitial, callback) {
    return fetch(this._options.baseUrl, {
      method: "GET",
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        cardInitial.length = 0;
        const currentUserId = "d83fab7e242c9aeb842baac1";
        for (let i = 0; i < 6 && i < result.length; i++) {
          cardInitial.push({
            name: result[i].name,
            link: result[i].link,
            likes: result[i].likes,
            iduser: result[i].owner._id,
            idcard: result[i]._id,
            isLiked: result[i].likes.some((like) => like._id === currentUserId),
          });
        }
        if (callback) {
          callback(cardInitial);
        }
        this._likesCard = document.querySelector(".element__count-like");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  editUserInfo(userData) {
    return fetch(this._options.baseUrl, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        if (this._userName) {
          this._userName.textContent = data.name;
        }
        if (this._userAbout) {
          this._userAbout.textContent = data.about;
        }
        if (this._textButtonProfile) {
          this._textButtonProfile.textContent = "Guardado";
          setTimeout(() => {
            this._textButtonProfile.textContent = "Guardar";
          }, 2000);
        }
        return data;
      });
  }
  cardAditional(formDataCard) {
    return fetch(this._options.baseUrl, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: formDataCard.name,
        link: formDataCard.link,
        likes: formDataCard.likes,
        owner: {
          _id: formDataCard.iduser,
        },
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log("Se agrego una tarjeta");
        if (this._textButtonCard) {
          this._textButtonCard.textContent = "Creado";
          setTimeout(() => {
            this._textButtonCard.textContent = "Crear";
          }, 2000);
        }
        return {
          ...result,
          isLiked: false,
        };
      });
  }
  editPhotoProfile(userInfo) {
    return fetch(this._options.baseUrl, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: userInfo.avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((info) => {
        console.log("Se modifico la foto");
        if (this._userAvatar) {
          this._userAvatar.src = info.avatar;
        }
        if (this._textButtonPhotoProfile) {
          this._textButtonPhotoProfile.textContent = "Guardado";
          setTimeout(() => {
            this._textButtonPhotoProfile.textContent = "Guardar";
          }, 2000);
        }
        return info;
      });
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_10/cards/likes/${cardId}`,
      {
        method: isLiked ? "PUT" : "DELETE",
        headers: {
          authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  deleteCard(cardIdDelete) {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_10/cards/${cardIdDelete}`,
      {
        method: "DELETE",
        headers: {
          authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
// Acceso a la API de usuarios

const usersMe = {
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10/users/me",
  headers: {
    authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
    "Content-Type": "application/json",
  },
};

export const apiUser = new Api(usersMe);

const cards = {
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10/cards",
  headers: {
    authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
    "Content-Type": "application/json",
  },
};

export const apiCards = new Api(cards);

const userAvatar = {
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10/users/me/avatar",
  headers: {
    authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
    "Content-Type": "application/json",
  },
};

export const apiAvatar = new Api(userAvatar);
