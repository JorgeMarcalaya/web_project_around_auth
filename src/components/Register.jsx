import Popup from "./Popup.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import { useState } from "react";

function Register({ popup, onOpenPopup, onClosePopup, onRegisterSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    onRegisterSubmit(email, password);
  };
  const popupInfoToolTip = {
    children: <InfoTooltip />,
  };
  return (
    <>
      <form
        className="forms"
        onSubmit={(e) => {
          e.preventDefault();
          onOpenPopup(popupInfoToolTip);
          handleRegister();
        }}
      >
        <h1 className="forms__title">Regístrate</h1>
        <input
          className="forms__input"
          placeholder="Correo electrónico"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <span className="forms__line"></span>
        <input
          className="forms__input"
          placeholder="Contraseña"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <span className="forms__line"></span>
        <button className="forms__button">Regístrate</button>
        <p className="forms__footer">¿Ya eres miembro? Inicia sesión aquí</p>
      </form>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}

export default Register;
