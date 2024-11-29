import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@user/domain/repositories';

export class PutUpdateDataUserByAdminUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(data: any): Promise<string> {
    const user = await this.userRepository.findById(data.id);
    if (!user) {
      this.logger.warn(
        'PutUpdateDataUserByAdminUseCase',
        'User not found, please check the information',
      );
      throw new NotFoundException(
        'User not found, please check the information',
      );
    }

    const updated = await this.userRepository.updateContentToAdmin(data);
    if (updated == 0) {
      this.logger.warn(
        'PutUpdateDataUserByAdminUseCase',
        'User not found, please check the information',
      );
      throw new NotFoundException(
        'User not found, please check the information',
      );
    }

    this.logger.log(
      'PutUpdateDataUserByAdminUseCase',
      `The role for user ${user.username} has been successfully updated to ${user.role}`,
    );
    return `The role for user ${user.username} has been successfully updated to ${data.role}`;
  }
}
