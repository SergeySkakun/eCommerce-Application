import { CartList, Title } from "./components";
import "./style.css";

export function BasketPage(): React.ReactElement {
  return (
    <div className="basket-page">
      <Title titleText={"Cart"} />
      <CartList />
    </div>
  );
}
