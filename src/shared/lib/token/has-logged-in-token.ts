import TOKEN_NAMES from "./token-names";

export default function hasLoggedInToken(): boolean {
  const TOKEN_NAME = TOKEN_NAMES.successUserAccess;
  return document.cookie.includes(TOKEN_NAME);
}
