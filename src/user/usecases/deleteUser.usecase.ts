import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@user/domain/repositories';

export class DeleteUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const del = await this.userRepository.deleteById(id);
    if (del == 0) {
      this.logger.warn(
        'DeleteUserUseCase',
        'User not found, please check the information',
      );
      throw new NotFoundException(
        'User not found, please check the information',
      );
    }
    this.logger.log('DeleteUserUseCase', `User ${id} have been deleted`);
    return `User ${id} have been deleted`;
  }
}
