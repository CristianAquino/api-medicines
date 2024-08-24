export interface ISeedRepository {
  addAdminUser(username: string, password: string): Promise<void>;
  verifyIsExistingAdminUser(username: string): Promise<boolean>;
}
