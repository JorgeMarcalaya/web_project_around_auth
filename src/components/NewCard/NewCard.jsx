import { useRef } from "react";

export default function NewCard({ handleAddCard }) {
  const titleRef = useRef({});
  const linkRef = useRef({});
  function handleSubmit(event) {
    event.preventDefault();
    handleAddCard({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
    titleRef.current.value = "";
    linkRef.current.value = "";
  }
  return (
    <form className="form" id="form__add" onSubmit={handleSubmit}>
      <input
        className="form__input"
        placeholder="Título"
        id="place"
        required
        minLength="2"
        maxLength="30"
        ref={titleRef}
      />
      <span className="form__line"></span>
      <input
        type="url"
        className="form__input"
        placeholder="Enlace a la imagen"
        id="link"
        required
        ref={linkRef}
      />
      <span className="form__line"></span>
      <button className="popup__add-btn" id="cardbutton">
        Crear
      </button>
    </form>
  );
}
