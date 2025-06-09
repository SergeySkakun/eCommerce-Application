import { useContext } from "react";
import type { AuthContextType } from "./auth-context";
import { AuthUserContext } from "./auth-context";

export function useAuth(): AuthContextType {
  const context = useContext(AuthUserContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
