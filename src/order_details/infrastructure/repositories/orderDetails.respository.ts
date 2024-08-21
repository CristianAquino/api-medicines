import { OrderDetail } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IOrderDetailsRepository } from '@order_details/domain/repositories/orderDetailsRepository.interface';
import { Repository } from 'typeorm';

export class OrderDetailsRepository implements IOrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailEntityRepository: Repository<OrderDetail>,
  ) {}

  async createOrderDetail(
    details: any,
    payment: any,
    customer: any,
    total: any,
  ): Promise<void> {
    const od = new OrderDetail();
    od.total_amount = total.total_amount;
    od.descount = total.descount;
    od.sub_total = total.sub_total;
    od.orders = details;
    od.payment = payment;
    od.customer = customer;
    await this.orderDetailEntityRepository.save(od);
  }
}
