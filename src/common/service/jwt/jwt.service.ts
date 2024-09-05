import {
  IJwtService,
  IJwtServicePayload,
} from '@common/adapters/jwt.interface';
import { envs } from '@common/config/environment-config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(
    token: string,
    secret: string = envs.jwtSecret,
  ): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token, { secret });
    return decode;
  }

  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
