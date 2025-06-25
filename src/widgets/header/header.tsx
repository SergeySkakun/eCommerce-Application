import type { ReactElement } from "react";
import { useEffect, useState, useContext } from "react";
import { BurgerMenu, WideScreenHeader } from ".";
import { TotalLineItemQuantityContext, useAuth } from "../../shared";

export function Header(): ReactElement {
  const [colorMode, setColorMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const {
    totalLineItemQuantity,
    setIsDownloadPage,
    setTotalLineItemQuantity,
    setProductsCheckout,
  } = useContext(TotalLineItemQuantityContext);
  const { isLoggedIn, logout } = useAuth();

  const handleResize = (): void => {
    setScreenWidth(window.innerWidth);
  };

  const actOnLogout = (): void => {
    logout();
    setProductsCheckout([{ id: "", productId: "" }]);
    setTotalLineItemQuantity(0);
  };

  const headerProperties = {
    isLoggedIn,
    totalLineItemQuantity,
    setIsDownloadPage,
    actOnLogout,
    setColorMode,
    colorMode,
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {screenWidth > 915 ? (
        <WideScreenHeader headerProperties={headerProperties} />
      ) : (
        <BurgerMenu headerProperties={headerProperties} />
      )}
    </>
  );
}
