import { useEffect, useState, type ReactElement } from "react";
import { AddingDeletingModifyingItemsInCart } from "../../../pages/basket";
import "./styles.css";
import { getCart } from "../../api";

export function ButtonAddToCart({
  productId,
}: {
  productId: string;
}): ReactElement {
  const [isProductInCart, setIsProductInCart] = useState(false);
  const actions = {
    action: "addLineItem",
    productId: productId,
  };

  useEffect(() => {
    const productInCartId = [];
    const productCheckout = async (): Promise<void> => {
      const cart = await getCart();
      const productInCart = cart.lineItems;
      if (productInCart.length > 0) {
        productInCart.map((item) => {
          productInCartId.push(item.productId);
        });
      }
      productInCartId.map((item) => {
        if (item === productId) {
          setIsProductInCart(true);
        }
      });
    };
    void productCheckout();
  }, []);

  const addProductToCart = async (): Promise<void> => {
    await AddingDeletingModifyingItemsInCart(actions);
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
        //void rmeoveProductFromCart();
      }}
    >
      REMOVE FROM CART
    </button>
  );
}
