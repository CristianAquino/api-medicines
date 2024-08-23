export interface IAuthRepository {
  findByName(username: string): Promise<any>;
}
