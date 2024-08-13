import { User } from '@common/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '@user/domain/repositories';
import { Repository } from 'typeorm';
import {
  AddUserDTO,
  FindAllUsersDTO,
  ReturnAllUserData,
  ReturnUserData,
  UpdateByAdminDTO,
  UpdateDataByUserDTO,
} from '../controller/dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async insert(user: AddUserDTO): Promise<void> {
    await this.userEntityRepository.save(user);
  }
  async findById(id: string): Promise<ReturnUserData> {
    const user = await this.userEntityRepository.findOneBy({ id });
    if (!user) return null;
    return this.toFindAll(user);
  }
  async findOneByName(username: string): Promise<ReturnUserData> {
    const user = await this.userEntityRepository.findOneBy({ username });
    if (!user) return null;
    return this.toFindAll(user);
  }
  async findAll(findAllUsersDTO: FindAllUsersDTO): Promise<ReturnAllUserData> {
    const { limit, page, username, role } = findAllUsersDTO;
    const query = this.userEntityRepository.createQueryBuilder('user');

    if (username && role) {
      query.andWhere('user.username LIKE :username AND user.role = :role', {
        username: `%${username}%`,
        role: role,
      });
    }
    if (username) {
      query.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }
    if (role) {
      query.andWhere('user.role = :role', { role });
    }

    const [users, total_users] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    const last_page = Math.ceil(total_users / limit);

    return {
      data: users.map((user) => this.toFindAll(user)),
      meta: {
        total: total_users,
        page,
        last_page,
      },
    };
  }
  //   pensar en dos endpoints
  // o en uno solo
  //   donde el primero usa DTO para admin
  // el otro usa DTO para user
  async updateContentByUser(data: UpdateDataByUserDTO): Promise<number> {
    console.log(data);
    const { id, ...content } = data;
    const updated = await this.userEntityRepository.update({ id }, content);
    return updated.affected;
  }
  async updateContentByAdmin(
    id: string,
    content: UpdateByAdminDTO,
  ): Promise<void> {
    await this.userEntityRepository.update({ id }, content);
  }
  async deleteById(id: string): Promise<number> {
    const del = await this.userEntityRepository.delete({ id });
    return del.affected;
  }

  private toFindAll(user: User): ReturnUserData {
    const userDTO = new User();
    userDTO.id = user.id;
    userDTO.username = user.username;
    userDTO.role = user.role;
    return userDTO;
  }
}
