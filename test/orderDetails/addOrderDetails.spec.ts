import { ILogger } from '../../src/common/logger/logger.interface';
import { IOrderDetailsRepository } from '../../src/order_details/domain/repositories/orderDetailsRepository.interface';
import { AddOrderDetailsUseCase } from '../../src/order_details/usecases';

describe('Test add order details usecase', () => {
  let addOrderDetailsUseCase: AddOrderDetailsUseCase;
  let logger: ILogger;
  let orderDetailsRepository: IOrderDetailsRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    orderDetailsRepository = {} as IOrderDetailsRepository;
    orderDetailsRepository.createOrderDetail = jest.fn();

    addOrderDetailsUseCase = new AddOrderDetailsUseCase(
      logger,
      orderDetailsRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addOrderDetailsUseCase).toBeDefined();
  });

  it('should add a new product', async () => {
    const details = [{ total: 1 }, { total: 2 }];
    const payment = {
      type: 'card',
    };
    const customer = {
      dni: '00000000',
    };

    (orderDetailsRepository.createOrderDetail as jest.Mock).mockReturnValueOnce(
      'order detail',
    );

    await expect(
      addOrderDetailsUseCase.execute(details, payment, customer),
    ).resolves.toBeUndefined();
    expect(logger.log).toHaveBeenCalledWith(
      'AddOrderDetailsUseCase',
      'Orders Details have been added',
    );
  });
});
