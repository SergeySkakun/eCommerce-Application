import { useEffect, useState } from "react";
import { AuthUserContext } from "../../shared";
import type { ReactNode } from "react";

export function AuthUserContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthCheckReady, setIsAuthCheckReady] = useState(false);

  useEffect(() => {
    const TOKEN_NAME = "user_access_token";
    const hasToken = document.cookie.includes(TOKEN_NAME);
    setIsLoggedIn(hasToken);
    setIsAuthCheckReady(true);
  }, []);

  function login(): void {
    setIsLoggedIn(true);
  }

  function logout(): void {
    document.cookie =
      "user_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
  }

  return (
    <AuthUserContext.Provider
      value={{ isLoggedIn, isAuthCheckReady, login, logout }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}
