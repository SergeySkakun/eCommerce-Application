import { useState, useEffect, type ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductContent } from "./product-content";
import { getProduct } from "../api";
import { LoadingPlaceholder, type MasterData } from "../../../shared";

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
    <>
      <CssBaseline />
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <ProductContent product={product} />
      )}
    </>
  );
}
