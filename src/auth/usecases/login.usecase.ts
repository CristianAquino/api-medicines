import { AuthRepository } from '@auth/infrastructure/respositories/auth.repository';
import { IBcryptService } from '@common/adapters/bcrypt.interface';
import {
  IJwtService,
  IJwtServicePayload,
} from '@common/adapters/jwt.interface';
import { envs } from '@common/config/environment-config';
import { ILogger } from '@common/logger/logger.interface';

export class LoginUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly bcryptService: IBcryptService,
    private readonly authRepository: AuthRepository,
  ) {}

  async getCookieWithJwtToken(id: string, role: string) {
    this.logger.log('LoginUseCases', `The user ${id} have been logged.`);
    const payload: IJwtServicePayload = { id, role };
    const secret = envs.jwtSecret;
    const expiresIn = envs.jwtExpirationTime + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${envs.jwtExpirationTime}`;
  }

  async validateUserForLocalStragtegy(username: string, pass: string) {
    const [user, password] = await this.authRepository.findOneByName(username);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, password);
    if (user && match) {
      return user;
    }
    return null;
  }
}
