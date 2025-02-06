import Trash from "../../../../images/Trash.png";
import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup, handleCardLike, handleCardDelete } = props;

  const imagePopup = { children: <ImagePopup card={props.card} /> };

  const cardLikeButtonClassName = `cards__button-like ${
    isLiked ? "cards__button-like_is-active" : ""
  }`;

  return (
    <div className="cards__container">
      <button className="cards__button-remove">
        <img
          src={link}
          alt="image"
          className="cards__image"
          onClick={() => handleOpenPopup(imagePopup)}
        />
      </button>
      <img
        id="remove-image"
        src={Trash}
        alt="delete"
        className="cards__delete"
        onClick={() => handleCardDelete(props.card)}
      />
      <div className="cards__container-title">
        <h3 className="cards__container-name">{name}</h3>
        <div className="cards__container-button">
          <button
            onClick={() => handleCardLike(props?.card)}
            className={cardLikeButtonClassName}
          />
          <span className="cards__like-counter">
            {props?.card?.likes?.length}
          </span>
        </div>
      </div>
    </div>
  );
}
