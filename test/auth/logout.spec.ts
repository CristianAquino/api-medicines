import { LogoutUseCase } from '../../src/auth/usecases';

describe('Test logout use case', () => {
  let logoutUseCase: LogoutUseCase;

  beforeAll(() => {
    logoutUseCase = new LogoutUseCase();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(logoutUseCase).toBeDefined();
  });
  it('should return a cookie invalidation', async () => {
    expect(await logoutUseCase.execute()).toEqual(
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
    );
  });
});
