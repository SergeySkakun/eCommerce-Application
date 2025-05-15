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
