import type { ReactNode } from "react";
import { PageRouter } from "./routing";
import { AuthUserContextProvider } from "./routing";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function App(): ReactNode {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthUserContextProvider>
        <PageRouter />
      </AuthUserContextProvider>
    </ThemeProvider>
  );
}
