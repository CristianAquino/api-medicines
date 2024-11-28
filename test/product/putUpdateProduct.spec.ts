import { ICategoryRepository } from '../../src/category/domain/repositories/categoryRepository.interface';
import { ILogger } from '../../src/common/logger/logger.interface';
import { IProductRepository } from '../../src/product/domain/repositories/productRepository.interface';
import { PutUpdateDataProductUseCase } from '../../src/product/usecases';

describe('Test put update data products usecase', () => {
  let putUpdateDataProductUseCase: PutUpdateDataProductUseCase;
  let logger: ILogger;
  let productRepository: IProductRepository;
  let categoryRepository: ICategoryRepository;

  const product = {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 10.0,
    category: 'Category 1',
    stock: 5,
  };
  const upProduct = {
    stock: 10,
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.warn = jest.fn();
    logger.log = jest.fn();

    productRepository = {} as IProductRepository;
    productRepository.findById = jest.fn();
    productRepository.updateProduct = jest.fn();
    productRepository.updateProductCategory = jest.fn();

    categoryRepository = {} as ICategoryRepository;
    categoryRepository.findCategoryByName = jest.fn();

    putUpdateDataProductUseCase = new PutUpdateDataProductUseCase(
      logger,
      productRepository,
      categoryRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(putUpdateDataProductUseCase).toBeDefined();
  });

  it('should return a warning message if product not found', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(putUpdateDataProductUseCase.execute(product)).rejects.toThrow(
      'Product not found, please check the information',
    );
    expect(productRepository.findById).toHaveBeenCalledWith(product.id);
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataProductUseCase',
      'Product not found, please check the information',
    );
    expect(categoryRepository.findCategoryByName).not.toHaveBeenCalled();
    expect(productRepository.updateProductCategory).not.toHaveBeenCalled();
    expect(productRepository.updateProduct).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return an error if there is a product, but the category does not exist', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue(product);
    (categoryRepository.findCategoryByName as jest.Mock).mockResolvedValue(
      null,
    );

    await expect(putUpdateDataProductUseCase.execute(product)).rejects.toThrow(
      'Category not found, please check the information',
    );
    expect(productRepository.findById).toHaveBeenCalledWith(product.id);
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataProductUseCase',
      'Category not found, please check the information',
    );
    expect(productRepository.updateProductCategory).not.toHaveBeenCalled();
    expect(productRepository.updateProduct).not.toHaveBeenCalled();
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return an error if the stock entered and the one in warehouse is less than 0', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue(product);

    await expect(
      putUpdateDataProductUseCase.execute(upProduct),
    ).rejects.toThrow('Stock cannot be negative');
    expect(logger.warn).toHaveBeenCalledWith(
      'PutUpdateDataProductUseCase',
      'Stock cannot be negative',
    );
  });

  it('should return a success message if product updated', async () => {
    const { category, ...content } = product;

    (productRepository.findById as jest.Mock).mockResolvedValue(product);
    (categoryRepository.findCategoryByName as jest.Mock).mockResolvedValue(
      category,
    );
    (productRepository.updateProduct as jest.Mock).mockResolvedValue({
      product,
    });

    await expect(putUpdateDataProductUseCase.execute(product)).resolves.toBe(
      `Product ${product.name} updated successfully`,
    );

    expect(productRepository.findById).toHaveBeenCalledWith(product.id);
    expect(categoryRepository.findCategoryByName).toHaveBeenCalledWith(
      product.category,
    );
    expect(productRepository.updateProduct).toHaveBeenCalledWith({
      ...content,
      available: false,
    });
    expect(logger.log).toHaveBeenCalledWith(
      'PutUpdateDataProductUseCase',
      `Product ${product.name} updated successfully`,
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
