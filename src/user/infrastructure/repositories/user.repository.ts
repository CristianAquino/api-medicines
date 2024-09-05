import { User } from '@common/entities';
import { UserModel } from '@common/entities/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '@user/domain/repositories';
import { Repository } from 'typeorm';
import {
  AllUsersData,
  CreateUserDTO,
  FindAllUsersDTO,
  UpdateDataUserByAdminDTO,
  UserData,
} from '../controller/dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    await this.userEntityRepository.save(createUserDTO);
  }
  async findAll(findAllUsersDTO: FindAllUsersDTO): Promise<AllUsersData> {
    const { limit, page, username, role } = findAllUsersDTO;
    const query = this.userEntityRepository.createQueryBuilder('user');

    if (username && role) {
      query.andWhere(
        'LOWER(user.username) LIKE LOWER(:username) AND user.role = :role',
        {
          username: `%${username}%`,
          role: role,
        },
      );
    } else if (username) {
      query.andWhere('LOWER(user.username) LIKE LOWER(:username)', {
        username: `%${username}%`,
      });
    } else if (role) {
      query.andWhere('user.role = :role', { role });
    }

    const [users, total_users] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    const last_page = Math.ceil(total_users / limit);

    return {
      data: users.map((user) => this.userAdapter(user)),
      meta: {
        total: total_users,
        page,
        last_page,
      },
    };
  }
  async findById(id: string): Promise<UserData> {
    const user = await this.userEntityRepository.findOneBy({ id });
    if (!user) return null;
    return this.userAdapter(user);
  }
  async findOneByName(username: string): Promise<UserData> {
    const user = await this.userEntityRepository
      .createQueryBuilder('user')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();
    if (!user) return null;
    return this.userAdapter(user);
  }
  async updateContentToUser(data: any): Promise<number> {
    const { id, ...content } = data;
    const updated = await this.userEntityRepository.update({ id }, content);
    return updated.affected;
  }
  async updateContentToAdmin(data: UpdateDataUserByAdminDTO): Promise<number> {
    const { id, ...content } = data;
    const updated = await this.userEntityRepository.update({ id }, content);
    return updated.affected;
  }
  async updatePassword(id: string, password: string): Promise<number> {
    const updated = await this.userEntityRepository.update(
      { id },
      { password },
    );
    return updated.affected;
  }
  async deleteById(id: string): Promise<number> {
    const del = await this.userEntityRepository.delete({ id });
    return del.affected;
  }

  private userAdapter(user: UserModel): UserData {
    const userDTO = new UserModel();
    userDTO.id = user.id;
    userDTO.username = user.username;
    userDTO.role = user.role;
    userDTO.available = user.available;
    return userDTO;
  }
}
