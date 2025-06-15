import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Menu.css";

const Menu = () => {
  const [isCompact, setIsCompact] = useState(window.innerWidth < 1150);
  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 1150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <ul>
      {!isCompact && (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/showreels">Show reels</Link>
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
        </>
      )}
    </ul>
  );
};

export default Menu;
