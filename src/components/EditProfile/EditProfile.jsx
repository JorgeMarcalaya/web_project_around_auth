import { useState } from "react";

export default function EditProfile({ onSave }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    onSave(name, about);
    setName("");
    setAbout("");
  };
  return (
    <form className="form" id="form__edit" onSubmit={handleProfileFormSubmit}>
      <input
        className="form__input"
        placeholder="Nombre"
        id="name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="form__line"></span>
      <input
        className="form__input"
        placeholder="Acerca de mí"
        id="about"
        required
        minLength="2"
        maxLength="200"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" type="submit" id="profilebutton">
        Guardar
      </button>
    </form>
  );
}
