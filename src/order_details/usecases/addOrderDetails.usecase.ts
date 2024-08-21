import { ILogger } from '@common/logger/logger.interface';
import { IOrderDetailsRepository } from '@order_details/domain/repositories/orderDetailsRepository.interface';

export class AddOrderDetailsUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly orderDetailsRepository: IOrderDetailsRepository,
  ) {}

  async execute(
    details: any,
    payment: any,
    customer: any,
    descount: number,
  ): Promise<void> {
    let total = 0;
    const t = {};
    for (const dato of details) {
      total += dato.total;
    }
    // pensar como poner el descuento
    t['sub_total'] = total;
    t['total_amount'] = total * (1 - descount);
    t['discount'] = descount;
    await this.orderDetailsRepository.createOrderDetail(
      details,
      payment,
      customer,
      t,
    );
    // return 'Orders Details have been added';
  }
}
