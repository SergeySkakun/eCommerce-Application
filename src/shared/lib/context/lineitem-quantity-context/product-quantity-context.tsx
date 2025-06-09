import type { ReactElement } from "react";
import { useState } from "react";
import { TotalLineItemQuantityContext } from ".";

export function TotalQuantityContextProvider({ children }): ReactElement {
  const [totalLineItemQuantity, setTotalLineItemQuantity] = useState<number>(0);
  const value = {
    totalLineItemQuantity,
    setTotalLineItemQuantity,
  };

  return (
    <TotalLineItemQuantityContext.Provider value={value}>
      {children}
    </TotalLineItemQuantityContext.Provider>
  );
}
