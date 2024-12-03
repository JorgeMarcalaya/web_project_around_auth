export default function NewCard() {
  return (
    <form className="form" id="form__add">
      <input
        className="form__input"
        placeholder="Título"
        id="place"
        required
        minlength="2"
        maxlength="30"
      />
      <span className="form__line"></span>
      <input
        type="url"
        className="form__input"
        placeholder="Enlace a la imagen"
        id="link"
        required
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" id="cardbutton">
        Crear
      </button>
    </form>
  );
}
