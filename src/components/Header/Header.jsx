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
        <img src={logo_around} alt="imagem do logo da page" />
        {loggedIn ? (
          <div className="header__tokin">
            <p>{currentUser?.email}</p>
            <button onClick={handleLogout}>Sair</button>
          </div>
        ) : (
          <a href={text === "Entrar" ? "/login" : "/register"}>{text}</a>
        )}
      </nav>
    </header>
  );
}
export default Header;
