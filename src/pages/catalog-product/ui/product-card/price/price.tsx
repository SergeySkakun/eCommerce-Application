import type { ReactElement } from "react";
import "./style.css";

const FRACTION_DIGITS = 100;

export type PriceInfo = {
  currencyCode: string;
  rawPrice: number;
  discountedPrice: number;
};

function DiscountedPrice({ currency, price }): ReactElement {
  const discountedPriceString = String(Math.trunc(price / FRACTION_DIGITS));
  return (
    <p className="price__amount_with-discount">
      {currency}
      {discountedPriceString}
    </p>
  );
}

export function Price({ priceInfo }: { priceInfo: PriceInfo }): ReactElement {
  const { currencyCode, rawPrice, discountedPrice } = priceInfo;
  let currencySymbol: string;
  switch (currencyCode) {
    case "USD": {
      currencySymbol = "$";
      break;
    }
    case "EUR": {
      currencySymbol = "€";
      break;
    }
    default: {
      console.error(`Sorry, we are out of ${currencyCode}.`);
    }
  }

  const priceString = String(rawPrice / FRACTION_DIGITS);

  return (
    <div className="price">
      {discountedPrice ? (
        <DiscountedPrice currency={currencySymbol} price={discountedPrice} />
      ) : null}
      <p
        className={
          discountedPrice ? "price__amount_without-discount" : "price__amount"
        }
      >
        {currencySymbol}
        {priceString}
      </p>
    </div>
  );
}
