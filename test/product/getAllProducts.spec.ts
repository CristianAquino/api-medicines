import { ILogger } from '../../src/common/logger/logger.interface';
import { IProductRepository } from '../../src/product/domain/repositories/productRepository.interface';
import { GetAllProductsUseCase } from '../../src/product/usecases';

describe('Test get all products usecase', () => {
  let getAllProductsUseCase: GetAllProductsUseCase;
  let logger: ILogger;
  let productRepository: IProductRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    productRepository = {} as IProductRepository;
    productRepository.getAllProducts = jest.fn();

    getAllProductsUseCase = new GetAllProductsUseCase(
      logger,
      productRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getAllProductsUseCase).toBeDefined();
  });

  it('should return a warning message if not products', async () => {
    (productRepository.getAllProducts as jest.Mock).mockResolvedValue([]);

    await expect(getAllProductsUseCase.execute()).rejects.toThrow(
      'Products not found',
    );
    expect(productRepository.getAllProducts).toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(
      'GetAllProductsUseCase execute',
      'Products not found',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return all products', async () => {
    const products = [
      {
        id: '1',
        name: 'Product 1',
      },
      {
        id: '2',
        name: 'Product 2',
      },
    ];
    (productRepository.getAllProducts as jest.Mock).mockResolvedValue(products);

    await expect(getAllProductsUseCase.execute()).resolves.toEqual(products);

    expect(productRepository.getAllProducts).toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllProductsUseCase execute',
      'Return all products',
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
