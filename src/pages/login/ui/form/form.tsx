import type { ReactNode, FormEvent } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import EmailInput from "./email-input";
import PasswordInput from "./password-input";
import SubmitButton from "./submit-button";

const handleSubmit = (event_: FormEvent<HTMLFormElement>): void => {
  event_.preventDefault();
};

export function Form(): ReactNode {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: "4" }}>
      <EmailInput
        email={email}
        emailError={emailError}
        setEmail={setEmail}
        setEmailError={setEmailError}
      />
      <PasswordInput
        password={password}
        passwordError={passwordError}
        setPassword={setPassword}
        setPasswordError={setPasswordError}
      />
      <SubmitButton />
    </Box>
  );
}
