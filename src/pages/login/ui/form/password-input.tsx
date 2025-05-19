import type { ReactNode, ChangeEvent } from "react";
import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordInputProperties = {
  password: string;
  passwordError: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
};

export default function PasswordInput({
  password,
  passwordError,
  setPassword,
  setPasswordError,
}: PasswordInputProperties): ReactNode {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleClickShowPassword = (): void =>
    setIsVisiblePassword((isVisible) => !isVisible);

  const passwordValidator = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setPassword(event_.target.value);
    if (!event_.target.value) {
      setPasswordError("Password is required");
    } else if (event_.target.value.length < 8) {
      setPasswordError("Password must be 8 or more characters");
    } else if (!/\d/.test(event_.target.value)) {
      setPasswordError("Password must contain at least 1 number");
    } else if (!/[A-Z]/g.test(event_.target.value)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/[a-z]/g.test(event_.target.value)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!/^\S*$/g.test(event_.target.value)) {
      setPasswordError("Password must not contain whitespace");
    } else if (/[!#$%&?@]/g.test(event_.target.value)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must contain at least 1 special character, like: !#$%&?@&% "
      );
    }
  };

  return (
    <TextField
      fullWidth
      required
      sx={{ mt: 2, pb: 4, boxSizing: "border-box" }}
      label="Password"
      placeholder="Enter password"
      value={password}
      onChange={passwordValidator}
      error={Boolean(passwordError)}
      helperText={passwordError}
      type={isVisiblePassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {isVisiblePassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
