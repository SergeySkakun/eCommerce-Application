import { TOKEN_NAMES } from "./token-names";

export function getTokenFromCookie(tokenName: string): string {
  let TOKEN = "";
  const arrayCookies = document.cookie.split("; ");
  for (const cookie of arrayCookies) {
    const [name, value] = cookie.split("=");
    if (name === tokenName) {
      TOKEN = value;
      break;
    } else if (name === TOKEN_NAMES.guestAccess) {
      TOKEN = value;
    }
  }
  return TOKEN;
}
