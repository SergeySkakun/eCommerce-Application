import type { ReactElement } from "react";
import { BurgerMenu, WideScreenHeader } from ".";
import { useEffect, useState } from "react";

export function Header(): ReactElement {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleResize = (): void => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <>{screenWidth > 710 ? <WideScreenHeader /> : <BurgerMenu />}</>;
}
