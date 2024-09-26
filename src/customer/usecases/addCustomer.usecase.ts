import { ILogger } from '@common/logger/logger.interface';
import { ICustomerRepository } from '@customer/domain/repositories/customerRepository.interface';
import { CustomerDTO } from '@customer/infrasctructure/controller/dto';

export class AddCustomerUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(customer: CustomerDTO): Promise<any> {
    this.logger.log('AddCustomerUseCase', 'The customer has been registered');
    return await this.customerRepository.addCustomer(customer);
  }
}
