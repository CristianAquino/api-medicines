import { ISeedRepository } from '../../src/auth/domain/repositories/seedRepository.interface';
import { InitialAdminUserUseCase } from '../../src/auth/usecases/initialAdminUser.usecase';
import { IBcryptService } from '../../src/common/adapters/bcrypt.interface';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test seedService', () => {
  let initialAdminUserUseCase: InitialAdminUserUseCase;
  let logger: ILogger;
  let bcryptService: IBcryptService;
  let userRepository: ISeedRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    bcryptService = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as IBcryptService;

    userRepository = {
      insertAdminUser: jest.fn(),
      verifyExistingAdminUser: jest.fn(),
    } as ISeedRepository;

    initialAdminUserUseCase = new InitialAdminUserUseCase(
      logger,
      userRepository,
      bcryptService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(initialAdminUserUseCase).toBeDefined();
  });

  it('should create an admin user if not exists', async () => {
    (userRepository.verifyExistingAdminUser as jest.Mock).mockResolvedValue(
      false,
    );
    (bcryptService.hash as jest.Mock).mockReturnValue(
      Promise.resolve('admin1234'),
    );
    (userRepository.insertAdminUser as jest.Mock).mockResolvedValue(
      'Admin user created successfully.',
    );

    // Ejecutar el caso de uso
    await initialAdminUserUseCase.execute();

    // Verificar que las funciones hayan sido llamadas correctamente
    expect(userRepository.verifyExistingAdminUser).toHaveBeenCalledWith(
      'admin',
    );
    expect(bcryptService.hash).toHaveBeenCalledWith('admin1234');
    expect(userRepository.insertAdminUser).toHaveBeenCalledWith(
      'admin',
      'admin1234',
    );
    expect(logger.log).toHaveBeenCalledWith(
      'InitialAdminUser',
      'Admin user created successfully.',
    );
  });
  it('should not create an admin user if already exists', async () => {
    (userRepository.verifyExistingAdminUser as jest.Mock).mockResolvedValue(
      true,
    );

    // Ejecutar el caso de uso
    await initialAdminUserUseCase.execute();

    // Verificar que las funciones hayan sido llamadas correctamente
    expect(userRepository.verifyExistingAdminUser).toHaveBeenCalledWith(
      'admin',
    );
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(userRepository.insertAdminUser).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'InitialAdminUser',
      'Admin user already exists.',
    );
  });
});
