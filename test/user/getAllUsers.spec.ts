import { ILogger } from '../../src/common/logger/logger.interface';
import { IUserRepository } from '../../src/user/domain/repositories';
import { FindAllUsersDTO } from '../../src/user/infrastructure/controller/dto';
import { Role } from '../../src/user/infrastructure/controller/enum/user.enum';
import { GetAllUsersUseCase } from '../../src/user/usecases/getAllUsers.usecase';

describe('Test get all users usecase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;
  let logger: ILogger;
  let userRepository: IUserRepository;

  const users = [
    { id: 'string1', username: 'lorem', role: 'user' },
    { id: 'string2', username: 'admin', role: 'admin' },
  ];

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    userRepository = {} as IUserRepository;
    userRepository.findAll = jest.fn();

    getAllUsersUseCase = new GetAllUsersUseCase(logger, userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getAllUsersUseCase).toBeDefined();
  });

  it('should return a warning message if not users', async () => {
    const findAllUsersByUsernameDTO: FindAllUsersDTO = {
      page: 1,
      limit: 10,
    };
    const allUsers = { data: [], meta: { total: 0 } };
    (userRepository.findAll as jest.Mock).mockResolvedValue(allUsers);

    await expect(
      getAllUsersUseCase.execute(findAllUsersByUsernameDTO),
    ).rejects.toThrow('Users not found');
    expect(userRepository.findAll).toHaveBeenCalledWith(
      findAllUsersByUsernameDTO,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'GetAllUsersUseCase execute',
      'No found users',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return all users', async () => {
    const findAllUsersByUsernameDTO: FindAllUsersDTO = {
      page: 1,
      limit: 10,
    };
    const allUsers = {
      data: users,
      meta: { total: users.length },
    };
    (userRepository.findAll as jest.Mock).mockResolvedValue(allUsers);

    await expect(
      getAllUsersUseCase.execute(findAllUsersByUsernameDTO),
    ).resolves.toBe(allUsers);
    expect(userRepository.findAll).toHaveBeenCalledWith(
      findAllUsersByUsernameDTO,
    );
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllUserUseCase execute',
      'Return all users finds',
    );
  });

  it('should return all users with username = "lorem"', async () => {
    const findAllUsersByUsernameDTO: FindAllUsersDTO = {
      username: 'lorem',
      page: 1,
      limit: 10,
    };
    const allUsers = {
      data: users.filter(
        (ele) => ele.username == findAllUsersByUsernameDTO.username,
      ),
      meta: { total: users.length },
    };
    (userRepository.findAll as jest.Mock).mockResolvedValue(allUsers);

    await expect(
      getAllUsersUseCase.execute(findAllUsersByUsernameDTO),
    ).resolves.toBe(allUsers);
    expect(userRepository.findAll).toHaveBeenCalledWith(
      findAllUsersByUsernameDTO,
    );
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllUserUseCase execute',
      'Return all users finds',
    );
  });

  it('should return all users with role = "user"', async () => {
    const findAllUsersByUsernameDTO: FindAllUsersDTO = {
      role: Role.USER,
      page: 1,
      limit: 10,
    };
    const allUsers = {
      data: users.map((ele) => ele.role == findAllUsersByUsernameDTO.role),
      meta: {
        total: users.filter((ele) => ele.role == findAllUsersByUsernameDTO.role)
          .length,
      },
    };

    (userRepository.findAll as jest.Mock).mockResolvedValue(allUsers);

    await expect(
      getAllUsersUseCase.execute(findAllUsersByUsernameDTO),
    ).resolves.toBe(allUsers);
    expect(userRepository.findAll).toHaveBeenCalledWith(
      findAllUsersByUsernameDTO,
    );
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllUserUseCase execute',
      'Return all users finds',
    );
  });
});
