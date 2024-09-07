import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { GetAllCategoriesUseCase } from '../../src/category/usecases';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test get all categories usecases', () => {
  let getAllCategoriesUseCase: GetAllCategoriesUseCase;
  let logger: ILogger;
  let categoryRepository: ICategoryRepository;

  const category = 'toy';

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findAllCategories = jest.fn();

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
    (categoryRepository.findAllCategories as jest.Mock).mockResolvedValue(null);

    await expect(getAllCategoriesUseCase.execute(category)).rejects.toThrow(
      'Categories not found',
    );
    expect(categoryRepository.findAllCategories).toHaveBeenCalledWith(category);
    expect(logger.warn).toHaveBeenCalledWith(
      'GetAllCategoriesUseCase',
      'Categories not found',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return all categories', async () => {
    const result = [{ id: 1, category: 'toy' }];
    (categoryRepository.findAllCategories as jest.Mock).mockResolvedValue(
      result,
    );

    await expect(getAllCategoriesUseCase.execute(category)).resolves.toEqual(
      result,
    );
    expect(categoryRepository.findAllCategories).toHaveBeenCalledWith(category);
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllCategoriesUseCase',
      'Return all categories',
    );
  });
});
