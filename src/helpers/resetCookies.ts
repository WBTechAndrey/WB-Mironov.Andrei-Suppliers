export const resetCookies = (name: string, value: string) => {
  const expires = new Date();
  expires.setTime(expires.getTime());
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};
