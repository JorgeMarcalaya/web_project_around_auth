import logo from "../images/logo.png";
import menu from "../images/Group 5.png";
import close from "../images/botonclose.png";
import { useMatch } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Header({ email }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toogleMenu = () => {
    setMenuOpen((active) => !active);
  };
  useEffect(() => {
    const screen = window.matchMedia("(min-width: 880px)");

    const handleResize = () => {
      if (screen.matches) {
        setMenuOpen(false);
      }
    };

    screen.addEventListener("change", handleResize);

    return () => {
      screen.removeEventListener("change", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/signin");
  };

  const handleRegister = () => {
    navigate("/signup");
  };
  return (
    <>
      {useMatch("/") && menuOpen && (
        <>
          <nav className="header__nav-open">
            <span className="header__text">{email}</span>
            <button className="header__button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </nav>
          <div className="header__line"></div>
        </>
      )}
      <header className="header">
        <img src={logo} alt="Logo del encabezado" className="header__logo" />
        {useMatch("/signin") && (
          <button className="header__button" onClick={handleRegister}>
            Regístrate
          </button>
        )}
        {useMatch("/signup") && (
          <button className="header__button" onClick={handleLogout}>
            Iniciar sesión
          </button>
        )}
        {useMatch("/") && (
          <>
            <button className="header__button-icon" onClick={toogleMenu}>
              <img
                className="header__icon"
                src={menuOpen ? close : menu}
                alt="Icono del desplegable"
              />
            </button>
            <nav className="header__nav">
              <span className="header__text">{email}</span>
              <button className="header__button" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </nav>
          </>
        )}
      </header>
      <div className="header__line"></div>
    </>
  );
}

export default Header;
