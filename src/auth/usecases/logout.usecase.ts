export class LogoutUseCase {
  constructor() {}

  async execute(): Promise<string> {
    return 'Authentication=; HttpOnly; Path=/; Max-Age=0';
  }
}
