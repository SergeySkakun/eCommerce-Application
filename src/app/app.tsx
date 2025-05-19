import type { ReactNode } from "react";
import { PageRouter } from "./routing";
import { AuthUserContextProvider } from "./routing";

export function App(): ReactNode {
  return (
    <AuthUserContextProvider>
      <PageRouter />
    </AuthUserContextProvider>
  );
}
