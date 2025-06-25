import type { ReactElement } from "react";
import { PageTitle } from "@/shared/ui";
import {
  RegistrationSuccessMessage,
  RegistrationFooter,
  RegistrationForm,
} from "./components";
import styles from "./styles.module.css";

export const RegistrationPage = (): ReactElement => {
  return (
    <div className={styles.page}>
      <RegistrationSuccessMessage />
      <div className={styles.content}>
        <PageTitle text={"Registration"} />
        <RegistrationForm />
        <RegistrationFooter />
      </div>
    </div>
  );
};
