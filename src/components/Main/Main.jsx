import buttonAdd from "../../images/profile__add.png";
import profileButton from "../../images/profile__botton.png";
import profileAdd from "../../images/image_header.jpg";
import NewCard from "./components/Popup/components/NewCard.jsx";
import { useContext } from "react";
import Popup from "./components/Popup/Popup.jsx";
import Card from "./components/Card/Card.jsx";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

const newCardPopup = { title: "Novo cartão", children: <NewCard /> };
const editAvatarPopup = {
  title: "Alterar a foto de perfil",
  children: <EditAvatar />,
};
const editProfilePopup = {
  title: "Editar Perfil",
  children: <EditProfile />,
};

function Main({
  popup,
  cards,
  handleCardDelete,
  handleCardLike,
  handleClosePopup,
  handleOpenPopup,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile-edit-avt">
          <img
            src={currentUser?.avatar || profileAdd}
            alt=" imagem do perfil"
            className="profile__image"
          />
          <button
            alt="Editar avatar"
            className="profile__edit-photo"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__card">
          <h2 className="profile__name">
            {currentUser?.name || "Jacques Cousteau"}
          </h2>
          <div>
            <button className="profile__button">
              <img
                src={profileButton}
                alt="botao"
                id="#login"
                onClick={() => handleOpenPopup(editProfilePopup)}
              />
            </button>
          </div>
          <p className="profile__description">
            {currentUser?.about || "Explorador"}
          </p>
        </div>

        <button className="profile__add">
          <img
            src={buttonAdd}
            alt="adicionar"
            className="profile__add-bt"
            onClick={() => handleOpenPopup(newCardPopup)}
          />
        </button>
      </section>
      <section className="cards">
        {cards?.map((card) => (
          <Card
            key={card?._id}
            card={card}
            handleOpenPopup={handleOpenPopup}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
export default Main;
