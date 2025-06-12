import { Link } from "react-router-dom";
import "../styles/CustomMenu.css";

const CustomNavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/showreels">Reels</Link>
      </li>
      <li>
        <Link to="/projects">Projects</Link>
      </li>
      <li>
        <Link to="/amv">amvProjects</Link>
      </li>
      <li>
        <Link to="/contact">Hire me</Link>
      </li>
    </ul>
  </nav>
);

export default CustomNavBar;
