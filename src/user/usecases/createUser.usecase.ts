import { IBcryptService } from '@common/adapters';
import { UserModel } from '@common/entities/models';
import { ILogger } from '@common/logger/logger.interface';
import { ConflictException } from '@nestjs/common';
import { IUserRepository } from '@user/domain/repositories';
import { CreateUserDTO } from '@user/infrastructure/controller/dto';

export class CreateUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(user: CreateUserDTO): Promise<string> {
    const findUser = await this.userRepository.findOneByName(user.username);
    if (findUser) {
      this.logger.warn(
        'CreateUserUseCase',
        `User ${user.username} already exists`,
      );
      throw new ConflictException(`User ${user.username} already exists`);
    }
    const newUser = new UserModel();
    newUser.username = user.username;
    newUser.role = user.role;
    const bcrPassword = await this.bcryptService.hash(`${user.username}1234`);
    newUser.password = bcrPassword;
    await this.userRepository.createUser(newUser);
    this.logger.log(
      'CreateUserUseCase',
      `New user ${user.username} have been created successfully, his password is ${user.username}1234`,
    );
    return `New user ${user.username} have been created successfully, his password is ${user.username}1234`;
  }
}
