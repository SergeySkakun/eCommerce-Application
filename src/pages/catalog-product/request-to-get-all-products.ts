import { API_HOST, PROJECT_KEY } from "../../project-config";
import type { DataProduct } from "./types";

export async function getAllProducts(): Promise<DataProduct> {
  let allProducts: DataProduct;
  let BEARER_TOKEN = "";
  const arrayCookies = document.cookie.split("; ");
  for (const cookie of arrayCookies) {
    const [name, value] = cookie.split("=");
    if (name === "user_access_token") {
      BEARER_TOKEN = value;
      break;
    } else if (name === "anonymous_access_token") {
      BEARER_TOKEN = value;
      break;
    }
  }
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
