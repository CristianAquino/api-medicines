import { CustomerDTO } from '@customer/infrasctructure/controller/dto';

export interface ICustomerRepository {
  addCustomer(customer: CustomerDTO): Promise<any>;
}
