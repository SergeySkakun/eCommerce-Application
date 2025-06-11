import { createContext } from "react";

type value = {
  totalLineItemQuantity: number;
  setTotalLineItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  productsCheckout: string[];
  setProductCheckout: React.Dispatch<React.SetStateAction<string[]>>;
  setIsDownloadPage: React.Dispatch<boolean>;
};

export const TotalLineItemQuantityContext = createContext<value>({
  totalLineItemQuantity: 0,
  setTotalLineItemQuantity: () => {},
  productsCheckout: [""],
  setProductCheckout: () => {},
  setIsDownloadPage: () => {},
});
