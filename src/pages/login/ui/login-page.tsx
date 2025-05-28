import type { ReactElement } from "react";
import LoginTitle from "./login-title";
import { Form } from "./form";
import LoginFooter from "./login-footer";
import "./styles.css";

const LoginPage = (): ReactElement => {
  return (
    <div className="login-page">
      <div className="login-content">
        <LoginTitle />
        <Form />
        <LoginFooter />
      </div>
    </div>
  );
};

export { LoginPage };
