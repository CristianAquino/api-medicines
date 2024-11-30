import {
  AllUsersData,
  CreateUserDTO,
  FindAllUsersDTO,
  UpdateDataUserByAdminDTO,
  UserData,
} from '@user/infrastructure/controller/dto';

export interface IUserRepository {
  createUser(createUserDTO: CreateUserDTO): Promise<void>;
  findAll(findAllUserDTO: FindAllUsersDTO): Promise<AllUsersData>;
  findById(id: string): Promise<UserData>;
  findOneByName(username: string): Promise<UserData>;
  updateContentToUser(data: any): Promise<number>;
  updateContentToAdmin(data: UpdateDataUserByAdminDTO): Promise<number>;
  updatePassword(id: string, password: string): Promise<number>;
  deleteById(id: string): Promise<UserData>;
}
