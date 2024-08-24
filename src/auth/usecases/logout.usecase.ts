import { ILogger } from '@common/logger/logger.interface';

export class LogoutUseCase {
  constructor(private readonly logger: ILogger) {}

  async execute(): Promise<string> {
    this.logger.log('LogoutUseCase', 'Logout successful');
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }
}
