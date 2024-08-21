import { Payment } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaymentRepository } from 'src/payment/domain/repositories/paymentRepository.interface';
import { Repository } from 'typeorm';

export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(payment: any): Promise<any> {
    return await this.paymentRepository.save(payment);
  }
}
