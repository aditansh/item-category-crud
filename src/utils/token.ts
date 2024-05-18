import jsonwebtoken from "jsonwebtoken";

export function generateToken(payload: any, secret: string, expiresIn: string) {
  return jsonwebtoken.sign(payload, secret, { expiresIn });
}

export function generateAccessToken(payload: any) {
  return generateToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET!,
    process.env.ACCESS_TOKEN_EXPIRY!
  );
}

export function generateRefreshToken(payload: any) {
  return generateToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET!,
    process.env.REFRESH_TOKEN_EXPIRY!
  );
}
