export interface JWTokens {
  accessToken: string;
  refreshToken: string;
}

export interface PayloadToken {
  sub: string;
  name: string;
  role: string;
}

export interface SignJwtParams {
  payload: Record<string, any>;
  secret: string;
  refreshSecret: string;
  expires: string;
  refreshExpire: string;
}

export interface AuthTokenResult {
  sub: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export interface UseToken {
  sub: string;
  name: string;
  role: string;
  isExpired: boolean;
}
