import { API_HOST, PROJECT_KEY } from "../../../project-config";
import {
  getTokenFromCookie,
  saveTokenCookie,
  TOKEN_NAMES,
} from "../../../shared";
import type { Customer } from "../../../shared";

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
    .then((data: Customer) => {
      if (data.id) {
        message = "Password successfully changed";
        saveTokenCookie(data.version.toString(), TOKEN_NAMES.userVersion);
      } else {
        console.error(data.message);
      }
    })
    .catch(() => console.log("No connection"));
  return message;
}
