import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { CreateCategoryUseCase } from '../../src/category/usecases';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test create category usecase', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let logger: ILogger;
  let categoryRepository: ICategoryRepository;

  const newCategory = {
    category: 'toys',
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findCategoryByName = jest.fn();
    categoryRepository.createCategory = jest.fn();

    createCategoryUseCase = new CreateCategoryUseCase(
      logger,
      categoryRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(createCategoryUseCase).toBeDefined();
  });
  it('should return an error if the category already exists', async () => {
    (categoryRepository.findCategoryByName as jest.Mock).mockReturnValue(
      Promise.resolve({
        id: 1,
        category: 'toys',
      }),
    );

    await expect(createCategoryUseCase.execute(newCategory)).rejects.toThrow(
      'Category already exists',
    );
    expect(categoryRepository.findCategoryByName).toHaveBeenCalledWith(
      newCategory.category,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'CreateCategoryUseCase',
      `The category ${newCategory.category} already exists`,
    );
    expect(categoryRepository.createCategory).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should add a new category', async () => {
    (categoryRepository.findCategoryByName as jest.Mock).mockReturnValue(
      Promise.resolve(null),
    );

    await expect(createCategoryUseCase.execute(newCategory)).resolves.toBe(
      'New category have been added',
    );
    expect(categoryRepository.findCategoryByName).toHaveBeenCalledWith(
      newCategory.category,
    );
    expect(categoryRepository.createCategory).toHaveBeenCalledWith(newCategory);
    expect(logger.log).toHaveBeenCalledWith(
      'CreateCategoryUseCase execute',
      'New category have been added',
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
