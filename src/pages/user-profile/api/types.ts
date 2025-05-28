export interface Action {
  action: string;
  addressId?: string;
  address?: Address;
}
interface Address {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface Error {
  statusCode: number;
  message: string;
  version: number;
}
