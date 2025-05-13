import {
  API_HOST,
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../project-config";
import { updateCookies } from "../../shared/ui/update-cookie";
import type { AccessToken, BodyLogin, Error } from "../../shared/api/types";

export async function authenticateCustomer(body: BodyLogin): Promise<string> {
  let errorMessage = "";
  const arrayCookies = document.cookie.split(";");
  let BEARER_TOKEN = "";
  for (const cookie of arrayCookies) {
    if (cookie.split("=")[0] === " access_token") {
      BEARER_TOKEN = cookie.split("=")[1];
    }
  }

  await fetch(`${API_HOST}/${PROJECT_KEY}/me/login`, {
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
          }
        )
          .then((response) => response.json())
          .then((data: AccessToken) => {
            updateCookies(data.access_token, data.refresh_token);
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
  return errorMessage;
}
