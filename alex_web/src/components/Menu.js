import {Link} from "react-router-dom";

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
                <Link to="/moods">Moods</Link>
            </li>
            <li>
                <Link to="/amv">amvProjects</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
        </ul>
    );
};

export default Menu;