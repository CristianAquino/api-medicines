import { IAuthRepository } from '@auth/domain/repositories/authRepository.interface';
import {
  IBcryptService,
  IJwtService,
  IJwtServicePayload,
} from '@common/adapters';
import { envs } from '@common/config/environment-config';
import { UserModel } from '@common/entities/models';
import { ILogger } from '@common/logger/logger.interface';
import { UnauthorizedException } from '@nestjs/common';

export class LoginUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly bcryptService: IBcryptService,
    private readonly authRepository: IAuthRepository,
  ) {}

  async getCookieWithJwtToken(id: string, role: string, available: boolean) {
    this.logger.log('LoginUseCases', `The user ${id} have been logged.`);
    const payload: IJwtServicePayload = { id, role, available };
    const secret = envs.jwtSecret;
    const expiresIn = envs.jwtExpirationTime + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${envs.jwtExpirationTime}`;
  }

  async validateUserForLocalStragtegy(
    username: string,
    pass: string,
  ): Promise<UserModel> {
    const [user, password] = await this.authRepository.findByName(username);
    if (!user) {
      this.logger.error('LoginUseCases', 'The user has not been validated');
      throw new UnauthorizedException('Invalid username or password.');
    }
    const match = await this.bcryptService.compare(pass, password);
    if (user && match) {
      this.logger.log('LoginUseCases', 'The user has been validated');
      return user;
    }
    this.logger.error('LoginUseCases', 'The user has not been validated');
    return null;
  }
}
