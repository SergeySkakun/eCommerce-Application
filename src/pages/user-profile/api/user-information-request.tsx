import { API_HOST, PROJECT_KEY } from "../../../project-config";
import {
  getTokenFromCookie,
  saveTokenCookie,
  TOKEN_NAMES,
} from "../../../shared";
import type { Customer } from "../../../shared";

export async function getUserInfoRequest(): Promise<Customer> {
  let userInfo: Customer;
  const USER_ID = getTokenFromCookie(TOKEN_NAMES.activeUserID);
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  await fetch(`${API_HOST}/${PROJECT_KEY}/customers/${USER_ID}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data: Customer) => {
      userInfo = data;
      saveTokenCookie(data.version.toString(), TOKEN_NAMES.userVersion);
    })
    .catch(() => console.log("No connection"));
  return userInfo;
}
