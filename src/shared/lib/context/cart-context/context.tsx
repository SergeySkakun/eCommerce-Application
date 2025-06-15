import { createContext } from "react";

type Value = {
  totalLineItemQuantity: number;
  setTotalLineItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  productsCheckout: string[];
  setProductCheckout: React.Dispatch<React.SetStateAction<string[]>>;
  setIsDownloadPage: React.Dispatch<boolean>;
};

export const TotalLineItemQuantityContext = createContext<Value>({
  totalLineItemQuantity: 0,
  setTotalLineItemQuantity: () => {},
  productsCheckout: [""],
  setProductCheckout: () => {},
  setIsDownloadPage: () => {},
});
