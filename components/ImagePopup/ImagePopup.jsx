export default function ImagePopup(props) {
  const { card } = props;
  return (
    <>
      <img src={card.link} alt="" className="popup__body-imagen" />
      <p className="popup__body-title">{card.name}</p>
    </>
  );
}
