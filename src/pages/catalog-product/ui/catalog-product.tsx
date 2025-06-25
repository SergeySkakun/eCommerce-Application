import { type ReactNode } from "react";
import { CatalogContent } from "./catalog-content";

export function CatalogProduct(): ReactNode {
  return (
    <div className="product-conteiner">
      <CatalogContent />
    </div>
  );
}
