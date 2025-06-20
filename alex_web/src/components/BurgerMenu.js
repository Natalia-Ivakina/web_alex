import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Menu.css";

const BurgerMenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu">
      <button className="burger-button" onClick={toggleMenu}>
        &#9776;
      </button>
      <div className={`menu-content ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/showreels" onClick={toggleMenu}>
          Show reels
        </Link>
        <Link to="/projects" onClick={toggleMenu}>
          Projects
        </Link>
        <Link to="/amv" onClick={toggleMenu}>
          AMV Projects
        </Link>
        <Link to="/about" onClick={toggleMenu}>
          About
        </Link>
        <Link to="/contact" onClick={toggleMenu}>
          Hire me
        </Link>
      </div>
    </div>
  );
};

export default BurgerMenuComponent;
