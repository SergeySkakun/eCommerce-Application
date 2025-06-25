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
      <Link className="link-login-footer" to="/registration">
        Sign Up
      </Link>
      <Link className="link-login-footer" to="/main">
        To Main
      </Link>
    </Grid>
  );
}
