import { IBcryptService } from '@common/adapters/bcrypt.interface';
import { LoggerService } from '@nestjs/common';
import { SeedRepository } from '@user/repositories/seed.repository';

export class RegisterInitialAdminUserUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly seedRepository: SeedRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(): Promise<void> {
    const username = 'admin';
    const password = 'admin1234';
    const isExist = await this.seedRepository.verifyExistingAdminUser(username);

    if (isExist) {
      this.logger.log('RegisterInitialAdminUser', 'Admin user already exists.');
    } else {
      const hashedPassword = await this.bcryptService.hash(password);
      await this.seedRepository.insertAdminUser(username, hashedPassword);
      this.logger.log(
        'RegisterInitialAdminUser',
        'Admin user created successfully.',
      );
    }
  }
}
