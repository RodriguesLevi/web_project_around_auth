import logo_around from "../../images/logo_around.png";
function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <img src={logo_around} alt="imagem do logo da page" />
      </nav>
    </header>
  );
}
export default Header;
