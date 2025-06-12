import { useEffect, useState, type ReactElement } from "react";
import { TotalLineItemQuantityContext } from ".";
import { getCart } from "../../..";

export function TotalQuantityContextProvider({ children }): ReactElement {
  const [totalLineItemQuantity, setTotalLineItemQuantity] = useState(0);
  const [productsCheckout, setProductCheckout] = useState<string[]>([]);
  const [isDownloadPage, setIsDownloadPage] = useState<boolean>(false);

  useEffect(() => {
    const CheckProductInCart = async (): Promise<void> => {
      let productIdInCart: string[] = [];
      if (isDownloadPage) {
        const cart = await getCart();
        productIdInCart = cart.lineItems.map((product) => product.productId);
        setProductCheckout(productIdInCart);
        setIsDownloadPage(false);
      }
    };
    void CheckProductInCart();
  }, [isDownloadPage]);

  const value = {
    totalLineItemQuantity,
    setTotalLineItemQuantity,
    productsCheckout,
    setProductCheckout,
    setIsDownloadPage,
  };

  return (
    <TotalLineItemQuantityContext.Provider value={value}>
      {children}
    </TotalLineItemQuantityContext.Provider>
  );
}
