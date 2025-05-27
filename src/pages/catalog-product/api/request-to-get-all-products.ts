import { API_HOST, PROJECT_KEY } from "../../../project-config";
import { getTokenFromCookie } from "../../../shared";
import type { DataProduct } from "./types";

export async function getAllProducts(): Promise<DataProduct> {
  let allProducts: DataProduct;
  const BEARER_TOKEN = getTokenFromCookie();
  await fetch(`${API_HOST}/${PROJECT_KEY}/products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data: DataProduct) => {
      allProducts = data;
    })
    .catch(() => console.log("No connection"));
  return allProducts;
}
