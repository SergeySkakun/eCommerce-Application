import { API_HOST, PROJECT_KEY } from "../../../project-config";
import { getTokenFromCookie, TOKEN_NAMES } from "../../../shared";
import type { Customer } from "../../../shared";

export async function getUserInfoRequest(): Promise<Customer> {
  let userInfo: Customer;
  let USER_ID = "";
  const arrayCookies = document.cookie.split("; ");
  for (const cookie of arrayCookies) {
    const [name, value] = cookie.split("=");
    if (name === TOKEN_NAMES.activeUserID) {
      USER_ID = value;
      break;
    }
  }
  const BEARER_TOKEN = getTokenFromCookie();
  await fetch(`${API_HOST}/${PROJECT_KEY}/customers/${USER_ID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data: Customer) => {
      userInfo = data;
    })
    .catch(() => console.log("No connection"));
  return userInfo;
}
