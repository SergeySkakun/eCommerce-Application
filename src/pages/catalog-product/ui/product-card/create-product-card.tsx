import type { ReactElement } from "react";
import type { MasterData } from "../../../../shared/";
import { parseMainProductData } from "../../../../shared/";
import type { PriceInfo } from "../../../../shared/ui/price";
import { ProductCard } from "./product-card";

const FIRST_PRODUCT_IMAGE_NUMBER = 0;

export function createProductCard(cardInfo: MasterData): ReactElement {
  const {
    productKey: key,
    productName: name,
    productDescription: description,
    productImages,
    currencyCode,
    rawPrice,
    discountedPrice,
  } = parseMainProductData(cardInfo);

  const { url: productImg, label: productImgLabel } =
    productImages[FIRST_PRODUCT_IMAGE_NUMBER];

  const priceInfo: PriceInfo = {
    currencyCode: currencyCode,
    rawPrice: rawPrice,
    discountedPrice: discountedPrice,
  };

  const CardInfo = {
    key,
    name,
    description,
    imgUrl: productImg,
    imgLabel: productImgLabel,
    priceInfo: priceInfo,
  };

  return <ProductCard key={key} cardInfo={CardInfo} />;
}
