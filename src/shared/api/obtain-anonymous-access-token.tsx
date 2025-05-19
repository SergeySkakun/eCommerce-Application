import type { ReactElement } from "react";
import { useEffect } from "react";
import {
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../project-config";
import { saveTokenCookie } from "../ui/index";
import type { AccessToken } from "./index";

export function ObtainAnonymousAccessToken(): ReactElement {
  const ANONYMOUS_ACCESS_TOKEN = "anonymous_access_token";
  const ANONYMOUS_REFRESH_TOKEN = "anonymous_refresh_token";
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
      .then((data: AccessToken) => {
        saveTokenCookie(data.access_token, ANONYMOUS_ACCESS_TOKEN);
        saveTokenCookie(data.refresh_token, ANONYMOUS_REFRESH_TOKEN);
      })
      .catch(() => console.error("No connection"));
  }, []);
  return <></>;
}
