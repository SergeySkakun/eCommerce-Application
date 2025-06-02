import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProductContent } from "./product-content";
import { getProduct } from "../api";
import type { ProductInfo } from "../../../shared";
import { LoadingPlaceholder, parseMainProductData } from "../../../shared";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function DetailedProduct(): ReactElement {
  const { productKey } = useParams();
  const navigateTo = useNavigate();
  const [product, setProduct] = useState<ProductInfo | null>(null);
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
      if (productData.id) {
        const parsedMainProductData = parseMainProductData(productData);
        // TODO: сюда нужно добавить парсинг остальный атрибутов объекта
        // и собрать все в один, чтобы отправить в setProduct
        // Пример:
        // const parsedProductData = {...parsedMainProductData, ...parsedOtherProductData};
        // setProduct(parsedProductData);
        setProduct(parsedMainProductData);
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
        // Передавать обработанны данные продукта стоит в ProductContent, заменить только название свойства.
        // Можно передавать одним объектом, а можно передавать двумя, как раз тогда объединять не надо будет
        // и проще типы для разных объектов реализовать, либо использовать объединение типов
        // для обдного объектра с данными
        <ProductContent productName={product.productName} />
      )}
    </ThemeProvider>
  );
}
