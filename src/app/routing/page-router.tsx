import React, { useEffect, type ReactNode } from "react";
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
  RegistrationPage,
  CatalogProduct,
  DetailedProduct,
  NotFound,
  ProfilePage,
  BasketPage,
  About,
} from "../../pages";
import {
  TotalQuantityContextProvider,
  useAuth,
  LoadingPlaceholder,
} from "../../shared";
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
    return <LoadingPlaceholder />;
  }

  if (!isLoggedIn) {
    return children;
  }

  return <Navigate to="/main" replace />;
}

function UserRoute({ children }: { children: ReactNode }): ReactNode {
  const { isLoggedIn, isAuthCheckReady } = useAuth();

  if (!isAuthCheckReady) {
    return <LoadingPlaceholder />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function PageRouter(): React.ReactNode {
  return (
    <>
      <BrowserRouter>
        <TotalQuantityContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MainRedirect />}></Route>
            <Route
              path="/main"
              element={
                <>
                  <Main />
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
                  <RegistrationPage />
                </GuestRoute>
              }
            ></Route>
            <Route path="/catalog" element={<CatalogProduct />}></Route>
            <Route
              path="/catalog/product/:productKey"
              element={<DetailedProduct />}
            ></Route>
            <Route
              path="/profile"
              element={
                <UserRoute>
                  <ProfilePage />
                </UserRoute>
              }
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/cart" element={<BasketPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </TotalQuantityContextProvider>

        <Footer />
      </BrowserRouter>
    </>
  );
}
