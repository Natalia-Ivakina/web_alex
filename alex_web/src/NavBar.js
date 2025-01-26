import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "./components/Menu";

const NavBar = () => {
    return (
        <nav>
            <Menu/>
        </nav>
    );
};

export default NavBar;