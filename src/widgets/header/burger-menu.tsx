import * as React from "react";
import { Link } from "react-router-dom";
import type { HeaderPropertiesType } from "./types";
import "./styles.css";
import { IconButton, Popover } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { changeMode } from ".";

export function BurgerMenu({
  headerProperties,
}: {
  headerProperties: HeaderPropertiesType;
}): React.ReactElement {
  const [lightMode, setLightMode] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const [anchorElement, setAnchorElement] =
    React.useState<null | HTMLElement>();
  const { isLoggedIn, setIsDownloadPage, totalLineItemQuantity, actOnLogout } =
    headerProperties;
  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorElement(undefined);
  };

  const colorModeHandler = (): void => {
    if (darkMode) {
      setDarkMode(false);
      setLightMode(true);
      handleClose();
      changeMode();
    } else {
      setDarkMode(true);
      setLightMode(false);
      handleClose();
      changeMode();
    }
  };
  const clickOnCatalog = (): void => {
    void (handleClose(), setIsDownloadPage(true));
  };
  return (
    <>
      <header className="burger-header">
        <div
          className="burger-button"
          aria-controls={open ? "burger-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <IconButton
            className="icon-burger-menu"
            aria-label="Example"
          ></IconButton>
        </div>
        <Popover
          className="burger-menu"
          anchorEl={anchorElement}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="button-burger-menu">
            <a href="#history" className="link-menu">
              <button onClick={handleClose} className="burger-button">
                HISTORY
              </button>
            </a>
            <a href="#technology" className="link-menu">
              <button onClick={handleClose} className="burger-button">
                TECHNOLOGY
              </button>
            </a>
            <Link to="/catalog" className="link-menu">
              <button onClick={clickOnCatalog} className="burger-button">
                CATALOG
              </button>
            </Link>
            {isLoggedIn ? (
              <>
                <button
                  className="button button-logout"
                  onClick={() => {
                    actOnLogout();
                    handleClose();
                  }}
                >
                  LOGOUT
                </button>
                <Link to="/profile" className="link-menu">
                  <button
                    className="button button-logout"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    PROFILE
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="link-menu">
                  <button onClick={handleClose} className="burger-button">
                    LOGIN
                  </button>
                </Link>
                <Link to="/registration" className="link-menu">
                  <button onClick={handleClose} className="burger-button">
                    REGISTRATION
                  </button>
                </Link>
              </>
            )}
            <Link to="/about" className="link-menu">
              <button onClick={handleClose} className="burger-button">
                ABOUT
              </button>
            </Link>
            <div className="button-icon">
              <button
                className="button burger-button-mode"
                onClick={colorModeHandler}
              >
                {lightMode ? (
                  <LightModeIcon fontSize="large" />
                ) : (
                  <DarkModeIcon fontSize="large" />
                )}
              </button>
              <Link to="/cart" className="burger-link-menu">
                <button
                  className="button burger-button-cart"
                  onClick={handleClose}
                >
                  <ShoppingCartIcon fontSize="large" />
                  <div className="burger-quantity-item">
                    {totalLineItemQuantity}
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </Popover>
        <Link to="/main" className="burger-logo">
          <span className="title">Fast and RUSH</span>
        </Link>
      </header>
    </>
  );
}
