import { CartList, Title } from "./components";
import { products } from "./components/orders";
import "./style.css";

export function BasketPage(): React.ReactElement {
  return (
    <div className="basket-page">
      <Title titleText={"Cart"} />
      <CartList products={products} />
    </div>
  );
}
