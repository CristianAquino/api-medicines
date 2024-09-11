import { ILogger } from '../../src/common/logger/logger.interface';
import { IPaymentRepository } from '../../src/payment/domain/repositories/paymentRepository.interface';
import { AddPaymentUseCase } from '../../src/payment/usecases';

describe('Test add payment usecase', () => {
  let addPaymentUseCase: AddPaymentUseCase;
  let logger: ILogger;
  let paymentRepository: IPaymentRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    paymentRepository = {} as IPaymentRepository;
    paymentRepository.addPayment = jest.fn();

    addPaymentUseCase = new AddPaymentUseCase(logger, paymentRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addPaymentUseCase).toBeDefined();
  });

  it('should create a payment', async () => {
    const payment = {
      type: 'card',
    };

    await expect(addPaymentUseCase.execute(payment)).resolves.toBeUndefined();

    expect(paymentRepository.addPayment).toHaveBeenCalledWith(payment);
    expect(logger.log).toHaveBeenCalledWith(
      'AddPaymentUseCase',
      `payment with ${payment.type} successful`,
    );
  });
});
