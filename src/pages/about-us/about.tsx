import type { ReactElement } from "react";
import styles from "./about.module.css";

export function About(): ReactElement {
  return (
    <>
      <main className={styles.aboutPage}>
        <div className={styles.aboutContainer}>
          <p className={styles.title}>About us</p>
        </div>
      </main>
    </>
  );
}
