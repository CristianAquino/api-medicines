export interface IJwtServicePayload {
  id: string;
  role: string;
  available: boolean;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}
