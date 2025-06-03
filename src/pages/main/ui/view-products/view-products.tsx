import { useEffect, useState, type ReactElement } from "react";
import { getProductsBigPrice } from "../../api";
import {
  type DataProduct,
  type MasterData,
  type Product,
  createProductCard,
} from "../../../../shared";
import { Grid } from "@mui/material";

export function ViewProducts(): ReactElement {
  const [products, setProducts] = useState<MasterData[] | Product[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async (): Promise<void> => {
      const data: DataProduct = await getProductsBigPrice();
      const productList = data.results;

      if (isMounted) {
        setProducts(productList);
      }
    };

    const handler = setTimeout(() => {
      void loadData();
    }, 1500);

    return (): void => {
      clearTimeout(handler);
      isMounted = false;
    };
  }, []);

  const cards: ReactElement[] = [];
  for (const product of products) {
    cards.push(createProductCard(product));
  }

  return (
    <Grid container spacing={3} justifyContent={"center"} paddingTop={2}>
      {cards}
    </Grid>
  );
}
