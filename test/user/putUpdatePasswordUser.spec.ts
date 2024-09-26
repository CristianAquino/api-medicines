import { IBcryptService } from '../../src/common/adapters/bcrypt.interface';
import { IJwtService } from '../../src/common/adapters/jwt.interface';
import { envs } from '../../src/common/config/environment-config/';
import { ILogger } from '../../src/common/logger/logger.interface';
import { IUserRepository } from '../../src/user/domain/repositories';
import { PutUpdatePasswordUserUseCase } from '../../src/user/usecases';

describe('Test put update password user', () => {
  let putUpdatePasswordUserUseCase: PutUpdatePasswordUserUseCase;
  let logger: ILogger;
  let userRepository: IUserRepository;
  let bcryptService: IBcryptService;
  let jwtTokenService: IJwtService;

  const data = {
    password: 'newPassword',
    key: 'key',
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    bcryptService = {} as IBcryptService;
    bcryptService.hash = jest.fn();
    bcryptService.compare = jest.fn();

    jwtTokenService = {} as IJwtService;
    jwtTokenService.createToken = jest.fn();
    jwtTokenService.checkToken = jest.fn();

    userRepository = {} as IUserRepository;
    userRepository.updatePassword = jest.fn();

    putUpdatePasswordUserUseCase = new PutUpdatePasswordUserUseCase(
      logger,
      userRepository,
      bcryptService,
      jwtTokenService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(putUpdatePasswordUserUseCase).toBeDefined();
  });

  it('should return a url with the key to change the password', async () => {
    const payload = { id: '1', role: 'user', available: true };
    const token = 'token';
    (jwtTokenService.createToken as jest.Mock).mockReturnValue(token);

    await expect(
      putUpdatePasswordUserUseCase.getKeyWithJwtToken(payload),
    ).resolves.toBe(`${envs.urlChangePassword}?key=${token}`);
    expect(jwtTokenService.createToken).toHaveBeenCalledWith(
      payload,
      envs.jwtSecretChangePassword,
      envs.jwtExpirationTimeChangePassword + 's',
    );
  });

  it('should return a warning message if not user updated', async () => {
    (bcryptService.hash as jest.Mock).mockResolvedValue('hash');
    (jwtTokenService.checkToken as jest.Mock).mockReturnValue({ id: '1' });
    (userRepository.updatePassword as jest.Mock).mockResolvedValue(false);

    await expect(
      putUpdatePasswordUserUseCase.updatePassword(data),
    ).rejects.toThrow('User not found, please check the information');
    expect(bcryptService.hash).toHaveBeenCalledWith(data.password);
    expect(jwtTokenService.checkToken).toHaveBeenCalledWith(
      data.key,
      envs.jwtSecretChangePassword,
    );
    expect(userRepository.updatePassword).toHaveBeenCalledWith('1', 'hash');
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdatePasswordUserUseCase',
      'User not found, please check the information',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return a success message if user updated', async () => {
    (bcryptService.hash as jest.Mock).mockResolvedValue('hash');
    (jwtTokenService.checkToken as jest.Mock).mockReturnValue({ id: '1' });
    (userRepository.updatePassword as jest.Mock).mockResolvedValue(true);

    await expect(
      putUpdatePasswordUserUseCase.updatePassword(data),
    ).resolves.toBe('User password updated successfully');
    expect(bcryptService.hash).toHaveBeenCalledWith(data.password);
    expect(jwtTokenService.checkToken).toHaveBeenCalledWith(
      data.key,
      envs.jwtSecretChangePassword,
    );
    expect(userRepository.updatePassword).toHaveBeenCalledWith('1', 'hash');
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'PutUpdatePasswordUserUseCase',
      'User password updated successfully',
    );
  });
});
