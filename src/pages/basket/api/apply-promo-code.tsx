import { API_HOST, PROJECT_KEY } from "../../../project-config";
import {
  type Cart,
  getTokenFromCookie,
  saveTokenCookie,
  TOKEN_NAMES,
} from "../../../shared";
import type { Actions } from "./types";

// Передаём в функцию:
//              добавить промокод:
//                          const actions: {
//                                  action : "addDiscountCode",
//                                  code : {строка, промокод который ввёл пользователь}
//                          }
//              удалить промокод:
//                          const actions = {
//                                    action : "removeDiscountCode",
//                                    discountCode : {
//                                              typeId : "discount-code",
//                                              id : "f5e85e1f-f16b-43dd-b481-ae8486203abc"
//                                    }
//                          }
// возвращает польностью всю корзину. (промокод FaR7), надо будет сделать валидацию на промокод,
// что б с сервера не возвращать ошибку, наверно будет проще, а может и нет :), тогда скажи, переделаю

export async function ApplyPromoCode(actions: Actions): Promise<Cart> {
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
