export function saveTokenCookie(token: string, nameToken: string): void {
  const cookieToken = createTokenCookie(token, nameToken);
  document.cookie = cookieToken;
}

function createTokenCookie(updatedToken: string, nameToken: string): string {
  let newCookie = `${encodeURIComponent(nameToken)}=${encodeURIComponent(updatedToken)}`;
  const date = new Date(Date.now() + 3.6e8).toUTCString();
  newCookie += "; expires=" + `${date}`;
  return newCookie;
}
