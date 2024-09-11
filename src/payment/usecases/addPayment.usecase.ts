import { ILogger } from '@common/logger/logger.interface';
import { IPaymentRepository } from '@payment/domain/repositories/paymentRepository.interface';
import { PaymentDTO } from '@payment/infrastructure/controller/dto';

export class AddPaymentUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(payment: PaymentDTO): Promise<any> {
    this.logger.log(
      'AddPaymentUseCase',
      `payment with ${payment.type} successful`,
    );
    return await this.paymentRepository.addPayment(payment);
  }
}
