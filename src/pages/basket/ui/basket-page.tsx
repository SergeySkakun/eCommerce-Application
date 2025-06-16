import { CartList } from "./components";
import styles from "./basket-page.module.css";

export function BasketPage(): React.ReactElement {
  return (
    <div className={styles.basket}>
      <div className={styles.title}>CART</div>
      <CartList />
    </div>
  );
}
