import { API_HOST, PROJECT_KEY } from "../../../project-config";
import type { Customer } from "../../../shared";
import {
  getTokenFromCookie,
  saveTokenCookie,
  TOKEN_NAMES,
} from "../../../shared";
import type { Action } from "./types";

export async function addChangeDeleteUserData(
  action: Action,
): Promise<Customer | string> {
  let userInfo: Customer;
  let errorInfo: string;
  const USER_ID = getTokenFromCookie(TOKEN_NAMES.activeUserID);
  const USER_VERSION = getTokenFromCookie(TOKEN_NAMES.userVersion);
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  const body = {
    version: Number(USER_VERSION),
    actions: [action],
  };
  await fetch(`${API_HOST}/${PROJECT_KEY}/customers/${USER_ID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data: Customer) => {
      if (data.id) {
        userInfo = data;
        saveTokenCookie(data.version.toString(), TOKEN_NAMES.userVersion);
      } else {
        errorInfo = data.message;
        console.error(data.message);
      }
    })
    .catch(() => console.log("No connection"));
  return userInfo ?? errorInfo;
}
