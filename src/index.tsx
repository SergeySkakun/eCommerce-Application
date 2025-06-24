import ReactDOM from "react-dom/client";
import { App } from "./app";

export const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(<App />);
