export interface ISeedRepository {
  createAdminUser(username: string, password: string): Promise<void>;
  verifyIsExistingAdminUser(username: string): Promise<boolean>;
}
