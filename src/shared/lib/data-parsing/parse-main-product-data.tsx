import type { MasterData } from "../../api";
import type { ProductInfo } from "./types";

export function parseMainProductData(cardInfo: MasterData): ProductInfo {
  const currentProductBasicInfo = cardInfo.masterData.current;
  const currentProductPriceInfo =
    cardInfo.masterData.current.masterVariant.prices[0];
  const productId = cardInfo.id;
  const productKey = cardInfo.key;
  const productImages = currentProductBasicInfo.masterVariant.images;
  const productName = currentProductBasicInfo.name["en-US"];
  const productDescription = currentProductBasicInfo.description["en-US"];
  const productAttributes = currentProductBasicInfo.masterVariant.attributes;

  const currencyCode = currentProductPriceInfo.value.currencyCode;
  const rawPrice = currentProductPriceInfo.value.centAmount;
  const isDiscountedProduct = Boolean(currentProductPriceInfo.discounted);
  const discountedPrice = isDiscountedProduct
    ? currentProductPriceInfo.discounted.value.centAmount
    : 0;

  return {
    productId,
    productKey,
    productName,
    productDescription,
    productImages,
    productAttributes,
    currencyCode,
    rawPrice,
    discountedPrice,
  };
}
