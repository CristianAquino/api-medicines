import { IAuthRepository } from '@auth/domain/repositories/authRepository.interface';
import { User } from '@common/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnUserData } from '@user/infrastructure/controller/dto';
import { Repository } from 'typeorm';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}
  async findOneByName(username: string): Promise<any> {
    const user = await this.userEntityRepository.findOneBy({ username });
    if (!user) return null;
    return [this.toFindUser(user), user.password];
  }

  private toFindUser(user: User): ReturnUserData {
    const userDTO = new User();
    userDTO.id = user.id;
    userDTO.username = user.username;
    userDTO.role = user.role;
    return userDTO;
  }
}
