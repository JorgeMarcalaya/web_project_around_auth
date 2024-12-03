export default function EditAvatar() {
  return (
    <form className="form" id="form__add">
      <input
        type="url"
        className="form__input"
        placeholder="Enlace a la imagen"
        id="photo"
        required
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" id="editPhoto">
        Guardar
      </button>
    </form>
  );
}
