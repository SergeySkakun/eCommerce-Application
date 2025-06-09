import { useContext, useEffect, useState, type ReactElement } from "react";
import { AddingDeletingModifyingItemsInCart } from "../../../pages/basket";
import "./styles.css";
import { getCart } from "../../api";
import { TotalLineItemQuantityContext } from "../..";

export function ButtonAddToCart({
  productId,
}: {
  productId: string;
}): ReactElement {
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [lineItemId, setLineItemId] = useState<string>();

  const { setTotalLineItemQuantity } = useContext(TotalLineItemQuantityContext);
  useEffect(() => {
    const productCheckout = async (): Promise<void> => {
      const cart = await getCart();
      const productInCart = cart.lineItems;
      if (productInCart.length > 0) {
        productInCart.map((lineitem) => {
          if (lineitem.productId === productId) {
            setIsProductInCart(true);
            setLineItemId(lineitem.id);
          }
        });
      }
    };
    void productCheckout();
  }, []);

  const addProductToCart = async (): Promise<void> => {
    const actions = {
      action: "addLineItem",
      productId: productId,
    };
    const cart = await AddingDeletingModifyingItemsInCart(actions);
    setTotalLineItemQuantity(cart.totalLineItemQuantity);
    setIsProductInCart(true);
    const lastItem = cart.lineItems.slice(-1);
    setLineItemId(lastItem[0].id);
  };

  const removeProductFromCart = async (): Promise<void> => {
    const actions = {
      action: "removeLineItem",
      lineItemId: lineItemId,
    };
    const cart = await AddingDeletingModifyingItemsInCart(actions);
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
