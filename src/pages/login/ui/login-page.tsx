import type { ReactElement } from "react";
import { Paper, Container } from "@mui/material";

import GuestAvatar from "./avatar";
import LoginTitle from "./login-title";
import { Form } from "./form";
import LoginFooter from "./login-footer";

const LoginPage = (): ReactElement => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ mt: 8, p: 2 }}>
        <GuestAvatar />
        <LoginTitle />
        <Form />
        <LoginFooter />
      </Paper>
    </Container>
  );
};

export { LoginPage };
