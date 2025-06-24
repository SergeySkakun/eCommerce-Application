import type { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function LoadingPlaceholder(): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "20px",
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        Loading...
      </Typography>
      <CircularProgress />
    </Box>
  );
}
