import type { ReactNode, ReactElement } from "react";
import Grid from "@mui/material/Grid";
import type { MasterData, Product } from "../../../../shared";
import { createProductCard } from "./product-card";

export function CardList({
  products,
}: {
  products: MasterData[] | Product[];
}): ReactNode {
  const cards: ReactElement[] = [];
  for (const product of products) {
    cards.push(createProductCard(product));
  }

  return (
    <Grid
      container
      spacing={3}
      justifyContent={"center"}
      sx={{ paddingTop: "50px" }}
    >
      {cards}
    </Grid>
  );
}
