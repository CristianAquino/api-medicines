import { LoggerService, NotFoundException } from '@nestjs/common';
import {
  FindAllUsersDTO,
  ReturnAllUserData,
} from '@user/infrastructure/controller/dto';
import { UserRepository } from '@user/infrastructure/repositories';

export class GetAllUsersUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    findAllUsersDTO: FindAllUsersDTO,
  ): Promise<ReturnAllUserData | string> {
    const allUsers = await this.userRepository.findAll(findAllUsersDTO);
    if (allUsers.meta.total == 0) {
      this.logger.warn('GetAllUsersUseCase execute', 'No found users');
      throw new NotFoundException('Users not found');
    }
    this.logger.log('GetAllUserUseCase execute', 'Return all users finds');
    return allUsers;
  }
}
