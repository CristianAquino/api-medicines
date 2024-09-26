export interface IPaymentRepository {
  addPayment(payment: any): Promise<any>;
}
