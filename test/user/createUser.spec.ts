import { IBcryptService } from '../../src/common/adapters';
import { ILogger } from '../../src/common/logger/logger.interface';
import { IUserRepository } from '../../src/user/domain/repositories';
import { CreateUserDTO } from '../../src/user/infrastructure/controller/dto';
import { Role } from '../../src/user/infrastructure/controller/enum/user.enum';
import { CreateUserUseCase } from '../../src/user/usecases';

describe('Test add user usecase', () => {
  let createUserUseCase: CreateUserUseCase;
  let logger: ILogger;
  let bcryptService: IBcryptService;
  let userRepository: IUserRepository;

  const createUserDTO: CreateUserDTO = {
    username: 'lorem',
    role: Role.USER,
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    bcryptService = {} as IBcryptService;
    bcryptService.hash = jest.fn();

    userRepository = {} as IUserRepository;
    userRepository.createUser = jest.fn();
    userRepository.findOneByName = jest.fn();

    createUserUseCase = new CreateUserUseCase(
      logger,
      userRepository,
      bcryptService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should return an error if the user already exists', async () => {
    (userRepository.findOneByName as jest.Mock).mockResolvedValue(
      Promise.resolve(createUserDTO),
    );

    await expect(createUserUseCase.execute(createUserDTO)).rejects.toThrow(
      `User ${createUserDTO.username} already exists`,
    );
    expect(userRepository.findOneByName).toHaveBeenCalledWith(
      createUserDTO.username,
    );
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(userRepository.createUser).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      'CreateUserUseCase',
      `User ${createUserDTO.username} already exists`,
    );
  });

  it('should insert a new user if the user does not exist', async () => {
    const hasedPassword = 'hashedPassword';

    (userRepository.findOneByName as jest.Mock).mockResolvedValue(
      Promise.resolve(null),
    );
    (bcryptService.hash as jest.Mock).mockResolvedValue(
      Promise.resolve(hasedPassword),
    );

    await expect(createUserUseCase.execute(createUserDTO)).resolves.toBe(
      `New user ${createUserDTO.username} have been created successfully, his password is ${createUserDTO.username}1234`,
    );

    expect(userRepository.findOneByName).toHaveBeenCalledWith(
      createUserDTO.username,
    );
    expect(bcryptService.hash).toHaveBeenCalledWith(
      `${createUserDTO.username}1234`,
    );
    expect(userRepository.createUser).toHaveBeenCalledWith({
      ...createUserDTO,
      password: hasedPassword,
    });
    expect(logger.log).toHaveBeenCalledWith(
      'CreateUserUseCase',
      `New user ${createUserDTO.username} have been created successfully, his password is ${createUserDTO.username}1234`,
    );
  });
});
