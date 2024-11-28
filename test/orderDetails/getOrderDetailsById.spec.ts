import { ILogger } from '../../src/common/logger/logger.interface';
import { IOrderDetailsRepository } from '../../src/order_details/domain/repositories/orderDetailsRepository.interface';
import { GetOrderDetailsByIdUseCase } from '../../src/order_details/usecases';

describe('Test get order details by id usecase', () => {
  let getOrderDetailsByIdUseCase: GetOrderDetailsByIdUseCase;
  let logger: ILogger;
  let orderDetailsRepository: IOrderDetailsRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();
    logger.warn = jest.fn();

    orderDetailsRepository = {} as IOrderDetailsRepository;
    orderDetailsRepository.findOrderDetailsById = jest.fn();

    getOrderDetailsByIdUseCase = new GetOrderDetailsByIdUseCase(
      logger,
      orderDetailsRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(getOrderDetailsByIdUseCase).toBeDefined();
  });

  it('should return a warning if there are no results', async () => {
    (
      orderDetailsRepository.findOrderDetailsById as jest.Mock
    ).mockResolvedValue(null);

    await expect(getOrderDetailsByIdUseCase.execute(1)).rejects.toThrow(
      'Order details not found',
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'GetOrderDetailsById',
      'Order details not found',
    );
    expect(logger.log).not.toHaveBeenCalled();
  });

  it('should return the order details according to the identifier', async () => {
    (
      orderDetailsRepository.findOrderDetailsById as jest.Mock
    ).mockResolvedValue({ id: 1 });
    await expect(getOrderDetailsByIdUseCase.execute(1)).resolves.toEqual({
      id: 1,
    });
    expect(logger.warn).not.toHaveBeenCalled();
    expect(logger.log).toHaveBeenCalledWith(
      'GetOrderDetailsById',
      'Order details retrieved successfully',
    );
  });
});
