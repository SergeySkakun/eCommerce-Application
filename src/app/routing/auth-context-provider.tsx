import { useEffect, useState } from "react";
import {
  AuthUserContext,
  hasLoggedInToken,
  obtainAnonymousAccessToken,
} from "../../shared";
import type { ReactNode } from "react";

export function AuthUserContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [isGuestAccess, setIsGuestAccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthCheckReady, setIsAuthCheckReady] = useState(false);

  const getGuestToken = async (): Promise<void> => {
    if (!hasLoggedInToken()) {
      await obtainAnonymousAccessToken().then(() => setIsGuestAccess(true));
    }
  };

  useEffect(() => {
    void getGuestToken();
    setIsLoggedIn(hasLoggedInToken());
    setIsAuthCheckReady(true);
  }, []);

  function login(): void {
    if (hasLoggedInToken()) {
      setIsLoggedIn(true);
    }
  }

  function logout(): void {
    document.cookie =
      "user_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "active_user_ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setIsGuestAccess(false);
    void getGuestToken();
  }

  return (
    <AuthUserContext.Provider
      value={{ isGuestAccess, isLoggedIn, isAuthCheckReady, login, logout }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}
