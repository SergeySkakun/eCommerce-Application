import type { ReactNode } from "react";
import { PageRouter } from "./routing";
import { AuthUserContextProvider } from "./routing";
import { ObtainAnonymousAccessToken } from "../shared/api";

export function App(): ReactNode {
  return (
    <AuthUserContextProvider>
      <ObtainAnonymousAccessToken />
      <PageRouter />
    </AuthUserContextProvider>
  );
}
