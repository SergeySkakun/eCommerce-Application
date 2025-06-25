import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import styles from "../styles.module.css";

export function LoginFooter(): ReactElement {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ mt: 2 }}
    >
      <Link className={styles.footer} to="/registration">
        Sign Up
      </Link>
      <Link className={styles.footer} to="/main">
        To Main
      </Link>
    </Grid>
  );
}
