import { API_HOST, PROJECT_KEY } from "../../../project-config";
import type { DataProduct } from "../../../shared";
import { getTokenFromCookie, TOKEN_NAMES } from "../../../shared";

export async function sendingFilterSortingSearchRequest(
  token: string,
  limit: number,
  offset: number,
): Promise<DataProduct> {
  let products: DataProduct;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  await fetch(
    `${API_HOST}/${PROJECT_KEY}/product-projections/search?${token}&limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  )
    .then((response) => response.json())
    .then((data: DataProduct) => {
      products = data;
    })
    .catch(() => console.log("No connection"));
  return products;
}
