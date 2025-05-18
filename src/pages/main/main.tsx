import type { ReactNode } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../shared";

export function Main(): ReactNode {
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      <h1>Main</h1>
      {isLoggedIn ? (
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            logout();
          }}
        >
          LogOut
        </Button>
      ) : null}
      {isLoggedIn ? null : (
        <Button variant="outlined" color="success" href="/login">
          Login
        </Button>
      )}
      {isLoggedIn ? null : (
        <Button variant="outlined" color="success" href="/registration">
          Registration
        </Button>
      )}
    </>
  );
}
