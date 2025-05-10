import type { ReactElement } from "react";
import { useEffect } from "react";

export function ObtainAccessToken(): ReactElement {
  useEffect(function GetToken(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch(
      `https://auth.europe-west1.gcp.commercetools.com/oauth/token?grant_type=client_credentials`,
      {
        method: "POST",
        headers: {
          Authorization: `bOCn8rlP3Le2mOGQVzEbfRI5:KLEtJb1-N2eBkgjV_9EX0Hbyf74IoeVQ`,
        },
      }
    )
      .then((response) => console.log(response))
      .then((data) => {
        console.log(data);
      });
  }, []);
  return <main className="main"></main>;
}
