import { API_HOST, PROJECT_KEY } from "../../../project-config";
import type { DataProduct } from "../../../shared";
import { getTokenFromCookie, TOKEN_NAMES } from "../../../shared";

export async function getProduct(productId: string): Promise<DataProduct> {
  let product: DataProduct;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  await fetch(`${API_HOST}/${PROJECT_KEY}/products/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data: DataProduct) => {
      product = data;
    })
    .catch(() => console.log("No connection"));
  return product;
}
