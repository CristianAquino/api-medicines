import { IUserRepository } from '../../src/auth/domain/repositories/userRepository.interface';
import { Role } from '../../src/auth/infrastructure/controller/enum/user.enum';
import { AddUserDTO } from '../../src/auth/infrastructure/controller/user.dto';
import { AddUserUseCase } from '../../src/auth/usecases/addUser.usecase';
import { IBcryptService } from '../../src/common/adapters/bcrypt.interface';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test add user usecase', () => {
  let addUserUseCase: AddUserUseCase;
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
    userRepository.insert = jest.fn();
    userRepository.findOneByName = jest.fn();

    addUserUseCase = new AddUserUseCase(logger, userRepository, bcryptService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addUserUseCase).toBeDefined();
  });

  it('should return an error if the user already exists', async () => {
    const addUseDTO: AddUserDTO = {
      username: 'user',
      password: 'user1234',
      role: Role.USER,
    };

    (userRepository.findOneByName as jest.Mock).mockResolvedValue(
      Promise.resolve(addUseDTO),
    );

    await expect(addUserUseCase.execute(addUseDTO)).rejects.toThrow(
      'User already exists',
    );
    expect(userRepository.findOneByName).toHaveBeenCalledWith(
      addUseDTO.username,
    );
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(userRepository.insert).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      'addUserUseCase execute',
      'User already exists',
    );
  });

  it('should insert a new user if the user does not exist', async () => {
    const addUseDTO: AddUserDTO = {
      username: 'user',
      password: 'user1234',
      role: Role.USER,
    };

    (userRepository.findOneByName as jest.Mock).mockResolvedValue(
      Promise.resolve(null),
    );
    (bcryptService.hash as jest.Mock).mockResolvedValue(
      Promise.resolve('hashedPassword'),
    );

    await addUserUseCase.execute(addUseDTO);

    expect(userRepository.findOneByName).toHaveBeenCalledWith(
      addUseDTO.username,
    );
    expect(bcryptService.hash).toHaveBeenCalledWith(addUseDTO.password);
    expect(userRepository.insert).toHaveBeenCalledWith({
      ...addUseDTO,
      password: 'hashedPassword',
    });
    expect(logger.log).toHaveBeenCalledWith(
      'addUserUseCase execute',
      'New user have been inserted',
    );
  });
});
