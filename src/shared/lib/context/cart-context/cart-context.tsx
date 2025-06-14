import { useEffect, useState, type ReactElement } from "react";
import { TotalLineItemQuantityContext } from ".";
import { getCart } from "../../..";
import { type LineItem } from ".";

export function TotalQuantityContextProvider({ children }): ReactElement {
  const [totalLineItemQuantity, setTotalLineItemQuantity] = useState(0);
  const [productsCheckout, setProductsCheckout] = useState<[LineItem]>();
  const [isDownloadPage, setIsDownloadPage] = useState<boolean>(false);

  useEffect(() => {
    const CheckProductInCart = async (): Promise<void> => {
      if (isDownloadPage) {
        const cart = await getCart();
        setProductsCheckout(cart.lineItems);
        setIsDownloadPage(false);
        setTotalLineItemQuantity(cart.totalLineItemQuantity ?? 0);
      }
    };
    void CheckProductInCart();
  }, [isDownloadPage]);

  const value = {
    totalLineItemQuantity,
    setTotalLineItemQuantity,
    productsCheckout,
    setProductsCheckout,
    setIsDownloadPage,
  };

  return (
    <TotalLineItemQuantityContext.Provider value={value}>
      {children}
    </TotalLineItemQuantityContext.Provider>
  );
}
