import {
  ReturnAllUserData,
  ReturnUserData,
} from '@user/infrastructure/controller/dto';
import {
  AddUserDTO,
  FindAllUsersDTO,
  UpdateByAdminDTO,
  UpdateDataByUserDTO,
} from '@user/infrastructure/controller/dto/user-in.dto';

export interface IUserRepository {
  insert(user: AddUserDTO): Promise<void>;
  findAll(findAllUserDTO: FindAllUsersDTO): Promise<ReturnAllUserData>;
  findById(id: string): Promise<ReturnUserData>;
  findOneByName(username: string): Promise<ReturnUserData>;
  updateContentByUser(data: UpdateDataByUserDTO): Promise<number>;
  updateContentByAdmin(id: string, content: UpdateByAdminDTO): Promise<void>;
  deleteById(id: string): Promise<number>;
}
