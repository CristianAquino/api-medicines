import { SeedRepository } from '@auth/repositories/seed.repository';
import { IBcryptService } from '@common/adapters/bcrypt.interface';
import { LoggerService } from '@nestjs/common';

export class InitialAdminUserUseCase {
  constructor(
    private readonly logger: LoggerService,
    private readonly seedRepository: SeedRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(): Promise<void> {
    const username = 'admin';
    const password = 'admin1234';
    const hashedPassword = await this.bcryptService.hash(password);
    const response = await this.seedRepository.insertAdminUser(
      username,
      hashedPassword,
    );
    this.logger.log('InitialAdminUser', response);
  }
}
