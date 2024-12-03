export class Api {
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
    fetch(this._options.baseUrl, {
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
        this._userName.textContent = result.name;
        this._userAbout.textContent = result.about;
        this._userAvatar.src = result.avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getInitialCards(cardInitial, callback) {
    fetch(this._options.baseUrl, {
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
        for (let i = 0; i < 6 && i < result.length; i++) {
          cardInitial.push({
            name: result[i].name,
            link: result[i].link,
            likes: result[i].likes,
            iduser: result[i].owner._id,
            idcard: result[i]._id,
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
  editUserInfo() {
    fetch(this._options.baseUrl, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: this._userName.textContent,
        about: this._userAbout.textContent,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        this._textButtonProfile.textContent = "Guardado";
        setTimeout(() => {
          this._textButtonProfile.textContent = "Guardar";
        }, 2000);
      });
  }
  cardAditional(formDataCadrd) {
    return fetch(this._options.baseUrl, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: formDataCadrd.place,
        link: formDataCadrd.link,
        likes: formDataCadrd.likes,
        owner: {
          _id: formDataCadrd.iduser,
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
        this._textButtonCard.textContent = "Creado";
        setTimeout(() => {
          this._textButtonCard.textContent = "Crear";
        }, 2000);
        return result._id;
      });
  }
  editPhotoProfile() {
    fetch(this._options.baseUrl, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: this._userAvatar.src,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(() => {
        console.log("Se modifico la foto");
        this._textButtonPhotoProfile.textContent = "Guardado";
        setTimeout(() => {
          this._textButtonPhotoProfile.textContent = "Guardar";
        }, 2000);
      });
  }
}
