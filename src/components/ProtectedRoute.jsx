import ImagenError from "../images/X.png";
function ProtectedRoute() {
  return (
    <>
      <img
        src={ImagenError}
        alt="Imagen Referencial X"
        className="popup__informative-img"
      />
      <p className="popup__informative-txt">
        Uy, algo salió mal. Por favor, inténtalo de nuevo.
      </p>
    </>
  );
}

export default ProtectedRoute;
