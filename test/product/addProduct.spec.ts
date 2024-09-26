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
    productRepository.addProduct = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findCategoryByName = jest.fn();

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
    (categoryRepository.findCategoryByName as jest.Mock).mockResolvedValue(
      Promise.resolve(null),
    );

    await expect(addProductUseCase.execute(product)).rejects.toThrow(
      `The category ${product.category} not exists`,
    );
    expect(categoryRepository.findCategoryByName).toHaveBeenCalledWith(
      product.category,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'AddProductUseCase',
      `The category ${product.category} not exists`,
    );
    expect(productRepository.addProduct).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should add a new product', async () => {
    (categoryRepository.findCategoryByName as jest.Mock).mockResolvedValue(
      Promise.resolve(product.category),
    );
    (productRepository.addProduct as jest.Mock).mockResolvedValue(
      Promise.resolve({ id: 1, ...product }),
    );

    await expect(addProductUseCase.execute(product)).resolves.toEqual(
      `New product ${product.name} have been added`,
    );
    expect(categoryRepository.findCategoryByName).toHaveBeenCalledWith(
      product.category,
    );
    expect(productRepository.addProduct).toHaveBeenCalledWith(product);
    expect(logger.log).toHaveBeenCalledWith(
      'AddProductUseCase',
      `New product ${product.name} have been added`,
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
