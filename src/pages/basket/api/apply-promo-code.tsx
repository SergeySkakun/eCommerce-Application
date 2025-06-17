import { API_HOST, PROJECT_KEY } from "../../../project-config";
import {
  getTokenFromCookie,
  saveTokenCookie,
  TOKEN_NAMES,
  type Cart,
  type Actions,
} from "../../../shared";

export async function applyPromoCode(actions: Actions): Promise<Cart> {
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
