export function getTokenFromCookie(): string {
  let BEARER_TOKEN = "";
  const arrayCookies = document.cookie.split("; ");
  for (const cookie of arrayCookies) {
    const [name, value] = cookie.split("=");
    if (name === "user_access_token") {
      BEARER_TOKEN = value;
      break;
    } else if (name === "anonymous_access_token") {
      BEARER_TOKEN = value;
      break;
    }
  }
  return BEARER_TOKEN;
}
