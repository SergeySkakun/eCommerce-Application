import { type ReactElement } from "react";
import "./styles.css";
import type { Cart } from "../../../shared";
import { getCart } from "../api";

export async function Cart(): Promise<ReactElement> {
  const dataCart = await getCart();
  console.log(dataCart);
  return (
    <main className="main-cart">
      <div className="cart-content">Cart</div>
    </main>
  );
}
