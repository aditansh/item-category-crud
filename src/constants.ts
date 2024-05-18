export let ACCESS_TOKEN_SECRET: string | undefined;
export let REFRESH_TOKEN_SECRET: string | undefined;
export let ACCESS_TOKEN_EXPIRY: string | undefined;
export let REFRESH_TOKEN_EXPIRY: string | undefined;

export function loadConstants() {
  ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  if (!ACCESS_TOKEN_SECRET) {
    throw Error("ACCESS_TOKEN_SECRET is not defined");
  }

  REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  if (!REFRESH_TOKEN_SECRET) {
    throw Error("REFRESH_TOKEN_SECRET is not defined");
  }

  ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
  if (!ACCESS_TOKEN_EXPIRY) {
    throw Error("ACCESS_TOKEN_EXPIRY is not defined");
  }

  REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
  if (!REFRESH_TOKEN_EXPIRY) {
    throw Error("REFRESH_TOKEN_EXPIRY is not defined");
  }
}
