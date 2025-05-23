import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

export default function LoginFooter(): ReactElement {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ mt: 2 }}
    >
      <Link to="/registration">Sign Up</Link>
      <Link to="/main">To Main</Link>
    </Grid>
  );
}
