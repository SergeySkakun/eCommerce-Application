import type { ReactNode } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../shared";

export function Registration(): ReactNode {
  const { login } = useAuth();
  return (
    <>
      <h1>Registration</h1>
      <Button
        variant="outlined"
        color="success"
        onClick={() => {
          login();
        }}
      >
        Registration Add Cookie
      </Button>
      <Button variant="outlined" color="success" href="/main">
        Main
      </Button>
    </>
  );
}
