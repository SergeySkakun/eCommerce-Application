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
  const [lineItemId, setLineItemId] = useState<string>();
  const { setTotalLineItemQuantity, productsCheckout } = useContext(
    TotalLineItemQuantityContext,
  );

  useEffect(() => {
    if (productsCheckout) {
      const productInCart = productsCheckout.find(
        (lineItem) => lineItem.productId === productId,
      );
      if (productInCart) {
        setIsProductInCart(true);
        setLineItemId(productInCart.id);
      }
    }
  }, [productId, productsCheckout]);

  const addProductToCart = async (): Promise<void> => {
    const actions = {
      action: "addLineItem",
      productId: productId,
    };
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setTotalLineItemQuantity(cart.totalLineItemQuantity);
    setIsProductInCart(true);
    const productInCart = cart.lineItems.find(
      (lineItem) => lineItem.productId === productId,
    );
    if (productInCart) {
      setLineItemId(productInCart.id);
    }
  };

  const removeProductFromCart = async (): Promise<void> => {
    const actions = {
      action: "removeLineItem",
      lineItemId: lineItemId,
    };
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setTotalLineItemQuantity(cart.totalLineItemQuantity);
    setIsProductInCart(false);
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
        void removeProductFromCart();
      }}
    >
      REMOVE FROM CART
    </button>
  );
}
