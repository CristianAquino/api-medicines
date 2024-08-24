import { User } from '@common/entities';
import { UserModel } from '@common/entities/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISeedRepository } from '@user/repositories';
import { Repository } from 'typeorm';
import { Role } from '../controller/enum/user.enum';

@Injectable()
export class SeedRepository implements ISeedRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async verifyIsExistingAdminUser(username: string): Promise<boolean> {
    const existAdmin = await this.userEntityRepository.findOneBy({
      username,
    });
    return !!existAdmin;
  }

  async addAdminUser(username: string, password: string): Promise<void> {
    const admin = new UserModel();
    admin.username = username;
    admin.password = password;
    admin.role = Role.ADMIN;
    await this.userEntityRepository.save(admin);
  }
}
