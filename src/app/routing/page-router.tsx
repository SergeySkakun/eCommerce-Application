import React, { useEffect } from "react";
import type { ReactNode } from "react";
import {
  BrowserRouter,
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

function PrivateRoute({ children }: { children: ReactNode }): ReactNode | null {
  const { isLoggedIn, isAuthCheckReady } = useAuth();
  if (!isAuthCheckReady) {
    return <LoadingPage />;
  }

  if (isLoggedIn) {
    return <Navigate to="/main" replace />;
  }

  return children;
}

export function PageRouter(): React.ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainRedirect />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <LoginPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/registration"
          element={
            <PrivateRoute>
              <RegistrationForm />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
