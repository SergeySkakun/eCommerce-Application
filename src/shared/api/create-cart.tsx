import type { Cart } from ".";
import { API_HOST, PROJECT_KEY } from "../../project-config";
import { getTokenFromCookie, saveTokenCookie, TOKEN_NAMES } from "../lib";

// Создаёт новую корзину, сохраняет ID корзины и Version в куки

export async function createCart(): Promise<void> {
  const body = {
    currency: "USD",
  };
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  await fetch(`${API_HOST}/${PROJECT_KEY}/me/carts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data: Cart) => {
      saveTokenCookie(data.id, TOKEN_NAMES.cartID);
      saveTokenCookie(data.version.toString(), TOKEN_NAMES.cartVersion);
    });
}
