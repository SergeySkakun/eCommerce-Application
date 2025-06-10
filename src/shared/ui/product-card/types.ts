import type { PriceInfo } from "../price";

export interface CardInfo {
  productId: string;
  key: string;
  name: string;
  description: string;
  imgUrl: string;
  imgLabel: string;
  priceInfo: PriceInfo;
}

export interface Properties {
  cardInfo: CardInfo;
  isProductInCart: boolean;
}
