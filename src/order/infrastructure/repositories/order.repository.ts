import { Order } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IOrderRepository } from '@order/domain/repositories/orderRepository.interface';
import { Repository } from 'typeorm';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async createOrder(order: any): Promise<any> {
    const newOrder = this.orderRepository.create(order);
    return await this.orderRepository.save(newOrder);
  }
  async getAllOrders(): Promise<any> {
    return await this.orderRepository.find();
  }
}
