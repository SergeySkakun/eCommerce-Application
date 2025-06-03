import type { ReactElement } from "react";
import {
  parseMainProductData,
  Price,
  type MasterData,
  type PriceInfo,
} from "../../../../shared";
import { Button, CardActions } from "@mui/material";
import { FullScreenImage } from ".";
import { useNavigate } from "react-router-dom";

export function ProductContent({
  product,
}: {
  product: MasterData;
}): ReactElement {
  const navigate = useNavigate();
  const {
    productName,
    productDescription,
    productImages,
    productAttributes,
    currencyCode,
    rawPrice,
    discountedPrice,
  } = parseMainProductData(product);
  const priceInfo: PriceInfo = {
    currencyCode: currencyCode,
    rawPrice: rawPrice,
    discountedPrice: discountedPrice,
  };
  return (
    <main className="main">
      <div className="dialog-container">
        <button
          className="button-back"
          onClick={() => void navigate(-1)}
        ></button>
        <span className="dialog-name">{productName}</span>
        <div className="dialog-content">
          <FullScreenImage productImages={productImages} />
          <span className="dialog-title">Description</span>
          <p className="dialog-description">{productDescription}</p>
          <span className="dialog-title">Attributes</span>
          <ul className="dialog-attributes">
            {productAttributes.map((item): React.ReactNode => {
              return (
                <li key={item.name} className="attribute">
                  <p className="name-attribute">{item.name}</p>:
                  <p className="value-attribute">{item.value}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="dialog-footer">
          <CardActions>
            <Button size="small" sx={{ fontSize: "14px" }}>
              ADD TO CART
            </Button>
          </CardActions>
          <Price priceInfo={priceInfo} />
        </div>
      </div>
    </main>
  );
}
