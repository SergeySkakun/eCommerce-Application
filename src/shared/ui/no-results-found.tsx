import type { ReactElement } from "react";
import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export function NoResultsFound(): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        textAlign: "center",
        minHeight: "200px",
      }}
    >
      <SearchOffIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
      <Typography variant="h5" component="h2" gutterBottom>
        Products with that filter request are not found.
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Try to change filters or reset its
      </Typography>
    </Box>
  );
}
