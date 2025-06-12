import { Link } from "react-router-dom";
import "../styles/Menu.css";

const Menu = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/showreels">Show reels</Link>
      </li>
      <li>
        <Link to="/projects">Projects</Link>
      </li>
      <li>
        <Link to="/amv">amvProjects</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Hire me</Link>
      </li>
    </ul>
  );
};

export default Menu;
