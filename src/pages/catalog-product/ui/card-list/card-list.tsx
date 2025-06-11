import type { ReactNode, ReactElement } from "react";
import Grid from "@mui/material/Grid";
import {
  type MasterData,
  type Product,
  CreateProductCard,
} from "../../../../shared";

export function CardList({
  products,
}: {
  products: MasterData[] | Product[];
}): ReactNode {
  const cards: ReactElement[] = [];
  for (const product of products) {
    cards.push(CreateProductCard(product));
  }

  return (
    <Grid container spacing={3} justifyContent={"center"} paddingTop={2}>
      {cards}
    </Grid>
  );
}
