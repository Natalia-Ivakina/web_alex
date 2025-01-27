import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import Menu from "./components/Menu";
import BurgerMenuComponent from "./components/BurgerMenu";

const NavBar = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    //size of screen
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1000);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav>
            {!isSmallScreen && <Menu/>}
            {isSmallScreen && <BurgerMenuComponent/>}
        </nav>
    );
};

export default NavBar;