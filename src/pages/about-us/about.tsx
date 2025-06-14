import type { ReactElement } from "react";
import styles from "./about.module.css";

export function About(): ReactElement {
  return (
    <>
      <main className={styles.aboutPage}>
        <div className={styles.aboutContainer}>
          <p className={styles.title}>About us</p>
          <div className={styles.aboutContent}>
            <div className={styles.rsSchool}>
              <a className={styles.iconRS} href="https://rs.school/">
                RS School
              </a>
              <p className={styles.textRS}>
                We would like to express our gratitude to RS School and all its
                staff for giving us the opportunity to try something new and
                interesting. Thank you for your time. Special thanks to our
                mentor, who helped and motivated us on this long, difficult, but
                incredibly exciting journey.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
