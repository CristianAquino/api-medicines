import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import {
  AllUsersData,
  FindAllUsersDTO,
} from '@user/infrastructure/controller/dto';
import { UserRepository } from '@user/infrastructure/repositories';

export class GetAllUsersUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(findAllUsersDTO: FindAllUsersDTO): Promise<AllUsersData> {
    const allUsers = await this.userRepository.findAll(findAllUsersDTO);
    if (allUsers.meta.total == 0) {
      this.logger.log('GetAllUsersUseCase', 'Users not found');
      throw new NotFoundException('Users not found');
    }
    this.logger.log('GetAllUserUseCase', 'Return all users finds');
    return allUsers;
  }
}
