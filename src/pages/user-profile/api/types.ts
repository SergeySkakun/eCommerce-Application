export interface Action {
  action: string;
  address: Address;
}
interface Address {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
}
