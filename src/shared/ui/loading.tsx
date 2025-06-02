import type { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function LoadingPlaceholder(): ReactElement {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          Loading...
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
