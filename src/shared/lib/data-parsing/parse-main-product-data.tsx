import type { MasterData } from "../../api";
import type { ProductInfo } from "./types";

export function parseMainProductData(cardInfo: MasterData): ProductInfo {
  const currentProductBasicInfo = cardInfo.masterData.current;
  const currentProductPriceInfo =
    cardInfo.masterData.current.masterVariant.prices[0];

  const productID = cardInfo.id;
  const productImages = currentProductBasicInfo.masterVariant.images;
  const productName = currentProductBasicInfo.name["en-US"];
  const productDescription = currentProductBasicInfo.description["en-US"];

  const currencyCode = currentProductPriceInfo.value.currencyCode;
  const rawPrice = currentProductPriceInfo.value.centAmount;
  const isDiscountedProduct = Boolean(currentProductPriceInfo.discounted);
  const discountedPrice = isDiscountedProduct
    ? currentProductPriceInfo.discounted.value.centAmount
    : 0;

  return {
    productID,
    productName,
    productDescription,
    productImages,
    currencyCode,
    rawPrice,
    discountedPrice,
  };
}
