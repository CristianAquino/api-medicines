import { IAuthRepository } from '../../src/auth/domain/repositories/authRepository.interface.ts';
import { LoginUseCase } from '../../src/auth/usecases';
import { IBcryptService, IJwtService } from '../../src/common/adapters';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test login use case', () => {
  let loginUseCase: LoginUseCase;
  let logger: ILogger;
  let jwtTokenService: IJwtService;
  let bcryptService: IBcryptService;
  let authRepository: IAuthRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();

    bcryptService = {} as IBcryptService;
    bcryptService.compare = jest.fn();

    authRepository = {} as IAuthRepository;
    authRepository.findOneByName = jest.fn();

    jwtTokenService = {} as IJwtService;
    jwtTokenService.createToken = jest.fn();

    loginUseCase = new LoginUseCase(
      logger,
      jwtTokenService,
      bcryptService,
      authRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(loginUseCase).toBeDefined();
  });

  it('should creating a cookie', async () => {
    const payload = {
      id: '1',
      role: 'user',
    };
    const secret = 'helloworld';
    const expireIn = 86400;
    const token = 'token';
    (jwtTokenService.createToken as jest.Mock).mockReturnValue(token);

    expect(
      await loginUseCase.getCookieWithJwtToken(payload.id, payload.role),
    ).toEqual(`Authentication=${token}; HttpOnly; Path=/; Max-Age=${expireIn}`);

    expect(logger.log).toHaveBeenCalledWith(
      'LoginUseCases',
      `The user ${payload.id} have been logged.`,
    );
    expect(jwtTokenService.createToken).toHaveBeenCalledWith(
      payload,
      secret,
      expireIn + 's',
    );
  });

  it('validation local strategy,should return null because user not found', async () => {
    const username = 'username';
    const password = 'XXXXXXXX';
    (authRepository.findOneByName as jest.Mock).mockResolvedValue(
      Promise.resolve([null, null]),
    );
    expect(
      await loginUseCase.validateUserForLocalStragtegy(username, password),
    ).toBeNull();
    expect(authRepository.findOneByName).toHaveBeenCalledWith(username);
    expect(logger.error).toBeCalledWith(
      'LoginUseCases',
      'The user has not been validated',
    );
    expect(bcryptService.compare).not.toHaveBeenCalled();
    expect(logger.log).not.toBeCalled();
  });

  it('validation local strategy,should return null because password is not correct', async () => {
    const username = 'username';
    const password = 'password';
    const user = {
      id: '1',
      password: 'password1234',
    };
    (authRepository.findOneByName as jest.Mock).mockResolvedValue(
      Promise.resolve([user, user.password]),
    );
    (bcryptService.compare as jest.Mock).mockResolvedValue(false);

    expect(
      await loginUseCase.validateUserForLocalStragtegy(username, password),
    ).toBeNull();
    expect(authRepository.findOneByName).toHaveBeenCalledWith(username);
    expect(logger.error).toBeCalledWith(
      'LoginUseCases',
      'The user has not been validated',
    );
    expect(bcryptService.compare).toHaveBeenCalledWith(password, user.password);
    expect(logger.log).not.toBeCalled();
  });
  it('validation local strategy,should return user', async () => {
    const username = 'username';
    const password = 'password';
    const user = {
      id: '1',
      password: 'password1234',
    };
    (authRepository.findOneByName as jest.Mock).mockResolvedValue(
      Promise.resolve([user, user.password]),
    );
    (bcryptService.compare as jest.Mock).mockResolvedValue(true);

    expect(
      await loginUseCase.validateUserForLocalStragtegy(username, password),
    ).toEqual(user);
    expect(authRepository.findOneByName).toHaveBeenCalledWith(username);
    expect(logger.error).not.toBeCalled();
    expect(bcryptService.compare).toHaveBeenCalledWith(password, user.password);
    expect(logger.log).toBeCalledWith(
      'LoginUseCases',
      'The user has been validated',
    );
  });
});
