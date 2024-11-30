import { ILogger } from '../../src/common/logger/logger.interface';
import { IUserRepository } from '../../src/user/domain/repositories';
import { PutUpdateDataUserByAdminUseCase } from '../../src/user/usecases';

describe('Test put update data user by admin', () => {
  let putUpdateDataUserByAdminUseCase: PutUpdateDataUserByAdminUseCase;
  let logger: ILogger;
  let userRepository: IUserRepository;

  const updated = {
    id: 1,
    username: 'test',
    role: 'admin',
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    userRepository = {} as IUserRepository;
    userRepository.findById = jest.fn();
    userRepository.updateContentToAdmin = jest.fn();

    putUpdateDataUserByAdminUseCase = new PutUpdateDataUserByAdminUseCase(
      logger,
      userRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(putUpdateDataUserByAdminUseCase).toBeDefined();
  });

  it('should return a warning message if user not found', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      putUpdateDataUserByAdminUseCase.execute(updated),
    ).rejects.toThrow('User not found, please check the information');

    expect(userRepository.findById).toHaveBeenCalledWith(updated.id);
    expect(userRepository.updateContentToAdmin).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataUserByAdminUseCase',
      'User not found, please check the information',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return a warning message if not user updated', async () => {
    (userRepository.findById as jest.Mock).mockResolvedValue({
      username: 'lorem',
    });
    (userRepository.updateContentToAdmin as jest.Mock).mockResolvedValue(0);

    await expect(
      putUpdateDataUserByAdminUseCase.execute(updated),
    ).rejects.toThrow('User not found, please check the information');

    expect(userRepository.findById).toHaveBeenCalledWith(updated.id);
    expect(userRepository.updateContentToAdmin).toHaveBeenCalledWith(updated);
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataUserByAdminUseCase',
      'User not found, please check the information',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return a success message if user updated', async () => {
    const user = {
      username: 'lorem',
      role: 'admin',
    };
    (userRepository.findById as jest.Mock).mockResolvedValue(user);
    (userRepository.updateContentToAdmin as jest.Mock).mockResolvedValue(1);

    await expect(
      putUpdateDataUserByAdminUseCase.execute(updated),
    ).resolves.toBe(
      `The role for user ${user.username} has been successfully updated to ${user.role}`,
    );

    expect(userRepository.findById).toHaveBeenCalledWith(updated.id);
    expect(userRepository.updateContentToAdmin).toHaveBeenCalledWith(updated);
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'PutUpdateDataUserByAdminUseCase',
      `The role for user ${user.username} has been successfully updated to ${user.role}`,
    );
  });
});
