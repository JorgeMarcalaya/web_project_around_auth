import ImagePopup from "../../../ImagePopup/ImagePopup";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup } = props;
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };
  return (
    <div className="element">
      <a href="#">
        <img
          src="../../../../../images/Trash.png"
          alt="Botón Eliminar"
          className="element__icon-delete"
        />
      </a>
      <a href="#" className="element__popup-image">
        <img
          src={link}
          alt=""
          className="element__imagen"
          onClick={() => handleOpenPopup(imageComponent)}
        />
      </a>
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <a>
          <img
            src="../../../../../images/Megusta.png"
            alt="Botón Me gusta"
            className="element__icon-like"
          />
          <p className="element__count-like"></p>
        </a>
      </div>
    </div>
  );
}
