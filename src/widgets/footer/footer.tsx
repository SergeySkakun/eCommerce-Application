import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export function Footer(): ReactNode {
  return (
    <>
      <footer className="footer">
        <div className="content">
          <Link to="/catalog" className="link-footer">
            <button className="button-footer">CATALOG</button>
          </Link>
          <Link to="/about" className="link-footer">
            <button className="button-footer">ABOUT</button>
          </Link>
          <div className="rs-school">
            <a className="rs-icon" href="https://rs.school"></a>
          </div>
          <div className="contacts">
            <div className="authors">
              <a className="github" href="https://github.com/SergeySkakun"></a>
              Sergey Skakun
            </div>
            <div className="authors">
              <a className="github" href="https://github.com/Bubnov-Roma"></a>
              Roma Bubnov
            </div>
            <div className="authors">
              <a
                className="github"
                href="https://github.com/DmitryStarchenko"
              ></a>
              Dmitry Starchenko
            </div>
          </div>
          <div className="description">2025 Fast and RUSH</div>
          <div className="description">
            All content is generated with the help of AI
          </div>
        </div>
      </footer>
    </>
  );
}
