import ImagenInfo from "../images/Union.png";
function InfoTooltip() {
  return (
    <>
      <img
        src={ImagenInfo}
        alt="Imagen Referencial X"
        className="popup__informative-img"
      />
      <p className="popup__informative-txt">¡Correcto! Ya estás registrado.</p>
    </>
  );
}
export default InfoTooltip;
