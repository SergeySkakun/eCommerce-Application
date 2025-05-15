import type { ReactElement } from "react";
import { useEffect } from "react";
import {
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../project-config";
import { saveTokenCookie } from "../ui/index";
import type { AccessToken } from "../types";

export function ObtainAccessToken(): ReactElement {
  const ACCESS_TOKEN = "access_token";
  const REFRESH_TOKEN = "refresh_token";
  useEffect(function GetToken(): void {
    fetch(
      `${AUTH_HOST}/oauth/${PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data: AccessToken) => {
        saveTokenCookie(data.access_token, ACCESS_TOKEN);
        saveTokenCookie(data.refresh_token, REFRESH_TOKEN);
      })
      .catch(() => console.error("No connection"));
  }, []);
  return <></>;
}
