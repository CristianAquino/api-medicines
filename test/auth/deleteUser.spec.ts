import { ILogger } from '../../src/common/logger/logger.interface';
import { IUserRepository } from '../../src/user/domain/repositories/userRepository.interface';
import { DeleteUserUseCase } from '../../src/user/usecases/deleteUser.usecase';

describe('Test delete user usecase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let logger: ILogger;
  let userRepository: IUserRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    userRepository = {} as IUserRepository;
    userRepository.deleteById = jest.fn();

    deleteUserUseCase = new DeleteUserUseCase(logger, userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteUserUseCase).toBeDefined();
  });

  it('should return a warning message if the id does not exist', async () => {
    const id = '';
    (userRepository.deleteById as jest.Mock).mockResolvedValue(
      Promise.resolve(0),
    );

    await expect(deleteUserUseCase.execute(id)).rejects.toThrow(
      'User not found, please check the information',
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'DeleteUserUseCase execute',
      'User not found, please check the information',
    );
  });

  it('should return a success message if the id exist', async () => {
    const id = '1';
    (userRepository.deleteById as jest.Mock).mockResolvedValue(
      Promise.resolve(1),
    );

    await expect(deleteUserUseCase.execute(id)).resolves.toBe(
      `User ${id} have been deleted`,
    );
    expect(logger.log).toHaveBeenCalledWith(
      'DeleteUserUseCase execute',
      `User ${id} have been deleted`,
    );
  });
});
