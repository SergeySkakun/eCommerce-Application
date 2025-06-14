import { CartList, Title } from "./components";
import styles from "./basket-page.module.css";

export function BasketPage(): React.ReactElement {
  return (
    <div className={styles.basket}>
      <Title titleText={"Cart"} />
      <CartList />
    </div>
  );
}
