import {
  IBcryptService,
  IJwtService,
  IJwtServicePayload,
} from '@common/adapters';
import { envs } from '@common/config/environment-config';
import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@user/domain/repositories';

type data = {
  key: string;
  password: string;
};
type key = {
  id: string;
  role: string;
  available: boolean;
};
export class PutUpdatePasswordUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly jwtTokenService: IJwtService,
  ) {}
  async updatePassword({ key, password }: data): Promise<string> {
    const newPassword = await this.bcryptService.hash(password);
    const { id } = await this.jwtTokenService.checkToken(
      key,
      envs.jwtSecretChangePassword,
    );
    const updated = await this.userRepository.updatePassword(id, newPassword);
    if (updated == 0) {
      this.logger.warn(
        'PutUpdatePasswordUserUseCase',
        'User not found, please check the information',
      );
      throw new NotFoundException(
        'User not found, please check the information',
      );
    }
    this.logger.log(
      'PutUpdatePasswordUserUseCase',
      'User password updated successfully',
    );
    return 'User password updated successfully';
  }
  async getKeyWithJwtToken({ id, role, available }: key) {
    const payload: IJwtServicePayload = { id, role, available };
    const secret = envs.jwtSecretChangePassword;
    const expiresIn = envs.jwtExpirationTimeChangePassword + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `${envs.urlChangePassword}?key=${token}`;
  }
}
