import { API_HOST, PROJECT_KEY } from "../../../project-config";
import {
  getTokenFromCookie,
  TOKEN_NAMES,
  type DataProduct,
} from "../../../shared";

export async function getProductsBigPrice(): Promise<DataProduct> {
  let products: DataProduct;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  setTimeout(() => {}, 2000);
  await fetch(
    `${API_HOST}/${PROJECT_KEY}/product-projections/search?filter=variants.price.centAmount:range(5000000 to 10000000)`,
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
