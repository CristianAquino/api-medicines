import { ILogger } from '../../src/common/logger/logger.interface';
import { ICustomerRepository } from '../../src/customer/domain/repositories/customerRepository.interface';
import { AddCustomerUseCase } from '../../src/customer/usecases/addCustomer.usecase';

describe('Test add customer usecase', () => {
  let addCustomerUseCase: AddCustomerUseCase;
  let logger: ILogger;
  let customerRepository: ICustomerRepository;

  beforeAll(() => {
    logger = {} as ILogger;
    logger.log = jest.fn();

    customerRepository = {} as ICustomerRepository;
    customerRepository.addCustomer = jest.fn();

    addCustomerUseCase = new AddCustomerUseCase(logger, customerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(addCustomerUseCase).toBeDefined();
  });

  it('should create a customer', async () => {
    const customer = {
      dni: '00000000',
    };

    await expect(addCustomerUseCase.execute(customer)).resolves.toBeUndefined();

    expect(customerRepository.addCustomer).toHaveBeenCalledWith(customer);
    expect(logger.log).toHaveBeenCalledWith(
      'AddCustomerUseCase',
      'The customer has been registered',
    );
  });
});
