import type { ReactNode } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
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
      ) : (
        <>
          <Link to="/login">
            <Button variant="outlined" color="success">
              Login
            </Button>
          </Link>
          <Link to="/registration">
            <Button variant="outlined" color="success">
              Registration
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
