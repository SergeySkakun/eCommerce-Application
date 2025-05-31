import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../shared";
import { IconButton, Popover } from "@mui/material";
import "./styles.css";

export function BurgerMenu(): React.ReactElement {
  const { isLoggedIn, logout } = useAuth();
  const [anchorElement, setAnchorElement] =
    React.useState<null | HTMLElement>();
  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorElement(undefined);
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
              <button onClick={handleClose} className="burger-button">
                CATALOG
              </button>
            </Link>
            {isLoggedIn ? (
              <>
                <button
                  className="button button-logout"
                  onClick={() => {
                    logout();
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
          </div>
        </Popover>
        <Link to="/main" className="burger-logo">
          <span className="title">Fast and RUSH</span>
        </Link>
      </header>
    </>
  );
}
