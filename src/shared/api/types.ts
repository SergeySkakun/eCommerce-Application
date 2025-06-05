export interface BodyLogin {
  email: string;
  password: string;
}

interface Addresses {
  id: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface BodySignUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: Addresses[];
  defaultShippingAddress: number;
  defaultBillingAddress: number;
  dateOfBirth: string;
  store: string;
}

export interface AccessToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface CustomerAllInfo {
  statusCode: number;
  message: string;
  customer: Customer;
}

export interface Customer {
  message: string;
  id: string;
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: [Addresses];
  defaultShippingAddressIds: string;
  defaultbillingAddressIds: string;
}

export interface DataProduct {
  limit: 20;
  offset: 0;
  count: 18;
  total: 18;
  results: [MasterData] | [Product];
}

export interface MasterData {
  key: string;
  masterData: Current;
}

export interface Current {
  current: {
    id: string;
    name: Name;
    description: Description;
    masterVariant: MasterVariant;
  };
}

export interface Product {
  key: string;
  name: Name;
  description: Description;
  masterVariant: MasterVariant;
}

interface Name {
  "en-US": string;
}

interface Description {
  "en-US": string;
}

interface MasterVariant {
  prices: [Prices];
  images: [Images];
  attributes: [Attributes];
}

export interface Prices {
  value: Value;
  discounted?: Prices;
}

export interface Value {
  currencyCode: string;
  centAmount: number;
}

export interface Images {
  url: string;
  label: string;
}

export interface Attributes {
  name: string;
  value: number;
}

export interface Cart {
  id: string;
  version: number;
  lineItems: [ProductInCart];
  totalPrice: Value;
  discountOnTotalPrice: {
    discountedAmount: Value;
  };
  totalLineItemQuantity: number;
}

interface ProductInCart {
  id: string;
  name: Name;
  variant: MasterVariant;
  price: Prices;
  quantity: number;
  totalPrice: Value;
}
