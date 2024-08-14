import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { AddCategoryUseCase } from '../../src/category/usecases';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test add category usecase', () => {
  let addCategoryUseCase: AddCategoryUseCase;
  let logger: ILogger;
  let categoryRepository: ICategoryRepository;

  const newCategory = {
    id: 1,
    category: 'toys',
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findByCategoryName = jest.fn();
    categoryRepository.insert = jest.fn();

    addCategoryUseCase = new AddCategoryUseCase(logger, categoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addCategoryUseCase).toBeDefined();
  });
  it('should return an error if the category already exists', async () => {
    (categoryRepository.findByCategoryName as jest.Mock).mockReturnValue(
      Promise.resolve({
        id: 1,
        category: 'toys',
      }),
    );
    await expect(addCategoryUseCase.execute(newCategory)).rejects.toThrow(
      'Category already exists',
    );
    expect(categoryRepository.findByCategoryName).toHaveBeenCalledWith(
      newCategory.category,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'AddCategoryUseCase',
      `The category ${newCategory.category} already exists`,
    );
    expect(categoryRepository.insert).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should add a new category', async () => {
    (categoryRepository.findByCategoryName as jest.Mock).mockReturnValue(
      Promise.resolve(null),
    );

    await expect(addCategoryUseCase.execute(newCategory)).resolves.toBe(
      'New category have been added',
    );
    expect(categoryRepository.findByCategoryName).toHaveBeenCalledWith(
      newCategory.category,
    );
    expect(categoryRepository.insert).toHaveBeenCalledWith(newCategory);
    expect(logger.log).toHaveBeenCalledWith(
      'AddCategoryUseCase execute',
      'New category have been added',
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
