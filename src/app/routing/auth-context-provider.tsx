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
    const TOKEN_NAME = "access_token";
    const cookie = document.cookie;
    setIsLoggedIn(cookie.includes(TOKEN_NAME));
    setIsAuthCheckReady(true);
  }, []);

  function login(): void {
    document.cookie = "access_token=116; expires=1 Jan 2026 00:00:00 GMT;";
    setIsLoggedIn(true);
  }

  function logout(): void {
    document.cookie = "access_token=; expires=1 Jan 2000 00:00:00 GMT;";
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
