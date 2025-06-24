import type { Cart } from "../..";
import type { CartInfo } from "./types";

export function parseCartData(cart: Cart): CartInfo {
  const allProductInCart = cart.lineItems.length > 0 ? cart.lineItems : null;
  const totalPrice = cart.totalPrice.centAmount;
  let discountOnTotalPrice = 0;
  if (cart.discountOnTotalPrice)
    discountOnTotalPrice =
      cart.discountOnTotalPrice.discountedAmount.centAmount;
  const totalLineItemQuantity = cart.totalLineItemQuantity;

  return {
    allProductInCart,
    totalPrice,
    discountOnTotalPrice,
    totalLineItemQuantity,
  };
}
