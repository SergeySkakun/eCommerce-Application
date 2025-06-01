import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useAuth } from "../../shared";

export function WideScreenHeader(): ReactNode {
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      <header className="header">
        <div className="menu">
          <a href="#history" className="link-menu">
            <button className="button button-history">HISTORY</button>
          </a>
          <a href="#technology" className="link-menu">
            <button className="button button-technology">TECHNOLOGY</button>
          </a>
          <Link to="/catalog" className="link-menu">
            <button className="button button-product">CATALOG</button>
          </Link>
        </div>
        <Link to="/main" className="logo">
          <span className="title">Fast and RUSH</span>
        </Link>
        <div className="menu">
          {isLoggedIn ? (
            <>
              <button
                className="button button-logout"
                onClick={() => {
                  logout();
                }}
              >
                LOGOUT
              </button>
              <Link to="/profile" className="link-menu">
                <button className="button button-login">PROFILE</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="link-menu">
                <button className="button button-login">LOGIN</button>
              </Link>
              <Link to="/registration" className="link-menu">
                <button className="button button-reg">REGISTRATION</button>
              </Link>
            </>
          )}
          <Link to="/about" className="link-menu">
            <button className="button button-about">ABOUT</button>
          </Link>
        </div>
      </header>
    </>
  );
}
