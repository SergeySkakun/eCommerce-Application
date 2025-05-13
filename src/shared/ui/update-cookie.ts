/* eslint-disable unicorn/no-document-cookie */
export function updateCookies(accessToken: string, refreshToken: string): void {
  const cookieAccessToken =
    encodeURIComponent("access_token") + "=" + encodeURIComponent(accessToken);
  updateCookie(cookieAccessToken);
  const cookieRefreshToken =
    encodeURIComponent("refresh_token") +
    "=" +
    encodeURIComponent(refreshToken);
  updateCookie(cookieRefreshToken);
}

function updateCookie(updatedToken: string): void {
  const date = new Date(Date.now() + 3, 6e8).toUTCString();
  updatedToken += "; expires=" + `${date}`;
  document.cookie = updatedToken;
}
