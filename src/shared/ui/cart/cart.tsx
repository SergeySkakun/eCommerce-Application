import { type ReactElement } from "react";
import "./styles.css";
import { getCart } from "../../../pages/basket/api";

const getCurrentCart = async (): Promise<void> => {
  await getCart();
};

export function Cart(): ReactElement {
  void getCurrentCart();

  return (
    <main className="main-cart">
      <div className="cart-content">Cart</div>
    </main>
  );
}
