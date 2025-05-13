import type { ReactElement } from "react";
import { useEffect } from "react";
import {
  AUTH_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
} from "../../project-config";
import { updateCookies } from "../ui/update-cookie";
import type { AccessToken } from "./types";

export function ObtainAccessToken(): ReactElement {
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
        updateCookies(data.access_token, data.refresh_token);
      })
      .catch((error) => console.log(error));
  }, []);
  return <></>;
}
