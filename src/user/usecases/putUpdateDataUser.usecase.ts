import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@user/domain/repositories';

export class PutUpdateDataUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(data: any): Promise<string> {
    const updated = await this.userRepository.updateContentToUser(data);
    if (updated == 0) {
      this.logger.warn(
        'PutUpdateDataUserUseCase',
        'User not found, please check the information',
      );
      throw new NotFoundException(
        'User not found, please check the information',
      );
    }
    this.logger.log('PutUpdateDataUserUseCase', 'User updated successfully');
    return 'User updated successfully';
  }
}
