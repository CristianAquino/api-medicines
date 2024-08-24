import { IBcryptService } from '../../src/common/adapters';
import { ILogger } from '../../src/common/logger/logger.interface';
import { ISeedRepository } from '../../src/user/domain/repositories';
import { AddAdminUserUseCase } from '../../src/user/usecases';

describe('Test add admin usecase', () => {
  let addAdminUserUseCase: AddAdminUserUseCase;
  let logger: ILogger;
  let bcryptService: IBcryptService;
  let userRepository: ISeedRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    bcryptService = {} as IBcryptService;
    bcryptService.hash = jest.fn();
    bcryptService.compare = jest.fn();

    userRepository = {} as ISeedRepository;
    userRepository.addAdminUser = jest.fn();
    userRepository.verifyIsExistingAdminUser = jest.fn();

    addAdminUserUseCase = new AddAdminUserUseCase(
      logger,
      userRepository,
      bcryptService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addAdminUserUseCase).toBeDefined();
  });

  it('should create an admin user if not exists', async () => {
    (userRepository.verifyIsExistingAdminUser as jest.Mock).mockResolvedValue(
      Promise.resolve(false),
    );
    (bcryptService.hash as jest.Mock).mockReturnValue(
      Promise.resolve('admin1234'),
    );

    await expect(addAdminUserUseCase.execute()).resolves.toBeUndefined();
    expect(userRepository.verifyIsExistingAdminUser).toHaveBeenCalledWith(
      'admin',
    );
    expect(bcryptService.hash).toHaveBeenCalledWith('admin1234');
    expect(userRepository.addAdminUser).toHaveBeenCalledWith(
      'admin',
      'admin1234',
    );
    expect(logger.log).toHaveBeenCalledWith(
      'AddAdminUser',
      'Admin user created successfully.',
    );
  });

  it('should not create an admin user if already exists', async () => {
    (userRepository.verifyIsExistingAdminUser as jest.Mock).mockResolvedValue(
      true,
    );

    await expect(addAdminUserUseCase.execute()).resolves.toBeUndefined();
    expect(userRepository.verifyIsExistingAdminUser).toHaveBeenCalledWith(
      'admin',
    );
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(userRepository.addAdminUser).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'AddAdminUser',
      'Admin user already exists.',
    );
  });
});
