import type { ReactElement } from "react";
import "./style.css";

const FRACTION_DIGITS = 100;

export type PriceInfo = {
  currencyCode: string;
  rawPrice: number;
  discountedPrice?: number;
};

function DiscountedPrice({ currency, price }): ReactElement {
  const discountedPriceString = String(price / FRACTION_DIGITS);
  return (
    <p className="price__amount_discounted">
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
      <p className="price__amount">
        {currencySymbol}
        {priceString}
      </p>
      {discountedPrice ? (
        <DiscountedPrice currency={currencySymbol} price={discountedPrice} />
      ) : null}
    </div>
  );
}
