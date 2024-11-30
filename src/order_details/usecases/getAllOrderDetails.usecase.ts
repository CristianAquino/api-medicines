import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IOrderDetailsRepository } from '@order_details/domain/repositories/orderDetailsRepository.interface';
import { FindAllOrderDetailsDTO } from '@order_details/infrastructure/controller/dto';

export class GetAllOrderDetailsUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly orderDetailsRepository: IOrderDetailsRepository,
  ) {}

  async execute(findAllOrderDetailsDTO: FindAllOrderDetailsDTO): Promise<any> {
    const allOrderDetails =
      await this.orderDetailsRepository.findAllOrderDetails(
        findAllOrderDetailsDTO,
      );
    if (allOrderDetails.meta.total == 0) {
      this.logger.log(
        'GetAllOrderDetailsUseCase',
        'No orders have been placed yet',
      );
      throw new NotFoundException('No orders have been placed yet');
    }
    this.logger.log('GetAllOrderDetails', 'Return all order details');
    return allOrderDetails;
  }
}
