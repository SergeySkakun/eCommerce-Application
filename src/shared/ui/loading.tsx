import type { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function LoadingPlaceholder(): ReactElement {
  return (
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
  );
}
