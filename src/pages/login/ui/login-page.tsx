import type { ReactElement } from "react";
import { PageTitle } from "@/shared/ui";
import { LoginFooter, LoginForm } from "./components";
import styles from "./styles.module.css";

export const LoginPage = (): ReactElement => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <PageTitle text={"Login"} />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
};
