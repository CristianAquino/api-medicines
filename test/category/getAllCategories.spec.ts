import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { GetAllCategoriesUseCase } from '../../src/category/usecases';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test get all categories usecases', () => {
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;
  let logger: ILogger;
  let categoryRepository: ICategoryRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findAll = jest.fn();

    getAllCategoriesUseCase = new GetAllCategoriesUseCase(
      logger,
      categoryRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getAllCategoriesUseCase).toBeDefined();
  });

  it('should return a warning message if not categories', async () => {
    const result = [];
    (categoryRepository.findAll as jest.Mock).mockResolvedValue(result);

    await expect(getAllCategoriesUseCase.execute()).rejects.toThrow(
      'Categories not found',
    );
    expect(categoryRepository.findAll).toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      'GetAllCategoriesUseCase',
      'Categories not found',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return all categories', async () => {
    const result = [{ id: 1, category: 'toys' }];
    (categoryRepository.findAll as jest.Mock).mockResolvedValue(result);

    await expect(getAllCategoriesUseCase.execute()).resolves.toEqual(result);
    expect(categoryRepository.findAll).toHaveBeenCalled();
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllCategoriesUseCase execute',
      'Return all categories',
    );
  });
});
