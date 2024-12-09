import { useState } from "react";

export default function NewCard({ onAddCard }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    onAddCard(title, link);
    setTitle("");
    setLink("");
  };
  return (
    <form className="form" id="form__add" onSubmit={handleCardFormSubmit}>
      <input
        className="form__input"
        placeholder="Título"
        id="place"
        required
        minLength="2"
        maxLength="30"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span className="form__line"></span>
      <input
        type="url"
        className="form__input"
        placeholder="Enlace a la imagen"
        id="link"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" id="cardbutton">
        Crear
      </button>
    </form>
  );
}
