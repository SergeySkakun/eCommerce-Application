import type { ReactElement } from "react";
import { Typography } from "@mui/material";

export default function LoginTitle(): ReactElement {
  return (
    <Typography className="title-login" component="h1" variant="h3">
      Login
    </Typography>
  );
}
