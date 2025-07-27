export default function Popup(props) {
  //los hijos son el contenido de la ventana emergente
  const { onClose, title, children } = props;
  return (
    <div className="popup popup-content-profile">
      <div className="popup__overlay" id="overlay-formprofile"></div>
      <div
        className={`popup__content ${!title ? "popup__content-imagen" : ""}`}
      >
        <a className="popup__close-btn" id="profile" onClick={onClose}>
          <img
            src="../src/images/botonclose.png"
            alt="Botón de cierre"
            className="popup__close-icon"
          />
        </a>
        <div className="popup__body">
          {title && <h3 className="popup__title">{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}
