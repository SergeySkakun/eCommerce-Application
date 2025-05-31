import type { ReactElement } from "react";
import type { MasterData } from "../../../../shared/";
import type { PriceInfo } from "./price";
import { ProductCard } from "./product-card";

export function createProductCard(cardInfo: MasterData): ReactElement {
  const currentProductBasicInfo = cardInfo.masterData.current;
  const currentProductImgInfo =
    cardInfo.masterData.current.masterVariant.images[0];
  const currentProductPriceInfo =
    cardInfo.masterData.current.masterVariant.prices[0];

  const productID = cardInfo.id;
  const productName = currentProductBasicInfo.name["en-US"];
  const productDescription = currentProductBasicInfo.description["en-US"];
  const productImg = currentProductImgInfo.url;
  const productImgLabel = currentProductImgInfo.label;

  const currencyCode = currentProductPriceInfo.value.currencyCode;
  const rawPrice = currentProductPriceInfo.value.centAmount;
  const isDiscountedProduct = Boolean(currentProductPriceInfo.discounted);
  const discountedPrice = isDiscountedProduct
    ? currentProductPriceInfo.discounted.value.centAmount
    : 0;

  const priceInfo: PriceInfo = {
    currencyCode: currencyCode,
    rawPrice: rawPrice,
    discountedPrice: discountedPrice,
  };

  return (
    <ProductCard
      key={productID}
      id={productID}
      name={productName}
      description={productDescription}
      imgUrl={productImg}
      imgLabel={productImgLabel}
      priceInfo={priceInfo}
    />
  );
}
