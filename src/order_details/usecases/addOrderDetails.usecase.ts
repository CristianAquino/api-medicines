import { ILogger } from '@common/logger/logger.interface';
import { IOrderDetailsRepository } from '@order_details/domain/repositories/orderDetailsRepository.interface';

export class AddOrderDetailsUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly orderDetailsRepository: IOrderDetailsRepository,
  ) {}

  async execute(details: any, payment: any, customer: any): Promise<number> {
    let total = 0;
    for (const dato of details) {
      total += dato.total;
    }
    const od = await this.orderDetailsRepository.createOrderDetail(
      details,
      payment,
      customer,
      { sub_total: total, total_amount: total },
    );
    this.logger.log('AddOrderDetailsUseCase', 'Orders Details have been added');
    return od;
  }
}
