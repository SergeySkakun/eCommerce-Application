import { type ReactElement } from "react";
import "./styles.css";
import type { Cart } from "../../../shared";

export function Cart(): ReactElement {
  return (
    <main className="main-cart">
      <div className="cart-content">Cart</div>
    </main>
  );
}
