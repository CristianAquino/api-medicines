import { FindAllOrderDetailsDTO } from '@order_details/infrastructure/controller/dto';

export interface IOrderDetailsRepository {
  createOrderDetail(
    details: any,
    payment: any,
    customer: any,
    total: any,
  ): Promise<number>;
  findOrderDetailsById(id: number): Promise<any>;
  findAllOrderDetails(
    findAllOrderDetailsDTO: FindAllOrderDetailsDTO,
  ): Promise<any>;
}
