import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { HeaderPropertiesType } from "./types";
import "./styles.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { colorModeHandler, saveColorMode } from ".";

export function WideScreenHeader({
  headerProperties,
}: {
  headerProperties: HeaderPropertiesType;
}): ReactNode {
  const {
    isLoggedIn,
    totalLineItemQuantity,
    setIsDownloadPage,
    actOnLogout,
    colorMode,
    setColorMode,
  } = headerProperties;

  useEffect(() => {
    saveColorMode(setColorMode);
  }, []);

  return (
    <>
      <header className="header">
        <div className="menu">
          <button
            className="button button-mode"
            onClick={() => colorModeHandler(colorMode, setColorMode)}
          >
            {colorMode ? (
              <LightModeIcon fontSize="large" />
            ) : (
              <DarkModeIcon fontSize="large" />
            )}
          </button>
          <a href="#history" className="link-menu">
            <button className="button button-history">HISTORY</button>
          </a>
          <a href="#technology" className="link-menu">
            <button className="button button-technology">TECHNOLOGY</button>
          </a>
          <Link to="/catalog" className="link-menu">
            <button
              className="button button-product"
              onClick={() => setIsDownloadPage(true)}
            >
              CATALOG
            </button>
          </Link>
        </div>
        <Link to="/main" className="logo">
          <span className="title">Fast and RUSH</span>
        </Link>
        <div className="menu">
          {isLoggedIn ? (
            <>
              <button className="button" onClick={actOnLogout}>
                LOGOUT
              </button>
              <Link to="/profile" className="link-menu">
                <button className="button">PROFILE</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="link-menu">
                <button className="button">LOGIN</button>
              </Link>
              <Link to="/registration" className="link-menu">
                <button className="button button-reg">REGISTRATION</button>
              </Link>
            </>
          )}
          <Link to="/about" className="link-menu">
            <button className="button button-about">ABOUT</button>
          </Link>
          <Link to="/cart" className="link-menu">
            <button className="button button-cart">
              <ShoppingCartIcon fontSize="large" />
              <div className="quantity-item">
                {totalLineItemQuantity === undefined
                  ? 0
                  : totalLineItemQuantity}
              </div>
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
