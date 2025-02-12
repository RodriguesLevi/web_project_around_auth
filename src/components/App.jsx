// import { useState, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import Header from "../components/Header/Header.jsx";
// import Main from "../../src/components/Main/Main.jsx";
// import Footer from "../components/Footer/Footer.jsx";
// import Login from "./Login/Login.jsx";
// import Register from "./Register/Register.jsx";
// import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
// import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
// import api from "../utils/api.js";
// import auth from "../utils/auth.js";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
// // import { useEffect, useState } from "react";

// function App() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       auth
//         .checkToken(token)
//         .then((res) => {
//           setLoggedIn(true);
//           setCurrentUser(res.data);
//           navigate("/");
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [navigate]);

//   const handleLogin = (email, password) => {
//     auth
//       .login(email, password)
//       .then((res) => {
//         localStorage.setItem("token", res.token);
//         setLoggedIn(true);
//         navigate("/");
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleRegister = (email, password) => {
//     auth
//       .register(email, password)
//       .then(() => {
//         setIsSuccess(true);
//         setInfoTooltipOpen(true);
//         navigate("/login");
//       })
//       .catch(() => {
//         setIsSuccess(false);
//         setInfoTooltipOpen(true);
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//     navigate("/login");
//   };

//   useEffect(() => {
//     api
//       .getUserInfo()
//       .then((userData) => {
//         setCurrentUser(userData);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleUpdateUser = (data) => {
//     (async () => {
//       await api.editProfile(data).then((newData) => {
//         console.log(newData);

//         setCurrentUser(newData);
//         handleClosePopup();
//       });
//     })();
//   };
//   const handleUpdateAvatar = (data) => {
//     (async () => {
//       await api.editProfileAvatar(data).then((newData) => {
//         setCurrentUser(newData);
//         handleClosePopup();
//       });
//     })();
//   };

//   const handleAddPlaceSubmit = (data) => {
//     (async () => {
//       await api.createCard(data).then((newCard) => {
//         setCards([newCard, ...cards]);
//         handleClosePopup();
//       });
//     })();
//   };

//   const [popup, setPopup] = useState(null);
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     api
//       .getCards()
//       .then((initialCards) => {
//         setCards(initialCards);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   function handleOpenPopup(popup) {
//     setPopup(popup);
//   }
//   function handleClosePopup() {
//     setPopup(null);
//   }
//   function handleCardDelete(card) {
//     api.deleteCard(card._id);
//     setCards((state) =>
//       state.filter((currentCard) => currentCard._id !== card._id)
//     );
//   }

//   async function handleCardLike(card) {
//     // Verificar mais uma vez se esse cartão já foi curtido
//     const isLiked = card.isLiked;

//     // Enviar uma solicitação para a API e obter os dados do cartão atualizados
//     await api
//       .changeLikeCardStatus(card._id, !isLiked)
//       .then((newCard) => {
//         setCards((state) =>
//           state.map((currentCard) =>
//             currentCard._id === card._id ? newCard : currentCard
//           )
//         );
//       })
//       .catch((error) => console.error(error));
//   }
//   return (
//     <CurrentUserContext.Provider
//       value={{
//         currentUser,
//         handleUpdateUser,
//         handleUpdateAvatar,
//         handleAddPlaceSubmit,
//       }}
//     >
//       <div className="page">
//         <Header loggedIn={loggedIn} onLogout={handleLogout} />
//         <Routes>
//           <Route
//             path="/"
//             element={<ProtectedRoute element={<Main />} loggedIn={loggedIn} />}
//           />
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />
//           <Route
//             path="/register"
//             element={<Register onRegister={handleRegister} />}
//           />
//         </Routes>
//         <Main
//           popup={popup}
//           cards={cards}
//           handleCardDelete={handleCardDelete}
//           handleCardLike={handleCardLike}
//           handleClosePopup={handleClosePopup}
//           handleOpenPopup={handleOpenPopup}
//         />
//         <Footer />
//         <InfoTooltip
//           isOpen={infoTooltipOpen}
//           onClose={() => setInfoTooltipOpen(false)}
//           isSuccess={isSuccess}
//         />
//         <Login path="/login" />
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;
// Importações de bibliotecas e componentes
import { useState, useEffect } from "react"; // Hooks do React
import { Routes, Route, useNavigate } from "react-router-dom"; // Roteamento
import Header from "../components/Header/Header.jsx"; // Componente do cabeçalho
import Main from "../../src/components/Main/Main.jsx"; // Componente principal
import Footer from "../components/Footer/Footer.jsx"; // Componente do rodapé
import Login from "./Login/Login.jsx"; // Componente de login
import Register from "./Register/Register.jsx"; // Componente de registro
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx"; // Componente de mensagem (sucesso/erro)
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx"; // Rota protegida
import api from "../utils/api.js"; // Funções para chamadas à API
import auth from "../utils/auth.js"; // Funções de autenticação
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"; // Contexto do usuário atual

function App() {
  // Estados (variáveis que controlam o comportamento do componente)
  const [currentUser, setCurrentUser] = useState({}); // Dados do usuário atual
  const [loggedIn, setLoggedIn] = useState(false); // Verifica se o usuário está logado
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false); // Controla a exibição do popup de mensagem
  const [isSuccess, setIsSuccess] = useState(false); // Define se a mensagem é de sucesso ou erro
  const navigate = useNavigate(); // Hook para navegar entre rotas

  // Verifica se o usuário já está logado ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token"); // Pega o token do localStorage
    if (token) {
      auth
        .checkToken(token) // Verifica se o token é válido
        .then((res) => {
          setLoggedIn(true); // Define o usuário como logado
          setCurrentUser(res.data); // Atualiza os dados do usuário
          navigate("/"); // Redireciona para a página inicial
        })
        .catch((err) => console.error(err)); // Trata erros
    }
  }, [navigate]);

  // Função para lidar com o login
  const handleLogin = (email, password) => {
    auth
      .login(email, password) // Faz a requisição de login
      .then((res) => {
        localStorage.setItem("token", res.token); // Salva o token no localStorage
        setLoggedIn(true); // Define o usuário como logado
        setInfoTooltipOpen(true);
        setIsSuccess(true);
        navigate("/"); // Redireciona para a página inicial
      })
      .catch((err) => {
        console.error(err);
        setInfoTooltipOpen(true);
        setIsSuccess(false);
      }); // Trata erros
  };

  // Função para lidar com o registro
  const handleRegister = (email, password) => {
    auth
      .register(email, password) // Faz a requisição de registro
      .then(() => {
        setIsSuccess(true); // Define a mensagem como sucesso
        setInfoTooltipOpen(true); // Abre o popup de mensagem
        navigate("/login"); // Redireciona para a página de login
      })
      .catch(() => {
        setIsSuccess(false); // Define a mensagem como erro
        setInfoTooltipOpen(true); // Abre o popup de mensagem
      });
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setLoggedIn(false); // Define o usuário como deslogado
    navigate("/login"); // Redireciona para a página de login
  };

  // Busca as informações do usuário ao carregar a página
  useEffect(() => {
    api
      .getUserInfo() // Faz a requisição para obter os dados do usuário
      .then((userData) => {
        setCurrentUser(userData); // Atualiza os dados do usuário
      })
      .catch((err) => console.error(err)); // Trata erros
  }, []);

  // Função para atualizar os dados do usuário
  const handleUpdateUser = (data) => {
    (async () => {
      await api.editProfile(data).then((newData) => {
        console.log(newData); // Exibe os novos dados no console
        setCurrentUser(newData); // Atualiza os dados do usuário
        handleClosePopup(); // Fecha o popup
      });
    })();
  };

  // Função para atualizar o avatar do usuário
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.editProfileAvatar(data).then((newData) => {
        setCurrentUser(newData); // Atualiza os dados do usuário
        handleClosePopup(); // Fecha o popup
      });
    })();
  };

  // Função para adicionar um novo local
  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.createCard(data).then((newCard) => {
        setCards([newCard, ...cards]); // Adiciona o novo local à lista de locais
        handleClosePopup(); // Fecha o popup
      });
    })();
  };

  // Estados para controlar o popup e a lista de locais
  const [popup, setPopup] = useState(null); // Controla qual popup está aberto
  const [cards, setCards] = useState([]); // Lista de locais (cards)

  // Busca a lista de locais ao carregar a página
  useEffect(() => {
    api
      .getCards() // Faz a requisição para obter os locais
      .then((initialCards) => {
        setCards(initialCards); // Atualiza a lista de locais
      })
      .catch((err) => console.error(err)); // Trata erros
  }, []);

  // Função para abrir um popup
  function handleOpenPopup(popup) {
    setPopup(popup); // Define qual popup será aberto
  }

  // Função para fechar o popup
  function handleClosePopup() {
    setPopup(null); // Fecha o popup
  }

  // Função para deletar um local
  function handleCardDelete(card) {
    api.deleteCard(card._id); // Faz a requisição para deletar o local
    setCards(
      (state) => state.filter((currentCard) => currentCard._id !== card._id) // Remove o local da lista
    );
  }

  // Função para curtir/descurtir um local
  async function handleCardLike(card) {
    const isLiked = card.isLiked; // Verifica se o local já foi curtido
    await api
      .changeLikeCardStatus(card._id, !isLiked) // Faz a requisição para curtir/descurtir
      .then((newCard) => {
        setCards((state) =>
          state.map(
            (currentCard) =>
              currentCard._id === card._id ? newCard : currentCard // Atualiza o local na lista
          )
        );
      })
      .catch((error) => console.error(error)); // Trata erros
  }

  const handleCloseTooltip = () => {
    setInfoTooltipOpen(false);
  };

  // Renderização do componente
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
        loggedIn,
        setLoggedIn,
      }}
    >
      <div className="page">
        <Routes>
          {/* Rota protegida para a página inicial */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Header loggedIn={loggedIn} onLogout={handleLogout} />{" "}
                    {/* Cabeçalho */}
                    <Main
                      popup={popup}
                      cards={cards}
                      handleCardDelete={handleCardDelete}
                      handleCardLike={handleCardLike}
                      handleClosePopup={handleClosePopup}
                      handleOpenPopup={handleOpenPopup}
                    />
                    <Footer /> {/* Rodapé */}
                  </>
                }
                loggedIn={loggedIn}
              />
            }
          />
          {/* Rota para a página de login */}
          <Route
            path="/login"
            element={
              <>
                <Header text="Se inscreva" />
                <Login onLogin={handleLogin} />
              </>
            }
          />
          {/* Rota para a página de registro */}
          <Route
            path="/register"
            element={
              <>
                <Header text="Entrar" />
                <Register onRegister={handleRegister} />
              </>
            }
          />
        </Routes>
        {/* Componente principal */}

        {/* Popup de mensagem (sucesso/erro) */}
        {infoTooltipOpen ? (
          <InfoTooltip
            isOpen={infoTooltipOpen}
            onClose={handleCloseTooltip}
            isSuccess={isSuccess}
          />
        ) : null}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App; // Exporta o componente App
