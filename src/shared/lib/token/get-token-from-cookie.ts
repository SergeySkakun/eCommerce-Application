import { TOKEN_NAMES } from "./";

export function getTokenFromCookie(): string {
  let BEARER_TOKEN = "";
  const arrayCookies = document.cookie.split("; ");
  for (const cookie of arrayCookies) {
    const [name, value] = cookie.split("=");
    if (name === TOKEN_NAMES.successUserAccess) {
      BEARER_TOKEN = value;
      break;
    } else if (name === TOKEN_NAMES.guestAccess) {
      BEARER_TOKEN = value;
      break;
    }
  }
  return BEARER_TOKEN;
}
