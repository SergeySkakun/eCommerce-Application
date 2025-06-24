import { API_HOST, PROJECT_KEY } from "../../../project-config";
import {
  type Cart,
  createCart,
  getTokenFromCookie,
  TOKEN_NAMES,
} from "../../../shared";

export async function deleteCart(): Promise<Cart> {
  let cart: Cart;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  const cartID = getTokenFromCookie(TOKEN_NAMES.cartID);
  const cartVersion = getTokenFromCookie(TOKEN_NAMES.cartVersion);
  await fetch(
    `${API_HOST}/${PROJECT_KEY}/me/carts/${cartID}?version=${cartVersion}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  )
    .then((response) => response.json())
    .then(async () => {
      cart = await createCart();
    });
  return cart;
}
