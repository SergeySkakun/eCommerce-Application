import { API_HOST, PROJECT_KEY } from "../../../project-config";
import { getTokenFromCookie, saveTokenCookie, TOKEN_NAMES } from "../..";
import type { Actions } from "./types";
import type { Cart } from "..";

// Принимает обьект actions:
//        для добавления товара в корзину:
//                    actions: {
//                          action : "addLineItem",
//                          productId : "{{product-id}}"
//                    }
//        для удаления товара из корзины:
//                                  полностью, не зависимо от их количества в корзине:
//                                                   const actions = {
//                                                              action : "removeLineItem",
//                                                              lineItemId : "{{lineItemId}}"
//                                                        }
//                                  по одному:
//                                                   const actions = {
//                                                              action : "removeLineItem",
//                                                              lineItemId : "{{lineItemId}}"
//                                                              quantity : 1
//                                                        }
// Возвращает полностью корзину
// lineItemId это id продукта из корзины, а не самого продукта, они разные

export async function addingDeletingModifyingItemsInCart(
  actions: Actions,
): Promise<Cart> {
  let cart: Cart;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  const cartID = getTokenFromCookie(TOKEN_NAMES.cartID);
  const cartVersion = getTokenFromCookie(TOKEN_NAMES.cartVersion);
  const body = {
    version: Number(cartVersion),
    actions: [actions],
  };
  await fetch(`${API_HOST}/${PROJECT_KEY}/me/carts/${cartID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data: Cart) => {
      saveTokenCookie(data.version.toString(), TOKEN_NAMES.cartVersion);
      cart = data;
    });
  return cart;
}
