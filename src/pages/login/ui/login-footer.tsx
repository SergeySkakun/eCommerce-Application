import type { ReactElement } from "react";
import { Grid, Link } from "@mui/material";

export default function LoginFooter(): ReactElement {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ mt: 2 }}
    >
      <Link href="/registration">Sign Up</Link>
      <Link href="/registration">To main</Link>
    </Grid>
  );
}
