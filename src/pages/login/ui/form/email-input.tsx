import type { ReactNode, ChangeEvent } from "react";
import { TextField } from "@mui/material";

type EmailInputProperties = {
  email: string;
  emailError: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
};

export default function EmailInput({
  email,
  emailError,
  setEmail,
  setEmailError,
}: EmailInputProperties): ReactNode {
  const handleEmailChange = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setEmail(event_.target.value);
    if (/^[\w!$%.:-]+@[\d.A-Za-z-]+\.[A-Za-z]+$/.test(event_.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address");
    }
  };

  return (
    <TextField
      fullWidth
      required
      sx={{ mt: 2, pb: 2, boxSizing: "border-box" }}
      label="Email"
      placeholder="Enter email"
      value={email}
      onChange={handleEmailChange}
      error={Boolean(emailError)}
      helperText={emailError}
    />
  );
}
