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
    const cookie = document.cookie;
    setIsLoggedIn(cookie.includes(TOKEN_NAME));
    setIsAuthCheckReady(true);
  }, []);

  function login(): void {
    setIsAuthCheckReady(false);
    setIsLoggedIn(true);
  }

  function logout(): void {
    document.cookie =
      "user_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthCheckReady(false);
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
