import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CatalogContent } from "./catalog-content";
// import "./styles.css";
// import { Link } from "react-router-dom";
// import { AddBreadcrumb, CreateCategoriesButton } from ".";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function CatalogProduct(): ReactNode {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CatalogContent />
    </ThemeProvider>
    // <main className="main">
    //   <img
    //     className="sale-board"
    //     src="../../../../assets/catalog/sale-board.gif"
    //     alt="sale-board"
    //   ></img>
    //   <CreateCategoriesButton setBreadcrumb={setBreadcrumb} />
    //   <div className="breadcrumb">
    //     <Link to="/catalog" className="breadcrumb-catalog">
    //       <button className="breadcrumb-button">CATALOG</button>
    //     </Link>
    //     <AddBreadcrumb buttonName={breadcrumb} />
    //   </div>
  );
}
