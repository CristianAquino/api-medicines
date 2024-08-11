export interface IAuthRepository {
  findOneByName(username: string): Promise<any>;
}
