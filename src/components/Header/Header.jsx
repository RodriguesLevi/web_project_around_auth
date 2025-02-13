import logo_around from "../../images/logo_around.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header({ text }) {
  const { currentUser, loggedIn, setLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setLoggedIn(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <img className="" src={logo_around} alt="imagem do logo da page" />
        {loggedIn ? (
          <div className="nav__header-tokin">
            <p>{currentUser?.email}</p>
            <button className="nav__button" onClick={handleLogout}>
              Sair
            </button>
          </div>
        ) : (
          <a
            className="nav__header"
            href={text === "Entrar" ? "/login" : "/register"}
          >
            {text}
          </a>
        )}
      </nav>
    </header>
  );
}
export default Header;
