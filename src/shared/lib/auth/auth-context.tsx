import { createContext } from "react";

export type AuthContextType = {
  isLoggedIn: boolean;
  isAuthCheckReady: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthUserContext = createContext<AuthContextType | undefined>(
  undefined
);
