import { Customer } from '@common/entities';
import { ICustomerRepository } from '@customer/domain/repositories/customerRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}
  async addCustomer(customer: any): Promise<any> {
    return await this.customerRepository.save(customer);
  }
}
