export interface BodyLogin {
  email: string;
  password: string;
}

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

export interface AccessToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface Error {
  errors: [];
  message: string;
  statusCode: number;
}
