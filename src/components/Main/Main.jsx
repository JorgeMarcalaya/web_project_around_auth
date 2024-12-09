import buttonEdit from "../../../images/botoneditar.png";
import buttonAdd from "../../../images/botonañadir.png";
import { useState } from "react";
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "../NewCard/NewCard.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";
import EditAvatar from "../Avatar/EditAvatar.jsx";
import Card from "../Main/components/Card/Card.jsx";

const initialCards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

function Main() {
  const [card, setCards] = useState(initialCards);
  const handleAddCard = (title, link) => {
    const newCard = {
      isLiked: false,
      _id: Date.now().toString(),
      name: title,
      link,
      owner: "5d1f0611d321eb4bdcd707dd",
      createdAt: new Date().toISOString(),
    };
    setCards((firstCards) => {
      const updatedListCards = [newCard, ...firstCards];
      return updatedListCards;
    });
    setPopup(null);
  };
  const [profile, setProfile] = useState({
    name: "Cousteau",
    about: "Explorador",
  });
  const [popup, setPopup] = useState(null);
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddCard={handleAddCard} />,
  };
  const editProfilePopup = {
    title: "Editar Perfil",
    children: (
      <EditProfile
        onSave={(name, about) => {
          setProfile({ name, about });
          setPopup(null);
        }}
      />
    ),
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };
  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup(popup) {
    setPopup(null);
  }
  return (
    <main className="main">
      <nav className="nav">
        <div className="nav__overlay" id="overlay-editprofile"></div>
        <div className="nav__profile-container">
          <img
            src="../../../images/profile.jpg"
            alt="Imagen de perfil"
            className="nav__profile-avatar"
          />
          <img
            src={buttonEdit}
            alt="Imagen de editar perfil"
            className="nav__edit-perfil"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className="nav__profile">
          <ul className="nav__profile-list">
            <li>
              <h1 className="nav__profile-nombre">{profile.name}</h1>
            </li>
            <li>
              <h2 className="nav__profile-about">{profile.about}</h2>
            </li>
          </ul>
          <a
            id="btnedit"
            className="nav__button nav__button-edit"
            onClick={() => handleOpenPopup(editProfilePopup)}
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
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img
            src={buttonAdd}
            alt="Imagen de agregar"
            className="nav__add-button"
          />
        </a>
      </nav>
      <section className="elements">
        {card.map((card) => (
          <Card key={card._id} card={card} handleOpenPopup={handleOpenPopup} />
        ))}
      </section>
      <template className="template-cards"></template>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
