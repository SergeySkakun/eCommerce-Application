import type { ReactElement } from "react";
import { useEffect } from "react";
import {
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../project-config";
import { createCart, saveTokenCookie, TOKEN_NAMES } from "../";
import type { AccessToken } from ".";

export function ObtainAnonymousAccessToken(): ReactElement {
  useEffect(function GetToken(): void {
    fetch(
      `${AUTH_HOST}/oauth/${PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
      },
    )
      .then((response) => response.json())
      .then(async (data: AccessToken) => {
        saveTokenCookie(data.access_token, TOKEN_NAMES.guestAccess);
        saveTokenCookie(data.refresh_token, TOKEN_NAMES.guestRefresh);
        await createCart();
      })
      .catch(() => console.error("No connection"));
  }, []);
  return <></>;
}
