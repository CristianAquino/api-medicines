import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { PutUpdateDataCategoryUseCase } from '../../src/category/usecases';
import { ILogger } from '../../src/common/logger/logger.interface';

describe('Test put update data category usecase', () => {
  let putUpdateDataCategoryUseCase: PutUpdateDataCategoryUseCase;
  let logger: ILogger;
  let categoryRepository: ICategoryRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findCategoryById = jest.fn();
    categoryRepository.updateCategory = jest.fn();

    putUpdateDataCategoryUseCase = new PutUpdateDataCategoryUseCase(
      logger,
      categoryRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(putUpdateDataCategoryUseCase).toBeDefined();
  });

  it('should return a warning message if not category updated', async () => {
    const updated = {
      id: 1,
      category: 'toys1',
    };
    (categoryRepository.findCategoryById as jest.Mock).mockResolvedValue(null);

    await expect(putUpdateDataCategoryUseCase.execute(updated)).rejects.toThrow(
      'Category not found, please check the information',
    );
    expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(
      updated.id,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataCategoryUseCase',
      'Category not found, please check the information',
    );
    expect(categoryRepository.updateCategory).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return a warning message if category name already exists', async () => {
    const updated = {
      id: 1,
      category: 'toys1',
    };
    (categoryRepository.findCategoryById as jest.Mock).mockResolvedValue(
      updated,
    );

    await expect(putUpdateDataCategoryUseCase.execute(updated)).rejects.toThrow(
      `The category ${updated.category} already exists`,
    );
    expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(
      updated.id,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataCategoryUseCase',
      `The category ${updated.category} already exists`,
    );
    expect(categoryRepository.updateCategory).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return a success message if category updated', async () => {
    const updated = {
      id: 1,
      category: 'toys1',
    };
    const data = {
      ...updated,
      category: 'toys2',
    };
    (categoryRepository.findCategoryById as jest.Mock).mockResolvedValue(data);
    (categoryRepository.updateCategory as jest.Mock).mockResolvedValue(updated);
    await expect(
      putUpdateDataCategoryUseCase.execute(updated),
    ).resolves.toEqual(
      `The ${data.category} category has been updated to ${updated.category}`,
    );
    expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(
      updated.id,
    );
    expect(logger.warn).not.toHaveBeenCalled();
    expect(categoryRepository.updateCategory).toHaveBeenCalledWith(updated);
    expect(logger.log).toHaveBeenCalledWith(
      'PutUpdateDataCategoryUseCase',
      `The ${data.category} category has been updated to ${updated.category}`,
    );
  });
});
