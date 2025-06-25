import { createContext } from "react";

export type AuthContextType = {
  readonly isGuestAccess: boolean;
  readonly isLoggedIn: boolean;
  readonly isAuthCheckReady: boolean;
  readonly login: () => void;
  readonly logout: () => void;
};

export const AuthUserContext = createContext<AuthContextType | undefined>(
  undefined,
);
