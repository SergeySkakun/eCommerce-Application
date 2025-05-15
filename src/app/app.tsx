import { authenticateCustomer } from "../pages/login/authenticate-customer";
import { ObtainAccessToken } from "./../shared/api/index";
import { createRoot } from "react-dom/client";
import { login } from "./mock";

function App(): void {
  const root = createRoot(document.querySelector("#root"));
  let errorMessage: string = "";
  root.render(
    <>
      <ObtainAccessToken />
      <button>Sign Up</button>
      <button
        onClick={() => {
          authenticateCustomer(login)
            .then((response) => (errorMessage = response))
            .catch((error) => console.log(error));
        }}
      >
        Sign In
      </button>
      <span>{errorMessage}</span>
    </>
  );
}

App();
