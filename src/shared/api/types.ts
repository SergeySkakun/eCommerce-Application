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
