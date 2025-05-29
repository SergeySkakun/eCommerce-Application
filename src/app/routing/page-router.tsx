import React, { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
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
import { ObtainAnonymousAccessToken } from "../../shared/api";
import { Header, Footer } from "../../widgets";
import { BurgerMenu } from "../../widgets/header/burger-menu";

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
    // <BrowserRouter basename="/eCommerce-Application">
    <BrowserRouter>
      <UseCheckScreenSize />
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
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function UseCheckScreenSize(): ReactElement {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleResize = (): void => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <>{screenWidth > 710 ? <Header /> : <BurgerMenu />}</>;
}
