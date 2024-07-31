import { ISeedRepository } from '@auth/repositories/seedRepository.interface';
import { User } from '@common/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedRepository implements ISeedRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async insertAdminUser(username: string, password: string): Promise<void> {
    const existAdmin = await this.userEntityRepository.findOneBy({
      username,
    });

    if (!existAdmin) {
      const admin = new User();
      admin.username = username;
      admin.password = password;
      admin.role = 'admin';
      await this.userEntityRepository.save(admin);
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }
  }
}
