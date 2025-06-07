import type { ReactElement } from "react";
import { ProductCard } from "./product-card";
import type { MasterData, Product } from "../../api";
import { parseProductDataForCard } from "../../lib";
import type { PriceInfo } from "../price";

const FIRST_PRODUCT_IMAGE_NUMBER = 0;

export function createProductCard(
  cardInfo: MasterData | Product,
): ReactElement {
  const {
    productId,
    productKey: key,
    productName: name,
    productDescription: description,
    productImages,
    currencyCode,
    rawPrice,
    discountedPrice,
  } = parseProductDataForCard(cardInfo);

  const { url: productImg, label: productImgLabel } =
    productImages[FIRST_PRODUCT_IMAGE_NUMBER];

  const priceInfo: PriceInfo = {
    currencyCode: currencyCode,
    rawPrice: rawPrice,
    discountedPrice: discountedPrice,
  };

  const CardInfo = {
    productId,
    key,
    name,
    description,
    imgUrl: productImg,
    imgLabel: productImgLabel,
    priceInfo: priceInfo,
  };
  return <ProductCard key={key} cardInfo={CardInfo} />;
}
