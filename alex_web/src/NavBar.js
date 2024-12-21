import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu state
    };

    return (
        <nav>
            {/*<div className="burger-menu" onClick={toggleMenu}>*/}
            {/*    &#9776; /!* Burger icon *!/*/}
            {/*</div>*/}
            <ul className={isMenuOpen ? "show" : ""}> {/* Apply 'show' class based on state */}
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
                    <Link to="/moods">Moods</Link>
                </li>
                <li>
                    <Link to="/amv">amvProjects</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;