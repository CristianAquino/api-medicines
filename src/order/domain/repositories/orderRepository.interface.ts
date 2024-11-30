import { PaginationDTO } from '@common/dto';
import { AllOrdersData } from '@order/infrastructure/controller/dto';

export interface IOrderRepository {
  createOrder(orders: any): Promise<any>;
  findAllOrders(pagination: PaginationDTO): Promise<AllOrdersData>;
}
