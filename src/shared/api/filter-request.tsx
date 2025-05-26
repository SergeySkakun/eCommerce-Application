import { API_HOST, PROJECT_KEY } from "../../project-config";
import { getTokenFromCookie } from "../lib/token";
import type { DataProduct } from "./types";

// для фильтрации по категориям:
//  передать в эту функцию 'filter=categories.id:"${ID}"'
//  где ID это:
//    для allcars - 82917f8e-eea7-4f90-984a-782053d24952
//    для sedan - ddd035f0-06c3-46c5-a8c6-c7e4a3b3c01b
//    для pickup - 9bcef4ea-bc37-4ace-8883-d3f75a921a3f
//    для bus - eee68be3-1300-4ed8-84d8-8c7eba2cecac

// для фильтрации по цене:
//  фильтруется по диапазону
//  передать в эту функцию 'filter=variants.price.centAmount:range(${from} to ${to})'
//  где "from" это меньшее значение, "to" большее

// для фильтрации по аттрибутам:
//  передать в эту функцию 'filter=variants.attributes.{name-attribute}:"value"'
//  где "name-attribute" имя атрибута, "value" значение
//   имя аттрибута         значение
//      Year         (number 2019 and >)
//      Fuel         (diesel or gasoline)
//      Power        (number < 1000)
//      Gearbox      (automatic or manual)
//      Capacity     (number < 1000)
//      Payload      (number < 30)

export async function sendingFilterRequest(
  filter_token: string,
): Promise<DataProduct> {
  let filteredProducts: DataProduct;
  const BEARER_TOKEN = getTokenFromCookie();
  await fetch(
    `${API_HOST}/${PROJECT_KEY}/product-projections/search?${filter_token}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  )
    .then((response) => response.json())
    .then((data: DataProduct) => {
      filteredProducts = data;
    })
    .catch(() => console.log("No connection"));
  return filteredProducts;
}
