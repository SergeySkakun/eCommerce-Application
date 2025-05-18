import type { ReactNode } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../shared";

export function Login(): ReactNode {
  const { login } = useAuth();
  return (
    <>
      <h1>Login</h1>
      <Button
        variant="outlined"
        color="success"
        onClick={() => {
          login();
        }}
      >
        Login Add Cookie
      </Button>
    </>
  );
}
