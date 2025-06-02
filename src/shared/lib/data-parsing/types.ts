import type { Attributes, Images } from "../../api";

export type ProductInfo = {
  productKey: string;
  productName: string;
  productDescription: string;
  productImages: Images[];
  productAttributes?: Attributes[];
  currencyCode: string;
  rawPrice: number;
  discountedPrice: number;
};
