import * as React from "react";
// import { RegistrationPage } from "./registration-page";
import { createRoot } from "react-dom/client";
import { RegistrationForm } from "./form/form";

const rootElement = document.querySelector("#root");

createRoot(rootElement).render(
  <React.StrictMode>
    <RegistrationForm />
  </React.StrictMode>,
);
