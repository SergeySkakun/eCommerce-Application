import React, { useEffect } from "react";
import type { ReactNode } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  Main,
  LoginPage,
  RegistrationForm,
  NotFound,
  LoadingPage,
} from "../../pages";
import { useAuth } from "../../shared";

function MainRedirect(): undefined {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate("/main", { replace: true });
  }, [navigate]);
  return undefined;
}

function GuestRoute({ children }: { children: ReactNode }): ReactNode {
  const { isLoggedIn, isAuthCheckReady } = useAuth();

  if (!isAuthCheckReady) {
    return <LoadingPage />;
  }

  if (!isLoggedIn) {
    return children;
  }

  return <Navigate to="/main" replace />;
}

export function PageRouter(): React.ReactNode {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainRedirect />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        ></Route>
        <Route
          path="/registration"
          element={
            <GuestRoute>
              <RegistrationForm />
            </GuestRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  );
}
