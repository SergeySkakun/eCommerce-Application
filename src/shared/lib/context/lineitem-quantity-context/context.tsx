import { createContext } from "react";

type value = {
  totalLineItemQuantity: number;
  setTotalLineItemQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export const TotalLineItemQuantityContext = createContext<value>({
  totalLineItemQuantity: 0,
  setTotalLineItemQuantity: () => {},
});
