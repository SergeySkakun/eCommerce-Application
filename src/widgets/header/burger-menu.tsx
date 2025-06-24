import * as React from "react";
import { Link } from "react-router-dom";
import type { HeaderPropertiesType } from "./types";
import "./styles.css";
import { IconButton, Popover } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { colorModeHandler, saveColorMode } from ".";

export function BurgerMenu({
  headerProperties,
}: {
  headerProperties: HeaderPropertiesType;
}): React.ReactElement {
  const [anchorElement, setAnchorElement] =
    React.useState<null | HTMLElement>();
  const {
    isLoggedIn,
    setIsDownloadPage,
    totalLineItemQuantity,
    actOnLogout,
    colorMode,
    setColorMode,
  } = headerProperties;
  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorElement(undefined);
  };

  React.useEffect(() => {
    saveColorMode(setColorMode);
  }, []);

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
            {location.pathname === "/main" ? (
              <>
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
              </>
            ) : (
              <Link to="/main" className="link-menu">
                <button className="burger-button" onClick={handleClose}>
                  MAIN
                </button>
              </Link>
            )}
            <Link to="/catalog" className="link-menu">
              <button onClick={clickOnCatalog} className="burger-button">
                CATALOG
              </button>
            </Link>
            {isLoggedIn ? (
              <>
                <button
                  className="burger-button"
                  onClick={() => {
                    actOnLogout();
                    handleClose();
                  }}
                >
                  LOGOUT
                </button>
                <Link to="/profile" className="link-menu">
                  <button
                    className="burger-button"
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
                onClick={() =>
                  colorModeHandler(colorMode, setColorMode, handleClose)
                }
              >
                {colorMode ? (
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
                    {totalLineItemQuantity === undefined
                      ? 0
                      : totalLineItemQuantity}
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
