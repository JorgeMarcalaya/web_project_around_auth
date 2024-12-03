export default function ImagePopup(props) {
  const { card } = props;
  return (
    <>
      <img src={card.link} alt="" class="popup__body-imagen" />
      <p class="popup__body-title">{card.name}</p>
    </>
  );
}
