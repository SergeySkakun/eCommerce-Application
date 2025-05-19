import {
  API_HOST,
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../project-config";
import { saveTokenCookie } from "../ui/index";
import type { AccessToken, BodyLogin, BodySignUp, Error } from "./index";

export async function sendingSignInOrSignUpRequest(
  body: BodySignUp | BodyLogin,
  typeRequest: string,
): Promise<string> {
  let errorMessage = "";
  let BEARER_TOKEN = "";
  const ACCESS_TOKEN = "user_access_token";
  const REFRESH_TOKEN = "user_refresh_token";
  const arrayCookies = document.cookie.split("; ");
  for (const cookie of arrayCookies) {
    const [name, value] = cookie.split("=");
    if (name === "anonymous_access_token") {
      BEARER_TOKEN = value;
      break;
    }
  }
  await fetch(`${API_HOST}/${PROJECT_KEY}/me/${typeRequest}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(async (data: Error) => {
      if (data.statusCode) {
        errorMessage = data.message;
      } else {
        await fetch(
          `${AUTH_HOST}/oauth/${PROJECT_KEY}/customers/token?grant_type=password&username=${body.email}&password=${body.password}`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
          },
        )
          .then((response) => response.json())
          .then((data: AccessToken) => {
            saveTokenCookie(data.access_token, ACCESS_TOKEN);
            saveTokenCookie(data.refresh_token, REFRESH_TOKEN);
          })
          .catch(() => (errorMessage = "No connection"));
      }
    })
    .catch(() => (errorMessage = "No connection"));
  return errorMessage;
}
