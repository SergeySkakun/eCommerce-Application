import * as React from "react";
import { LoginPage } from "./login-page";
import { createRoot } from "react-dom/client";

createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
);
