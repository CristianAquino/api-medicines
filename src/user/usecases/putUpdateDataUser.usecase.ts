import { IBcryptService } from '@common/adapters';
import { LoggerService, NotFoundException } from '@nestjs/common';
import { UpdateDataByUserDTO } from '@user/infrastructure/controller/dto';
import { UserRepository } from '@user/infrastructure/repositories';

export class PutUpdateDataUserUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}
  async execute(data: UpdateDataByUserDTO): Promise<string> {
    let updated: number;
    if (data.password) {
      const newPassword = await this.bcryptService.hash(data.password);
      updated = await this.userRepository.updateContentByUser({
        ...data,
        password: newPassword,
      });
    } else {
      updated = await this.userRepository.updateContentByUser(data);
    }

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
