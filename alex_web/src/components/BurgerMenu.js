import {Link} from "react-router-dom";

const BurgerMenuComponent = () => {
    return (
        <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
                <Link to="/">Home</Link>
                <Link to="/showreels">Show reels</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/moods">Moods</Link>
                <Link to="/amv">amvProjects</Link>
            </div>
        </div>

    );
};

export default BurgerMenuComponent;