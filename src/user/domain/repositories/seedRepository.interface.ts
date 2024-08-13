export interface ISeedRepository {
  insertAdminUser(username: string, password: string): Promise<void>;
  verifyExistingAdminUser(username: string): Promise<boolean>;
}
