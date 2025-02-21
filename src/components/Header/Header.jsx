import "./Header.css";
import logo from "/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt={logo} />
      <h1 className="">The Quizy</h1>
    </header>
  );
}

export default Header;
