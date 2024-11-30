import { ILogger } from '../../src/common/logger/logger.interface';
import { IOrderDetailsRepository } from '../../src/order_details/domain/repositories/orderDetailsRepository.interface';
import { GetAllOrderDetailsUseCase } from '../../src/order_details/usecases';

describe('Test get all order details usecase', () => {
  let getAllOrderDetailsUseCase: GetAllOrderDetailsUseCase;
  let logger: ILogger;
  let orderDetailsRepository: IOrderDetailsRepository;

  const pagination = {
    page: 1,
    limit: 10,
  };

  const order_details = [
    {
      id: 1,
      total_amount: 63.98,
      sub_total: 63.98,
      createdAt: '2024-11-26T04:54:10.000Z',
      orders: [
        {
          id: 'ffc398d6-25aa-495e-b197-616dbcc43a80',
          quantity: 2,
          unit_price: 10.63,
          total: 21.26,
          product: {
            id: '26928fed-e5cc-4784-a4df-62abb5929453',
            name: 'Buscapina Compositum N 10mg/500mg',
            sku: 'BuscapinaCompositum123',
          },
        },
      ],
    },
  ];

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    orderDetailsRepository = {} as IOrderDetailsRepository;
    orderDetailsRepository.findAllOrderDetails = jest.fn();

    getAllOrderDetailsUseCase = new GetAllOrderDetailsUseCase(
      logger,
      orderDetailsRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getAllOrderDetailsUseCase).toBeDefined();
  });

  it('should return a logger message if not order details', async () => {
    const allOrderDetails = { data: [], meta: { total: 0 } };
    (orderDetailsRepository.findAllOrderDetails as jest.Mock).mockResolvedValue(
      allOrderDetails,
    );

    await expect(getAllOrderDetailsUseCase.execute(pagination)).rejects.toThrow(
      'No orders have been placed yet',
    );
    expect(orderDetailsRepository.findAllOrderDetails).toHaveBeenCalledWith(
      pagination,
    );
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllOrderDetailsUseCase',
      'No orders have been placed yet',
    );
  });

  it('should return all order details', async () => {
    const allOrderDetails = {
      data: order_details,
      meta: { total: order_details.length },
    };
    (orderDetailsRepository.findAllOrderDetails as jest.Mock).mockResolvedValue(
      allOrderDetails,
    );

    await expect(getAllOrderDetailsUseCase.execute(pagination)).resolves.toBe(
      allOrderDetails,
    );
    expect(orderDetailsRepository.findAllOrderDetails).toHaveBeenCalledWith(
      pagination,
    );
    expect(logger.log).toHaveBeenCalledWith(
      'GetAllOrderDetails',
      'Return all order details',
    );
  });
});
