import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export function NotFound(): ReactElement {
  return (
    <>
      <div className="page-404">
        <div className="content-404">
          <p className="error-text">404 Not Found</p>
          <Link to="/main">
            <button className="button-main-head">Back to Main page</button>
          </Link>
        </div>
      </div>
    </>
  );
}
