import {
  API_HOST,
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../../project-config";
import {
  getTokenFromCookie,
  saveTokenCookie,
  TOKEN_NAMES,
} from "../../../shared";
import type { AccessToken, Customer } from "../../../shared";

// Изменение пароля:
// передаём в функцию, введённый пользователем старый и новый пароль
// возвращает сообщение об успешной смене или ошибку

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<string> {
  let message: string;
  const USER_VERSION = getTokenFromCookie(TOKEN_NAMES.userVersion);
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  const body = {
    version: Number(USER_VERSION),
    currentPassword: currentPassword,
    newPassword: newPassword,
  };
  await fetch(`${API_HOST}/${PROJECT_KEY}/me/password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(async (data: Customer) => {
      if (data.id) {
        message = "Password successfully changed";
        saveTokenCookie(data.version.toString(), TOKEN_NAMES.userVersion);
        await fetch(
          `${AUTH_HOST}/oauth/${PROJECT_KEY}/customers/token?grant_type=password&username=${data.email}&password=${body.newPassword}`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
          },
        )
          .then((response) => response.json())
          .then((data: AccessToken) => {
            saveTokenCookie(data.access_token, TOKEN_NAMES.successUserAccess);
            saveTokenCookie(data.refresh_token, TOKEN_NAMES.successUserRefresh);
          })
          .catch(() => console.error("No connection"));
      } else {
        message = data.message;
      }
    })
    .catch((error: Error) => {
      message = error.message;
      console.log("No connection");
    });
  return message;
}
