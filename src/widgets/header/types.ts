export type HeaderPropertiesType = {
  readonly isLoggedIn: boolean;
  readonly totalLineItemQuantity: number;
  readonly setIsDownloadPage: (boolean) => void;
  readonly actOnLogout: () => void;
};
