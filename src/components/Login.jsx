import Popup from "./Popup.jsx";
import { useState } from "react";

function Login({ popup, onOpenPopup, onClosePopup, onLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    onLoginSubmit(email, password);
  };
  return (
    <>
      <form
        className="forms"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h1 className="forms__title">Inicia sesión</h1>
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
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <span className="forms__line"></span>
        <button className="forms__button">Inicia sesión</button>
        <p className="forms__footer">¿Aún no eres miembro? Regístrate aquí</p>
      </form>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}

export default Login;
