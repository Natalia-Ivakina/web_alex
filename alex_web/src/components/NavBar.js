import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import BurgerMenuComponent from "./BurgerMenu";
import { useLocation } from "react-router-dom";
import "../styles/Menu.css";

const NavBar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  //size of screen
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        style={{
          backgroundColor: isHome ? "transparent" : "rgba(2, 2, 2, 0.3)",
        }}
      >
        {isSmallScreen ? (
          <>
            <div className="menu-row">
              <Menu />
              <BurgerMenuComponent />
            </div>
          </>
        ) : (
          <Menu />
        )}
      </nav>
    </>
  );
};

export default NavBar;
