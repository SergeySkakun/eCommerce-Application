import { API_HOST, PROJECT_KEY } from "../../../project-config";
import type { DataProduct } from "../../../shared";
import { getTokenFromCookie, TOKEN_NAMES } from "../../../shared";

export async function getAllProducts(
  limit: number,
  offset: number,
): Promise<DataProduct> {
  let allProducts: DataProduct;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  await fetch(
    `${API_HOST}/${PROJECT_KEY}/products/?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  )
    .then((response) => response.json())
    .then((data: DataProduct) => {
      allProducts = data;
    })
    .catch(() => console.log("No connection"));
  return allProducts;
}
