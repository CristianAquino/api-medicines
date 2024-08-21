export interface IPaymentRepository {
  createPayment(payment: any): Promise<any>;
}
