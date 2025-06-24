import { type ReactElement } from "react";
import { Link } from "react-router-dom";

export const ToCatalogButton = ({
  setIsDownloadPage,
}: {
  setIsDownloadPage: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  return (
    <Link to="/catalog" className="link">
      <button
        className="button-main-head"
        onClick={() => setIsDownloadPage(true)}
      >
        CHOOSE THE RIGHT COMPANION
      </button>
    </Link>
  );
};
