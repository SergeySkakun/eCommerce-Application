import { API_HOST, PROJECT_KEY } from "../../../project-config";
import { CreateCart, getTokenFromCookie, TOKEN_NAMES } from "../../../shared";

// Удаляет полностью корзину и создаёт новую

export async function DeleteCart(): Promise<void> {
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  const cartID = getTokenFromCookie(TOKEN_NAMES.cartID);
  const cartVersion = getTokenFromCookie(TOKEN_NAMES.cartVersion);
  await fetch(
    `${API_HOST}/${PROJECT_KEY}}/me/carts/${cartID}?version=${cartVersion}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  )
    .then((response) => response.json())
    .then(async () => {
      await CreateCart();
    });
}
