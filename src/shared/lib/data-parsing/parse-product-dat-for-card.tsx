import type { MasterData, Product, Images } from "../../api";
import type { ProductInfo } from "./types";

function isMasterData(data: MasterData | Product): data is MasterData {
  if (Object.hasOwnProperty.call(data, "masterData")) {
    return true;
  }
  return false;
}

export function parseProductDataForCard(
  cardInfo: MasterData | Product
): ProductInfo {
  let productKey: string;
  let productImages: [Images];
  let productName: string;
  let productDescription: string;
  let currencyCode: string;
  let rawPrice: number;
  let discountedPrice: number;

  if (isMasterData(cardInfo)) {
    const currentProductBasicInfo = cardInfo.masterData.current;
    const currentProductPriceInfo =
      cardInfo.masterData.current.masterVariant.prices[0];
    const isDiscountedProduct = Boolean(currentProductPriceInfo.discounted);

    productKey = cardInfo.key;
    productImages = currentProductBasicInfo.masterVariant.images;
    productName = currentProductBasicInfo.name["en-US"];
    productDescription = currentProductBasicInfo.description["en-US"];
    currencyCode = currentProductPriceInfo.value.currencyCode;
    rawPrice = currentProductPriceInfo.value.centAmount;
    discountedPrice = isDiscountedProduct
      ? currentProductPriceInfo.discounted.value.centAmount
      : 0;
  } else {
    const currentProductPriceInfo = cardInfo.masterVariant.prices[0];
    const isDiscountedProduct = Boolean(currentProductPriceInfo.discounted);

    productKey = cardInfo.key;
    productImages = cardInfo.masterVariant.images;
    productName = cardInfo.name["en-US"];
    productDescription = cardInfo.description["en-US"];
    currencyCode = currentProductPriceInfo.value.currencyCode;
    rawPrice = currentProductPriceInfo.value.centAmount;
    discountedPrice = isDiscountedProduct
      ? currentProductPriceInfo.discounted.value.centAmount
      : 0;
  }

  return {
    productKey,
    productName,
    productDescription,
    productImages,
    currencyCode,
    rawPrice,
    discountedPrice,
  };
}
