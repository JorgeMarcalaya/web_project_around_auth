export default function EditProfile() {
  return (
    <form className="form" id="form__edit">
      <input
        className="form__input"
        placeholder="Nombre"
        id="name"
        required
        minlength="2"
        maxlength="40"
      />
      <span className="form__line"></span>
      <input
        className="form__input"
        placeholder="Acerca de mí"
        id="about"
        required
        minlength="2"
        maxlength="200"
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" type="submit" id="profilebutton">
        Guardar
      </button>
    </form>
  );
}
