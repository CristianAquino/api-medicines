import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { ILogger } from '../../src/common/logger/logger.interface';
import { IProductRepository } from '../../src/product/domain/repositories/productRepository.interface';
import { AddProductUseCase } from '../../src/product/usecases';

describe('Test add product usecase', () => {
  let addProductUseCase: AddProductUseCase;
  let logger: ILogger;
  let productRepository: IProductRepository;
  let categoryRepository: ICategoryRepository;

  const product = {
    name: 'nwe product',
    category: 'toys',
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    productRepository = {} as IProductRepository;
    productRepository.createProduct = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findByCategoryName = jest.fn();

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
    (categoryRepository.findByCategoryName as jest.Mock).mockResolvedValue(
      Promise.resolve(null),
    );
    await expect(addProductUseCase.execute(product)).rejects.toThrow(
      `The category ${product.category} not exists`,
    );
    expect(categoryRepository.findByCategoryName).toHaveBeenCalledWith(
      product.category,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'AddProductUseCase',
      `The category ${product.category} not exists`,
    );
    expect(productRepository.createProduct).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should add a new product', async () => {
    (categoryRepository.findByCategoryName as jest.Mock).mockResolvedValue(
      Promise.resolve(product.category),
    );
    (productRepository.createProduct as jest.Mock).mockResolvedValue(
      Promise.resolve({ id: 1, ...product }),
    );
    await expect(addProductUseCase.execute(product)).resolves.toEqual(
      'New product have been added',
    );
    expect(categoryRepository.findByCategoryName).toHaveBeenCalledWith(
      product.category,
    );
    expect(productRepository.createProduct).toHaveBeenCalledWith(product);
    expect(logger.log).toHaveBeenCalledWith(
      'AddProductUseCase',
      'New product have been added',
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
