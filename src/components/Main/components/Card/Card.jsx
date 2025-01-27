import ImagePopup from "../../../ImagePopup/ImagePopup";
import { useContext } from "react";
import { CurrentUserContext } from "../../../App.jsx";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked, iduser } = props.card;
  const { handleOpenPopup, onCardLike, onCardDelete } = props;
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };
  const getLikeButtonClass = (like) =>
    `element__icon-like ${like ? "element__icon-like_active" : ""}`;

  const cardLikeButtonClassName = getLikeButtonClass(isLiked);

  const isOwner = iduser && currentUser._id === iduser;

  function handleLikeClick(event) {
    event.preventDefault();
    if (props.card.idcard) {
      onCardLike(props.card); // Solo llama si idcard está definido
    } else {
      console.error("Error: idcard no definido en la tarjeta", props.card);
    }
  }

  function handleDeleteClick(event) {
    event.preventDefault();
    if (props.card.idcard) {
      onCardDelete(props.card); // Solo llama si idcard está definido
    } else {
      console.error("Error: idcard no definido en la tarjeta", props.card);
    }
  }

  return (
    <div className="element">
      <a href="#">
        <img
          src="../../../../../images/Trash.png"
          alt="Botón Eliminar"
          className={`element__icon-delete ${
            isOwner ? "" : "element__icon-delete_disabled"
          }`}
          onClick={isOwner ? handleDeleteClick : null}
        />
      </a>
      <a href="#" className="element__popup-image">
        <img
          src={link}
          alt="Popup de Place"
          className="element__imagen"
          onClick={() => handleOpenPopup(imageComponent)}
        />
      </a>
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <a href="#">
          <img
            src="../../../../../images/Megusta.png"
            alt="Botón Me gusta"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__count-like">{props.card.likes.length}</p>
        </a>
      </div>
    </div>
  );
}
