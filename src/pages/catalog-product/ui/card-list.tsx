import type { ReactNode, ReactElement } from "react";
import Grid from "@mui/material/Grid";
import type { MasterData } from "../../../shared/";
import { createProductCard } from "./product-card";

export function CardList({ products }: { products: MasterData[] }): ReactNode {
  const cards: ReactElement[] = [];
  for (let index = 0; index < 18; index++) {
    cards.push(createProductCard(products[index]));
  }

  return (
    <Grid container spacing={3} justifyContent={"center"} paddingTop={2}>
      {cards}
    </Grid>
  );
}
