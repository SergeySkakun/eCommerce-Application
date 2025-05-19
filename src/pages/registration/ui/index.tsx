import * as React from "react";
import { createRoot } from "react-dom/client";
import { RegistrationForm } from "./form/form";
// import { ObtainAnonymousAccessToken } from "../../../shared/api";

const rootElement = document.querySelector("#root");

createRoot(rootElement).render(
  <React.StrictMode>
    {/* <ObtainAnonymousAccessToken/> */}
    <RegistrationForm />
  </React.StrictMode>,
);
