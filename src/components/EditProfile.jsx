import { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext; // Obtiene el objeto currentUser
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value); // Actualiza about cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({
      name: name,
      about: about,
    });
  };

  return (
    <form className="form" id="form__edit" noValidate onSubmit={handleSubmit}>
      <input
        className="form__input"
        placeholder="Nombre"
        id="name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
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
        onChange={handleAboutChange}
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" type="submit" id="profilebutton">
        Guardar
      </button>
    </form>
  );
}
