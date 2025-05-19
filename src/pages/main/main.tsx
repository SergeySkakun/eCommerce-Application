import type { ReactNode } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../shared";

export function Main(): ReactNode {
  const { isLoggedIn, isAuthCheckReady, logout } = useAuth();
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
      ) : /* eslint-disable unicorn/no-null */
      null}
      {!isAuthCheckReady || isLoggedIn ? null : (
        /* eslint-enable unicorn/no-null */
        <>
          <Button variant="outlined" color="success" href="/login">
            Login
          </Button>
          <Button variant="outlined" color="success" href="/registration">
            Registration
          </Button>
        </>
      )}
    </>
  );
}
