import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IUserRepository } from '@user/domain/repositories';
import {
  AllUsersData,
  FindAllUsersDTO,
} from '@user/infrastructure/controller/dto';

export class GetAllUsersUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(findAllUsersDTO: FindAllUsersDTO): Promise<AllUsersData> {
    const allUsers = await this.userRepository.findAll(findAllUsersDTO);
    if (allUsers.meta.total == 0) {
      this.logger.log(
        'GetAllUsersUseCase',
        'There are no registered users yet',
      );
      throw new NotFoundException('There are no registered users yet');
    }
    this.logger.log('GetAllUserUseCase', 'Return all users finds');
    return allUsers;
  }
}
