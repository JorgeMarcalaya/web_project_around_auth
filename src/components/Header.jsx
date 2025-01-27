import logo from "../../images/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo del encabezado" className="header__logo" />
      <span className="header__line"></span>
    </header>
  );
}

export default Header;
