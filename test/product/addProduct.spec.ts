import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { ILogger } from '../../src/common/logger/logger.interface';
import { IProductRepository } from '../../src/product/domain/repositories/productRepository.interface';
import { AddProductUseCase } from '../../src/product/usecases';

describe('Test add product usecase', () => {
  let addProductUseCase: AddProductUseCase;
  let logger: ILogger;
  let productRepository: IProductRepository;
  let categoryRepository: ICategoryRepository;

  const category = {
    id: 1,
    name: 'tablest',
  };
  const product = {
    name: 'new product',
    category: 1,
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    productRepository = {} as IProductRepository;
    productRepository.addProduct = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findCategoryById = jest.fn();

    addProductUseCase = new AddProductUseCase(
      logger,
      productRepository,
      categoryRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addProductUseCase).toBeDefined();
  });

  it('should return an error if the category product not exists', async () => {
    (categoryRepository.findCategoryById as jest.Mock).mockResolvedValue(
      Promise.resolve(null),
    );

    await expect(addProductUseCase.execute(product)).rejects.toThrow(
      'Invalid category or does not exist',
    );
    expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(
      product.category,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'AddProductUseCase',
      'Invalid category or does not exist',
    );
    expect(productRepository.addProduct).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should add a new product', async () => {
    (categoryRepository.findCategoryById as jest.Mock).mockResolvedValue(
      Promise.resolve(category),
    );
    (productRepository.addProduct as jest.Mock).mockResolvedValue(
      Promise.resolve({ id: 1, name: product.name, category }),
    );

    await expect(addProductUseCase.execute(product)).resolves.toEqual(
      `New product ${product.name} have been added`,
    );
    expect(categoryRepository.findCategoryById).toHaveBeenCalledWith(
      product.category,
    );
    expect(productRepository.addProduct).toHaveBeenCalledWith({
      name: product.name,
      category,
    });
    expect(logger.log).toHaveBeenCalledWith(
      'AddProductUseCase',
      `New product ${product.name} have been added`,
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
