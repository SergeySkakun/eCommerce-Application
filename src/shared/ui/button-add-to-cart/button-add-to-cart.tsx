import { useContext, useEffect, useState, type ReactElement } from "react";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [lineItemId, setLineItemId] = useState<string>();
  const { setTotalLineItemQuantity, productsCheckout, setProductsCheckout } =
    useContext(TotalLineItemQuantityContext);

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
    setIsLoading(true);
    const actions = {
      action: "addLineItem",
      productId: productId,
    };
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setProductsCheckout(cart.lineItems);
    setTotalLineItemQuantity(cart.totalLineItemQuantity);
    const productInCart = cart.lineItems.find(
      (lineItem) => lineItem.productId === productId,
    );
    if (productInCart) {
      setLineItemId(productInCart.id);
    }
    setIsProductInCart(true);
    setIsLoading(false);
  };

  const removeProductFromCart = async (): Promise<void> => {
    setIsLoading(true);
    const actions = {
      action: "removeLineItem",
      lineItemId: lineItemId,
    };
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setProductsCheckout(cart.lineItems);
    setTotalLineItemQuantity(cart.totalLineItemQuantity);
    setIsProductInCart(false);
    setIsLoading(false);
  };

  return isProductInCart === false ? (
    <button
      className="button-add-to-cart"
      onClick={(event) => {
        event.stopPropagation();
        void addProductToCart();
      }}
    >
      {isLoading ? <CircularProgress size={35} color="info" /> : "ADD TO CART"}
    </button>
  ) : (
    <button
      className="button-remove-from-cart"
      onClick={(event) => {
        event.stopPropagation();
        void removeProductFromCart();
      }}
    >
      {isLoading ? (
        <CircularProgress size={35} color="error" />
      ) : (
        "REMOVE FROM CART"
      )}
    </button>
  );
}
