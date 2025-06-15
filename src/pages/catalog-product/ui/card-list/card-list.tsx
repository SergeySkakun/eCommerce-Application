import type { ReactNode, RefObject } from "react";
import { forwardRef } from "react";
import Grid from "@mui/material/Grid";
import {
  type MasterData,
  type Product,
  createProductCard,
} from "../../../../shared";

interface CardListProperties {
  products: MasterData[] | Product[];
}

export const CardList = forwardRef<HTMLDivElement, CardListProperties>(
  (
    { products }: CardListProperties,
    // eslint-disable-next-line unicorn/prevent-abbreviations
    ref: RefObject<HTMLDivElement>,
  ): ReactNode => {
    const cards = products.map((product: MasterData | Product) => {
      return createProductCard(product);
    });

    const lastProductCard = cards.pop();
    const newLastProductCardWithReference = (
      <div ref={ref} key={lastProductCard.key}>
        {lastProductCard}
      </div>
    );
    cards.push(newLastProductCardWithReference);

    return (
      <Grid container spacing={3} justifyContent={"center"} paddingTop={2}>
        {cards}
      </Grid>
    );
  },
);
