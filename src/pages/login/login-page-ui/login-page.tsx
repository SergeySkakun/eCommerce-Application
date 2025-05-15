import React, { useState } from "react";
import type { ChangeEvent, FormEvent, ReactElement } from "react";
import {
  TextField,
  Box,
  Button,
  Typography,
  Avatar,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Grid,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DraftsSharpIcon from "@mui/icons-material/DraftsSharp";

const LoginPage = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleEmailChange = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setEmail(event_.target.value);
    if (/^[\w!$%.:-]+@[\d.A-Za-z-]+\.[A-Za-z]+$/.test(event_.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address");
    }
  };
  const passwordValidator = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
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
        "Password must contain at least 1 special character, like: !#$%&?@&% ",
      );
    }
  };

  const handleSubmit = (event_: FormEvent<HTMLFormElement>): void => {
    event_.preventDefault();
    if (!(emailError || passwordError)) {
      const userLogin = { email: email, password: password };
      alert(userLogin);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ mt: 8, p: 2 }}>
        <Avatar
          sx={{
            mt: 3,
            width: "6rem",
            height: "6rem",
            mx: "auto",
            textAlign: "center",
            bgcolor: "silver",
          }}
        >
          <DraftsSharpIcon
            sx={{
              width: "60%",
              height: "60%",
              mx: "auto",
              textAlign: "center",
              bgcolor: "silver",
            }}
          />
        </Avatar>
        <Typography
          fontWeight={"100"}
          component="h1"
          variant="h3"
          sx={{ textAlign: "center", mt: 4, mb: 6 }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: "4" }}
        >
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
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 5,
              display: "block",
              pt: 1,
              pb: 1,
              bgcolor: "sandybrown",
            }}
          >
            <Typography fontWeight={"400"} variant="h6">
              Sign In
            </Typography>
          </Button>
        </Box>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
        >
          <Grid>
            <Typography>Don't have an account?</Typography>
          </Grid>
          <Grid>
            <Link
              href="#"
              // component={Routeing}
              // to ="/register"
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export { LoginPage };
