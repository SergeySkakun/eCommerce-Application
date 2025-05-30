import type { MasterData } from "../../../../shared/";
import type { ReactElement } from "react";
import { ProductCard } from "./product-card";

export function createProductCard(cardInfo: MasterData): ReactElement {
  const productID = cardInfo.id;
  const productName = cardInfo.masterData.current.name["en-US"];
  const productDescription = cardInfo.masterData.current.description["en-US"];
  const productImg = cardInfo.masterData.current.masterVariant.images[0].url;
  const productImgLabel =
    cardInfo.masterData.current.masterVariant.images[0].label;

  return (
    <ProductCard
      key={productID}
      id={productID}
      name={productName}
      description={productDescription}
      imgUrl={productImg}
      imgLabel={productImgLabel}
    />
  );
}
