import { IAuthRepository } from '@auth/domain/repositories/authRepository.interface';
import { User } from '@common/entities';
import { UserModel } from '@common/entities/models';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnUserData } from '@user/infrastructure/controller/dto';
import { Repository } from 'typeorm';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}
  async findByName(username: string): Promise<any> {
    const user = await this.userEntityRepository.findOneBy({ username });
    if (!user) return [null, null];
    return [this.userAdapter(user), user.password];
  }

  private userAdapter(user: UserModel): ReturnUserData {
    const userDTO = new UserModel();
    userDTO.id = user.id;
    userDTO.username = user.username;
    userDTO.role = user.role;
    return userDTO;
  }
}
