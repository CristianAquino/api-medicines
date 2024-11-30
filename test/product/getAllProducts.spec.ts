import { ILogger } from '../../src/common/logger/logger.interface';
import { IProductRepository } from '../../src/product/domain/repositories/productRepository.interface';
import { FindAllProductsDTO } from '../../src/product/infrastructure/controller/dto';
import { GetAllProductsUseCase } from '../../src/product/usecases';

describe('Test get all products usecase', () => {
  let getAllProductsUseCase: GetAllProductsUseCase;
  let logger: ILogger;
  let productRepository: IProductRepository;

  const pagination = {
    page: 1,
    limit: 10,
  };
  const products = [
    {
      id: '1',
      name: 'medicine 1',
    },
    {
      id: '2',
      name: 'toy 1',
    },
  ];

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    productRepository = {} as IProductRepository;
    productRepository.findAllProducts = jest.fn();

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

  it('should return a logger message if not products', async () => {
    const allProducts = { data: [], meta: { total: 0 } };
    (productRepository.findAllProducts as jest.Mock).mockResolvedValue(
      allProducts,
    );

    await expect(getAllProductsUseCase.execute(pagination)).rejects.toThrow(
      'No products with that name or category have been registered yet.',
    );
    expect(productRepository.findAllProducts).toHaveBeenCalledWith(pagination);
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllProductsUseCase',
      'No products with that name or category have been registered yet.',
    );
  });

  it('should return all products', async () => {
    const allProducts = { data: products, meta: { total: products.length } };
    (productRepository.findAllProducts as jest.Mock).mockResolvedValue(
      allProducts,
    );

    await expect(getAllProductsUseCase.execute(pagination)).resolves.toEqual(
      allProducts,
    );
    expect(productRepository.findAllProducts).toHaveBeenCalledWith(pagination);
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllProductsUseCase',
      'Return all products',
    );
  });

  it('should return all products with name = "medicine"', async () => {
    const findAllProductsDTO: FindAllProductsDTO = {
      name: 'medicine',
      ...pagination,
    };
    const allProducts = {
      data: products.map((ele) =>
        ele.name.includes(findAllProductsDTO.name as string),
      ),
      meta: {
        total: products.filter((ele) =>
          ele.name.includes(findAllProductsDTO.name as string),
        ).length,
      },
    };

    (productRepository.findAllProducts as jest.Mock).mockResolvedValue(
      allProducts,
    );

    await expect(
      getAllProductsUseCase.execute(findAllProductsDTO),
    ).resolves.toBe(allProducts);
    expect(productRepository.findAllProducts).toHaveBeenCalledWith(
      findAllProductsDTO,
    );
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllProductsUseCase',
      'Return all products',
    );
  });
});
