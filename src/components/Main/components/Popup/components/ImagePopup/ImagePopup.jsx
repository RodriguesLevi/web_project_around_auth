// import closeImage from "../../../../../images/close__image.png";

export default function ImagePopup(props) {
  const { name, link } = props.card;
  return (
    <div className="popup__image-container popup__container">
      <img className="popup__image-open" src={link} alt={name} />
      <p className="popup__image-name">{name}</p>
    </div>
  );
}
