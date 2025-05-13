import { API_HOST, PROJECT_KEY } from "../../project-config";
import type { BodyLogin, Error } from "../../types";

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
    .then((data: Error) => {
      if (data.statusCode) {
        errorMessage = data.message;
      }
    })
    .catch((error) => console.log(error));
  return errorMessage;
}
