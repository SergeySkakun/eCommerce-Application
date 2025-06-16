import { createContext } from "react";
import { type LineItem } from "./types";
import { type Cart } from "@/shared/api";

type Value = {
  totalLineItemQuantity: number;
  setTotalLineItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  productsCheckout: [LineItem];
  setProductsCheckout: React.Dispatch<React.SetStateAction<[LineItem]>>;
  setIsDownloadPage: React.Dispatch<React.SetStateAction<boolean>>;
  cart: Cart;
};

export const TotalLineItemQuantityContext = createContext<Value>({
  totalLineItemQuantity: 0,
  setTotalLineItemQuantity: () => {},
  productsCheckout: [{ id: "", productId: "" }],
  setProductsCheckout: () => {},
  setIsDownloadPage: () => {},
  cart: null,
});
