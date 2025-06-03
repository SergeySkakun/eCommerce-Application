import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CatalogContent } from "./catalog-content";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function CatalogProduct(): ReactNode {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CatalogContent />
    </ThemeProvider>
  );
}
