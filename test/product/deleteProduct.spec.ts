import { ILogger } from '../../src/common/logger/logger.interface';
import { IProductRepository } from '../../src/product/domain/repositories/productRepository.interface';
import { DeleteProductUseCase } from '../../src/product/usecases';

describe('Test delect product usecase', () => {
  let deleteProductUseCase: DeleteProductUseCase;
  let logger: ILogger;
  let productRepository: IProductRepository;

  const productID = '1';

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    productRepository = {} as IProductRepository;
    productRepository.deleteById = jest.fn();

    deleteProductUseCase = new DeleteProductUseCase(logger, productRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteProductUseCase).toBeDefined();
  });

  it('should return a warning message if the id does not exist', async () => {
    (productRepository.deleteById as jest.Mock).mockResolvedValue(
      Promise.resolve(0),
    );

    await expect(deleteProductUseCase.execute(productID)).rejects.toThrow(
      'Producty not found, please check the information',
    );
    expect(productRepository.deleteById).toHaveBeenCalledWith(productID);
    expect(logger.warn).toHaveBeenCalledWith(
      'DeleteProductUseCase',
      'Product not found, please check the information',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return a success message if the category is deleted', async () => {
    (productRepository.deleteById as jest.Mock).mockResolvedValue(
      Promise.resolve(1),
    );

    await expect(deleteProductUseCase.execute(productID)).resolves.toBe(
      `Product ${productID} have been deleted`,
    );
    expect(productRepository.deleteById).toHaveBeenCalledWith(productID);
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'DeleteProductUseCase',
      `Product ${productID} have been deleted`,
    );
  });
});
