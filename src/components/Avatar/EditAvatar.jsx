import { useRef, useContext } from "react";
import { CurrentUserContext } from "../Main/App.jsx";

export default function EditAvatar() {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser.avatar);

  function handleSubmit(event) {
    event.preventDefault();
    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form className="form" id="form__add" onSubmit={handleSubmit}>
      <input
        type="url"
        className="form__input"
        placeholder="Enlace a la imagen"
        id="photo"
        ref={avatarRef}
        required
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" id="editPhoto">
        Guardar
      </button>
    </form>
  );
}
