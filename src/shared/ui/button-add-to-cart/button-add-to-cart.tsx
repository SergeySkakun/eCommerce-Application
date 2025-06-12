import { useContext, useEffect, useState, type ReactElement } from "react";
import {
  addingDeletingModifyingItemsInCart,
  TotalLineItemQuantityContext,
} from "../..";
import "./styles.css";

export function ButtonAddToCart({
  productId,
}: {
  productId: string;
}): ReactElement {
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { setTotalLineItemQuantity, productsCheckout } = useContext(
    TotalLineItemQuantityContext,
  );
  const actions = {
    action: "addLineItem",
    productId: productId,
  };
  useEffect(() => {
    const hasProductInCart = productsCheckout.includes(productId);
    setIsProductInCart(hasProductInCart);
  }, [productId, productsCheckout]);

  const addProductToCart = async (): Promise<void> => {
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setTotalLineItemQuantity(cart.totalLineItemQuantity);
    setIsProductInCart(true);
  };

  return isProductInCart === false ? (
    <button
      className="button-add-to-cart"
      onClick={(event) => {
        event.stopPropagation();
        void addProductToCart();
      }}
    >
      ADD TO CART
    </button>
  ) : (
    <button
      className="button-remove-from-cart"
      onClick={(event) => {
        event.stopPropagation();
        //void removeProductFromCart();
      }}
    >
      REMOVE FROM CART
    </button>
  );
}
