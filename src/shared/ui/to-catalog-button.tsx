import { type ReactElement } from "react";
import { Link } from "react-router-dom";

export const ToCatalogButton = (): ReactElement => {
  return (
    <Link to="/catalog" className="link">
      <button className="button-main-head">CHOOSE THE RIGHT COMPANION</button>
    </Link>
  );
};
