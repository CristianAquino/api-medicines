import { LogoutUseCase } from '../../src/auth/usecases';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test logout use case', () => {
  let logoutUseCase: LogoutUseCase;
  let logger: ILogger;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    logoutUseCase = new LogoutUseCase(logger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(logoutUseCase).toBeDefined();
  });

  it('should return a cookie invalidation', async () => {
    await expect(logoutUseCase.execute()).resolves.toEqual(
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
    );
    expect(logger.log).toBeCalledWith('LogoutUseCase', 'Logout successful');
  });
});
