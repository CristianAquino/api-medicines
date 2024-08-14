import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { DeleteCategoryUseCase } from '../../src/category/usecases';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test delete category usecase', () => {
  let deleteCategoryUseCase: DeleteCategoryUseCase;
  let logger: ILogger;
  let categoryRepository: ICategoryRepository;

  const categoryId = 1;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.deleteById = jest.fn();

    deleteCategoryUseCase = new DeleteCategoryUseCase(
      logger,
      categoryRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteCategoryUseCase).toBeDefined();
  });

  it('should return a warning message if the id does not exist', async () => {
    (categoryRepository.deleteById as jest.Mock).mockReturnValueOnce(
      Promise.resolve(0),
    );
    await expect(deleteCategoryUseCase.execute(categoryId)).rejects.toThrow(
      'Category not found, please check the information',
    );

    expect(categoryRepository.deleteById).toHaveBeenCalledWith(categoryId);
    expect(logger.warn).toHaveBeenCalledWith(
      'DeleteCategoryUseCase execute',
      'Category not found, please check the information',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return a success message if the category is deleted', async () => {
    (categoryRepository.deleteById as jest.Mock).mockReturnValueOnce(
      Promise.resolve(1),
    );
    await expect(deleteCategoryUseCase.execute(categoryId)).resolves.toBe(
      `Category ${categoryId} have been deleted`,
    );

    expect(categoryRepository.deleteById).toHaveBeenCalledWith(categoryId);
    expect(logger.log).toHaveBeenCalledWith(
      'DeleteCategoryUseCase execute',
      `Category ${categoryId} have been deleted`,
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
