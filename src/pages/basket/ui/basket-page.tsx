import { CartList } from "./components";
import "./style.css";

export function BasketPage(): React.ReactElement {
  return (
    <div className="basket-page">
      <h2 className="title-cart">CART</h2>
      <CartList />
    </div>
  );
}
