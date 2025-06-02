import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../api";
import type { DataProduct, MasterData } from "../../../shared";
import { CardList } from "./card-list";
import { LoadingPlaceholder } from "../../../shared";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./styles.css";
import { Link } from "react-router-dom";
import { AddBreadcrumb, CreateCategoriesButton } from ".";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function CatalogProduct(): ReactNode {
  const [products, setProducts] = useState<MasterData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [breadcrumb, setBreadcrumb] = useState<string>("CARS");

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
    <main className="main">
      <img
        className="sale-board"
        src="../../../../assets/catalog/sale-board.gif"
        alt="sale-board"
      ></img>
      <CreateCategoriesButton setBreadcrumb={setBreadcrumb} />
      <div className="breadcrumb">
        <Link to="/catalog" className="breadcrumb-catalog">
          <button className="breadcrumb-button">CATALOG</button>
        </Link>
        <AddBreadcrumb buttonName={breadcrumb} />
      </div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {loading ? <LoadingPlaceholder /> : <CardList products={products} />}
      </ThemeProvider>
    </main>
  );
}
