import { ILogger } from '../../src/common/logger/logger.interface';
import { IOrderRepository } from '../../src/order/domain/repositories/orderRepository.interface';
import { GetAllOrdersUseCase } from '../../src/order/usecases';

describe('Test get all orders usecase', () => {
  let getAllOrdersUseCase: GetAllOrdersUseCase;
  let logger: ILogger;
  let orderRepository: IOrderRepository;

  const pagination = {
    page: 1,
    limit: 10,
  };
  const orders = [
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

    orderRepository = {} as IOrderRepository;
    orderRepository.findAllOrders = jest.fn();

    getAllOrdersUseCase = new GetAllOrdersUseCase(logger, orderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getAllOrdersUseCase).toBeDefined();
  });

  it('should return a logger message if not orders', async () => {
    const allOrderss = { data: [], meta: { total: 0 } };
    (orderRepository.findAllOrders as jest.Mock).mockResolvedValue(allOrderss);

    await expect(getAllOrdersUseCase.execute(pagination)).rejects.toThrow(
      'No orders have been placed yet',
    );
    expect(orderRepository.findAllOrders).toHaveBeenCalledWith(pagination);
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllOrdersUseCase',
      'No orders have been placed yet',
    );
  });

  it('should return all orders', async () => {
    const allProducts = { data: orders, meta: { total: orders.length } };
    (orderRepository.findAllOrders as jest.Mock).mockResolvedValue(allProducts);

    await expect(getAllOrdersUseCase.execute(pagination)).resolves.toEqual(
      allProducts,
    );
    expect(orderRepository.findAllOrders).toHaveBeenCalledWith(pagination);
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllOrdersUseCase',
      'Orders retrieved successfully',
    );
  });
});
