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
  CatalogProduct,
  DetailedProduct,
  NotFound,
  LoadingPage,
  ProfilePage,
} from "../../pages";
import { useAuth } from "../../shared";
import { ObtainAnonymousAccessToken } from "../../shared/api";
import { Header, Footer } from "../../widgets";

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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainRedirect />}></Route>
        <Route
          path="/main"
          element={
            <>
              <Main />
              <ObtainAnonymousAccessToken />
            </>
          }
        ></Route>
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
        <Route path="/catalog" element={<CatalogProduct />}></Route>
        <Route
          path="/catalog/product/:productKey"
          element={<DetailedProduct />}
        ></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
