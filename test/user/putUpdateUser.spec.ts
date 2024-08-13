import { IBcryptService } from '../../src/common/adapters';
import { ILogger } from '../../src/common/logger/logger.interface';
import { IUserRepository } from '../../src/user/domain/repositories';
import { PutUpdateDataUserUseCase } from '../../src/user/usecases';

describe('Test put update data user', () => {
  let putUpdateDataUserUseCase: PutUpdateDataUserUseCase;
  let logger: ILogger;
  let bcryptService: IBcryptService;
  let userRepository: IUserRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    bcryptService = {} as IBcryptService;
    bcryptService.hash = jest.fn();

    userRepository = {} as IUserRepository;
    userRepository.updateContentByUser = jest.fn();

    putUpdateDataUserUseCase = new PutUpdateDataUserUseCase(
      logger,
      userRepository,
      bcryptService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(putUpdateDataUserUseCase).toBeDefined();
  });

  it('should return a warning message if not user updated', async () => {
    const updated = {
      id: 1,
      username: 'test',
    };
    (userRepository.updateContentByUser as jest.Mock).mockResolvedValue(0);

    await expect(putUpdateDataUserUseCase.execute(updated)).rejects.toThrow(
      'User not found, please check the information',
    );
    expect(userRepository.updateContentByUser).toHaveBeenCalledWith(updated);
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataUserUseCase',
      'User not found, please check the information',
    );
  });

  it('should return a success message if user updated', async () => {
    const updated = {
      id: 1,
      username: 'test',
    };
    (userRepository.updateContentByUser as jest.Mock).mockResolvedValue(1);

    await expect(putUpdateDataUserUseCase.execute(updated)).resolves.toBe(
      'User updated successfully',
    );
    expect(userRepository.updateContentByUser).toHaveBeenCalledWith(updated);
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'PutUpdateDataUserUseCase',
      'User updated successfully',
    );
  });

  it('should return a success message if user updated with password', async () => {
    const updated = {
      id: 1,
      password: 'newpassword1234',
    };
    (userRepository.updateContentByUser as jest.Mock).mockResolvedValue(1);
    (bcryptService.hash as jest.Mock).mockResolvedValue('newpassword1234');

    await expect(putUpdateDataUserUseCase.execute(updated)).resolves.toBe(
      'User updated successfully',
    );
    expect(userRepository.updateContentByUser).toHaveBeenCalledWith(updated);
    expect(bcryptService.hash).toHaveBeenCalledWith(updated.password);
    expect(logger.log).toHaveBeenCalledWith(
      'PutUpdateDataUserUseCase',
      'User updated successfully',
    );
  });
});
