import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IOrderRepository } from '@order/domain/repositories/orderRepository.interface';
import {
  AllOrdersData,
  PaginationDTO,
} from '@order/infrastructure/controller/dto';

export class GetAllOrdersUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(pagination: PaginationDTO): Promise<AllOrdersData> {
    const allOrders = await this.orderRepository.findAllOrders(pagination);
    if (allOrders.meta.total == 0) {
      this.logger.log('GetAllOrdersUseCase', 'Orders not found');
      throw new NotFoundException('Orders not found');
    }
    this.logger.log('GetAllOrdersUseCase', 'Orders retrieved successfully');
    return allOrders;
  }
}
