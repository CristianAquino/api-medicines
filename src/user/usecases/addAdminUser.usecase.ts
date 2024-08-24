import { IBcryptService } from '@common/adapters';
import { ILogger } from '@common/logger/logger.interface';
import { ISeedRepository } from '@user/domain/repositories';

export class AddAdminUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly seedRepository: ISeedRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(): Promise<void> {
    const username = 'admin';
    const password = 'admin1234';
    const isExist = await this.seedRepository.verifyIsExistingAdminUser(
      username,
    );

    if (isExist) {
      this.logger.log('AddAdminUser', 'Admin user already exists.');
    } else {
      const hashedPassword = await this.bcryptService.hash(password);
      await this.seedRepository.addAdminUser(username, hashedPassword);
      this.logger.log('AddAdminUser', 'Admin user created successfully.');
    }
  }
}
