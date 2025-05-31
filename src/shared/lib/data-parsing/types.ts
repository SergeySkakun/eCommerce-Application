import type { Images } from "../../api";

export type ProductInfo = {
  productID: string;
  productName: string;
  productDescription: string;
  productImages: Images[];
  currencyCode: string;
  rawPrice: number;
  discountedPrice: number;
};
