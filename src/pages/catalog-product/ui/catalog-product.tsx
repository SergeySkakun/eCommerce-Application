import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";
import type { DataProduct, MasterData } from "../../../shared";
import { CardList } from "./card-list";
import { LoadingPlaceholder } from "../../../shared";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function CatalogProduct(): ReactNode {
  const [products, setProducts] = useState<MasterData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: DataProduct = await getAllProducts();
        const productList = data.results;
        setProducts(productList);
      } catch (error_) {
        setError(
          error_ instanceof Error
            ? error_
            : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, []);

  if (error) {
    return <p>Loading error: {error.message}</p>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {loading ? <LoadingPlaceholder /> : <CardList products={products} />}
    </ThemeProvider>
  );
}
