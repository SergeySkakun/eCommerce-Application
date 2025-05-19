import type { ReactElement } from "react";
import { Typography } from "@mui/material";

export default function LoginTitle(): ReactElement {
  return (
    <Typography
      fontWeight={"100"}
      component="h1"
      variant="h3"
      sx={{ textAlign: "center", mt: 4, mb: 6 }}
    >
      Login
    </Typography>
  );
}
