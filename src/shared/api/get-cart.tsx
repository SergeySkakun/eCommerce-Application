import { API_HOST, PROJECT_KEY } from "../../project-config";
import {
  type Cart,
  getTokenFromCookie,
  saveTokenCookie,
  TOKEN_NAMES,
} from "..";

export async function getCart(): Promise<Cart> {
  let cart: Cart;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  const cartID = getTokenFromCookie(TOKEN_NAMES.cartID);
  await fetch(`${API_HOST}/${PROJECT_KEY}/me/carts/${cartID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data: Cart) => {
      saveTokenCookie(data.version.toString(), TOKEN_NAMES.cartVersion);
      cart = data;
    });
  return cart;
}
