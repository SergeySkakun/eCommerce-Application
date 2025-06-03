import { useState, useEffect, type ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductContent } from "./product-content";
import { getProduct } from "../api";
import { LoadingPlaceholder, type MasterData } from "../../../shared";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function DetailedProduct(): ReactElement {
  const { productKey } = useParams();
  const navigateTo = useNavigate();
  const [product, setProduct] = useState<MasterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productKey) {
      void navigateTo("/404");
      setIsLoading(false);
      return;
    }

    const receiveData = async (): Promise<void> => {
      setIsLoading(true);
      setProduct(null);

      const productData = await getProduct(productKey);
      if (productData.key) {
        setProduct(productData);
      } else {
        void navigateTo("/404");
      }

      setIsLoading(false);
    };

    void receiveData();
  }, [productKey, navigateTo]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <ProductContent product={product} />
      )}
    </ThemeProvider>
  );
}
