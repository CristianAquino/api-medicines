import { ILogger } from '@common/logger/logger.interface';
import { IOrderRepository } from '@order/domain/repositories/orderRepository.interface';

export class GetAllOrdersUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(): Promise<any> {
    const allOrders = await this.orderRepository.getAllOrders();
    return allOrders;
  }
}
