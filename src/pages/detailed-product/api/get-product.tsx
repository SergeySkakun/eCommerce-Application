import { API_HOST, PROJECT_KEY } from "../../../project-config";
import type { MasterData } from "../../../shared";
import { getTokenFromCookie, TOKEN_NAMES } from "../../../shared";

export async function getProduct(productKey: string): Promise<MasterData> {
  let product: MasterData;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  await fetch(`${API_HOST}/${PROJECT_KEY}/products/key=${productKey}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data: MasterData) => {
      product = data;
    })
    .catch(() => console.log("No connection"));
  return product;
}
