import { API_HOST, PROJECT_KEY } from "../../../project-config";
import type { DataProduct } from "../../../shared";
import { getTokenFromCookie, TOKEN_NAMES } from "../../../shared";

// для ФИЛЬТРАЦИИ
//  по категориям:
//      передать в эту функцию 'filter=categories.id:"ID"'
//      где ID это:
//          для allcars - 82917f8e-eea7-4f90-984a-782053d24952
//          для sedan - ddd035f0-06c3-46c5-a8c6-c7e4a3b3c01b
//          для pickup - 9bcef4ea-bc37-4ace-8883-d3f75a921a3f
//          для bus - eee68be3-1300-4ed8-84d8-8c7eba2cecac

//  по цене:
//    фильтруется по диапазону
//        передать в эту функцию 'filter=variants.price.centAmount:range(${from} to ${to})'
//        где "from" это меньшее значение, "to" большее

//  по аттрибутам:
//      передать в эту функцию 'filter=variants.attributes.{name-attribute}:"value"'
//      где "name-attribute" имя атрибута, "value" значение
//      имя аттрибута         значение
//          Year         (number 2019 and >)
//          Fuel         (diesel or gasoline)
//          Power        (number < 1000)
//          Gearbox      (automatic or manual)
//          Capacity     (number < 1000)
//          Payload      (number < 30)

// для СОРТИРОВКИ
//  передать в эту функцию 'sort={token}'
//      где token это:
//          по алфавиту:
//              "name.en-US asc" - по алфавиту
//              "name.en-US desc" - наоборот
//          по цене:
//              "price desc" - от большего к меньшему
//              "price asc" - от меньшего к большему
//          по мощности:
//              "variants.attributes.Power desc" - от большего к меньшему
//              "variants.attributes.Power asc" - от меньшего к большему

// для ПОИСКА
//  передать в эту функцию 'fuzzy=true&text.en-US=*text*'
//      где text это строка которую ввёл пользователь

export async function sendingFilterSortingSearchRequest(
  token: string,
): Promise<DataProduct> {
  let products: DataProduct;
  const BEARER_TOKEN = getTokenFromCookie(TOKEN_NAMES.successUserAccess);
  await fetch(
    `${API_HOST}/${PROJECT_KEY}/product-projections/search?${token}`,
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
