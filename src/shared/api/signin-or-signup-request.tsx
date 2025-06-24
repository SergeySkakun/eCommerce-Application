import {
  API_HOST,
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../project-config";
import { getTokenFromCookie, TOKEN_NAMES, saveTokenCookie } from "../";
import type {
  AccessToken,
  BodyLogin,
  BodySignUp,
  CustomerAllInfo,
} from "./index";

function goAnimationAlert(): void {
  const alert = document.querySelector(".alert");
  alert.classList.add("go-animation-alert");
}

function removeAnimationAlert(): void {
  const alert = document.querySelector(".alert");
  alert.classList.remove("go-animation-alert");
}

export async function sendingSignInOrSignUpRequest(
  body: BodySignUp | BodyLogin,
  typeRequest: string,
): Promise<string> {
  let errorMessage = "";
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.guestAccess);
  await fetch(`${API_HOST}/${PROJECT_KEY}/me/${typeRequest}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(async (data: CustomerAllInfo) => {
      if (data.statusCode) {
        errorMessage = data.message;
      } else {
        saveTokenCookie(data.customer.id, TOKEN_NAMES.activeUserID);
        saveTokenCookie(
          data.customer.version.toString(),
          TOKEN_NAMES.userVersion,
        );
        saveTokenCookie(data.cart.id, TOKEN_NAMES.cartID);
        saveTokenCookie(data.cart.version.toString(), TOKEN_NAMES.cartVersion);
        if (typeRequest === "signup") {
          goAnimationAlert();
          setTimeout(() => {
            removeAnimationAlert();
          }, 2500);
        }
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
            saveTokenCookie(data.access_token, TOKEN_NAMES.successUserAccess);
            saveTokenCookie(data.refresh_token, TOKEN_NAMES.successUserRefresh);
          })
          .catch(() => (errorMessage = "No connection"));
      }
    })
    .catch(() => (errorMessage = "No connection"));
  return errorMessage;
}
