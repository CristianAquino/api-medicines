import { ILogger } from '../../src/common/logger/logger.interface';
import { IUserRepository } from '../../src/user/domain/repositories';
import { PutUpdateDataUserUseCase } from '../../src/user/usecases';

describe('Test put update data user', () => {
  let putUpdateDataUserUseCase: PutUpdateDataUserUseCase;
  let logger: ILogger;
  let userRepository: IUserRepository;

  const updated = {
    id: 1,
    username: 'test',
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    userRepository = {} as IUserRepository;
    userRepository.updateContentToUser = jest.fn();

    putUpdateDataUserUseCase = new PutUpdateDataUserUseCase(
      logger,
      userRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(putUpdateDataUserUseCase).toBeDefined();
  });

  it('should return a warning message if not user updated', async () => {
    (userRepository.updateContentToUser as jest.Mock).mockResolvedValue(0);

    await expect(putUpdateDataUserUseCase.execute(updated)).rejects.toThrow(
      'User not found, please check the information',
    );
    expect(userRepository.updateContentToUser).toHaveBeenCalledWith(updated);
    expect(logger.log).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataUserUseCase',
      'User not found, please check the information',
    );
  });

  it('should return a success message if user updated', async () => {
    (userRepository.updateContentToUser as jest.Mock).mockResolvedValue(1);

    await expect(putUpdateDataUserUseCase.execute(updated)).resolves.toBe(
      'Your username has been updated successfully',
    );
    expect(userRepository.updateContentToUser).toHaveBeenCalledWith(updated);
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'PutUpdateDataUserUseCase',
      'Your username has been updated successfully',
    );
  });
});
