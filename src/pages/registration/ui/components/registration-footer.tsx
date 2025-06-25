import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import styles from "../styles.module.css";

export function RegistrationFooter(): ReactElement {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ my: 2 }}
    >
      <Link className={styles.footer} to="/login">
        Sign In
      </Link>
      <Link className={styles.footer} to="/main">
        To main
      </Link>
    </Grid>
  );
}
