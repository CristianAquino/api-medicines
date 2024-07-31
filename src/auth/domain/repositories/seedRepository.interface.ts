export interface ISeedRepository {
  insertAdminUser(username: string, password: string): Promise<string>;
}
