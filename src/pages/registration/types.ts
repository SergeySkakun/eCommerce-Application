interface Addresses {
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
  dateOfBirth: string;
  store: string;
}
