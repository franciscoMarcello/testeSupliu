import { Link } from "react-router-dom";
import "./navbar.css";
function NavBar() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/AddAlbum">Adicionar album</Link>
      <Link to="/AddFaixa">Adicionar faixa</Link>
    </div>
  );
}

export default NavBar;
