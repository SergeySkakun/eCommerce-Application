import type { Attributes, Images, ProductInCart } from "../../api";

export interface ProductInfo {
  productId: string;
  productKey: string;
  productName: string;
  productDescription: string;
  productImages: Images[];
  productAttributes?: Attributes[];
  currencyCode: string;
  rawPrice: number;
  discountedPrice: number;
}

export interface CartInfo {
  allProductInCart: [ProductInCart];
  totalPrice: number;
  discountOnTotalPrice: number;
  totalLineItemQuantity: number;
}
