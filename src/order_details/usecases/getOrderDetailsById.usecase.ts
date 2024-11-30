import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IOrderDetailsRepository } from '@order_details/domain/repositories/orderDetailsRepository.interface';

export class GetOrderDetailsByIdUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly orderDetailsRepository: IOrderDetailsRepository,
  ) {}

  async execute(id: number): Promise<any> {
    const orderDetails = await this.orderDetailsRepository.findOrderDetailsById(
      id,
    );
    if (!orderDetails) {
      this.logger.warn('GetOrderDetailsById', 'Order details not found');
      throw new NotFoundException('Order details not found');
    }
    this.logger.log(
      'GetOrderDetailsById',
      'Order details retrieved successfully',
    );
    return orderDetails;
  }
}
