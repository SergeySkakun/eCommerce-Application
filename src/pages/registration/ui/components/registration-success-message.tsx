import type { ReactElement } from "react";
import styles from "../styles.module.css";

export function RegistrationSuccessMessage(): ReactElement {
  return <div className={styles.alert}>You have successfully registered</div>;
}
