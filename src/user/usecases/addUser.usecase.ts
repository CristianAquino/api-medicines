import { IBcryptService } from '@common/adapters/bcrypt.interface';
import { User } from '@common/entities/user.entity';
import { LoggerService } from '@nestjs/common';
import { AddUserDTO } from '@user/infrastructure/controller/dto/user-in.dto';
import { UserRepository } from '@user/infrastructure/repositories/user.repository';

export class AddUserUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(user: AddUserDTO): Promise<string> {
    const findUser = await this.userRepository.findOneByName(user.username);
    if (findUser) {
      this.logger.warn('AddUserUseCase execute', 'User already exists');
      throw new Error('User already exists');
    }
    const addUser = new User();
    addUser.username = user.username;
    addUser.role = user.role;
    const bcrPassword = await this.bcryptService.hash(user.password);
    addUser.password = bcrPassword;
    await this.userRepository.insert(addUser);
    this.logger.log('AddUserUseCase execute', 'New user have been inserted');
    return 'New user have been inserted';
  }
}
