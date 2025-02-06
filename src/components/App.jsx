import Header from "../components/Header/Header.jsx";
import Main from "../../src/components/Main/Main.jsx";
import Footer from "../components/Footer/Footer.jsx";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useEffect, useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api.editProfile(data).then((newData) => {
        console.log(newData);

        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.editProfileAvatar(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.createCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      });
    })();
  };

  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id);
    setCards((state) =>
      state.filter((currentCard) => currentCard._id !== card._id)
    );
  }

  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;

    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page">
        <Header />
        <Main
          popup={popup}
          cards={cards}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
          handleClosePopup={handleClosePopup}
          handleOpenPopup={handleOpenPopup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
