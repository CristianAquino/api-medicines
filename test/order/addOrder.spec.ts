import { ILogger } from '../../src/common/logger/logger.interface';
import { IOrderRepository } from '../../src/order/domain/repositories/orderRepository.interface';
import { AddOrderUseCase } from '../../src/order/usecases';
import { IProductRepository } from '../../src/product/domain/repositories/productRepository.interface';

describe('Test Add Order usecase', () => {
  let addOrderUseCase: AddOrderUseCase;
  let logger: ILogger;
  let productRepository: IProductRepository;
  let orderRepository: IOrderRepository;

  const orders = [
    {
      productId: 1,
      quantity: 20,
    },
  ];

  const response = {
    id: 1,
    name: 'Product 1',
    unit_price: 100,
    stock: 10,
  };

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();

    productRepository = {} as IProductRepository;
    productRepository.findById = jest.fn();
    productRepository.updateProduct = jest.fn();

    orderRepository = {} as IOrderRepository;
    orderRepository.createOrder = jest.fn();

    addOrderUseCase = new AddOrderUseCase(
      logger,
      productRepository,
      orderRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addOrderUseCase).toBeDefined();
  });

  it('should return an error if there are no orders', async () => {
    const orders = [];
    await expect(addOrderUseCase.execute(orders)).rejects.toThrow(
      'Datos is empty',
    );
    expect(logger.warn).toBeCalledWith('AddOrderUseCase', 'Datos is empty');
    expect(productRepository.findById).not.toBeCalled();
    expect(logger.error).not.toBeCalled();
    expect(productRepository.updateProduct).not.toBeCalled();
    expect(orderRepository.createOrder).not.toBeCalled();
  });

  it('should return an error if the product was not found', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue(null);
    await expect(addOrderUseCase.execute(orders)).rejects.toThrow(
      'The product not exists',
    );
    expect(logger.warn).not.toBeCalled();
    expect(productRepository.findById).toBeCalled();
    expect(logger.error).toBeCalledWith(
      'AddOrderUseCase',
      'The product not exists',
    );
    expect(productRepository.updateProduct).not.toBeCalled();
    expect(orderRepository.createOrder).not.toBeCalled();
  });

  it('should return an error if the product is not available', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue(response);

    await expect(addOrderUseCase.execute(orders)).rejects.toThrow(
      `The product ${response.name} is not available`,
    );
    expect(logger.warn).not.toBeCalled();
    expect(productRepository.findById).toBeCalled();
    expect(logger.error).toBeCalledWith(
      'AddOrderUseCase',
      `The product ${response.name} is not available`,
    );
    expect(productRepository.updateProduct).not.toBeCalled();
    expect(orderRepository.createOrder).not.toBeCalled();
  });

  it('should return an error if the requested quantity is not adequate', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue({
      ...response,
      available: true,
    });

    await expect(addOrderUseCase.execute(orders)).rejects.toThrow(
      `The quantity of product ${response.name} in ${orders[0].quantity} is greater than the stock ${response.stock}`,
    );
    expect(logger.warn).not.toBeCalled();
    expect(productRepository.findById).toBeCalled();
    expect(logger.error).toBeCalledWith(
      'AddOrderUseCase',
      `The quantity of product ${response.name} in ${orders[0].quantity} is greater than the stock ${response.stock}`,
    );
    expect(productRepository.updateProduct).not.toBeCalled();
    expect(orderRepository.createOrder).not.toBeCalled();
  });

  it('should return an error if the total cost does not match', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue({
      ...response,
      available: true,
    });

    await expect(
      addOrderUseCase.execute([{ id: 1, quantity: 5 }]),
    ).rejects.toThrow(`The total of product ${response.name} is incorrect`);
    expect(logger.warn).not.toBeCalled();
    expect(productRepository.findById).toBeCalled();
    expect(logger.error).toBeCalledWith(
      'AddOrderUseCase',
      `The total of product ${response.name} is incorrect`,
    );
    expect(productRepository.updateProduct).not.toBeCalled();
    expect(orderRepository.createOrder).not.toBeCalled();
  });

  it('should create an order', async () => {
    (productRepository.findById as jest.Mock).mockResolvedValue({
      ...response,
      available: true,
    });
    (orderRepository.createOrder as jest.Mock).mockResolvedValue(1);

    await expect(
      addOrderUseCase.execute([{ id: 1, quantity: 5, total: 500 }]),
    ).resolves.toBeDefined();
    expect(logger.warn).not.toBeCalled();
    expect(productRepository.findById).toBeCalled();
    expect(logger.error).not.toBeCalled();
    expect(productRepository.updateProduct).toBeCalled();
    expect(orderRepository.createOrder).toBeCalled();
    expect(logger.log).toBeCalledWith(
      'AddOrderUseCase',
      'Orders have been added',
    );
  });
});
