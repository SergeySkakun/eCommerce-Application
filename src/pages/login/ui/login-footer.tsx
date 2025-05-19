import type { ReactElement } from "react";
import { Typography, Grid, Link } from "@mui/material";

export default function LoginFooter(): ReactElement {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ mt: 2 }}
    >
      <Typography>Don't have an account?</Typography>
      <Link href="/registration">Sign Up</Link>
    </Grid>
  );
}
