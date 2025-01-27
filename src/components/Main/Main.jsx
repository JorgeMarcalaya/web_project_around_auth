import buttonEdit from "../../../images/botoneditar.png";
import buttonAdd from "../../../images/botonañadir.png";
import { useContext, useEffect, useState } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Avatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";
import { CurrentUserContext } from "./components/App.jsx";

function Main({
  cards,
  onCardDelete,
  onCardLike,
  onOpenPopup,
  onClosePopup,
  popup,
  onAddCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard handleAddCard={onAddCard} />,
  };
  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="main">
      <nav className="nav">
        <div className="nav__overlay" id="overlay-editprofile"></div>
        <div className="nav__profile-container">
          <img
            src={currentUser.avatar}
            alt="Imagen de perfil"
            className="nav__profile-avatar"
          />
          <img
            src={buttonEdit}
            alt="Imagen de editar perfil"
            className="nav__edit-perfil"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className="nav__profile">
          <ul className="nav__profile-list">
            <li>
              <h1 className="nav__profile-nombre">{currentUser.name}</h1>
            </li>
            <li>
              <h2 className="nav__profile-about">{currentUser.about}</h2>
            </li>
          </ul>
          <a
            id="btnedit"
            className="nav__button nav__button-edit"
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img
              src={buttonEdit}
              alt="Imagen de edición"
              className="nav__edit-button"
            />
          </a>
        </div>
        <a
          id="btnadd"
          className="nav__button nav__button-add"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img
            src={buttonAdd}
            alt="Imagen de agregar"
            className="nav__add-button"
          />
        </a>
      </nav>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card.idcard}
            card={{ ...card, idcard: card.idcard || card._id }}
            handleOpenPopup={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
      <template className="template-cards"></template>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
