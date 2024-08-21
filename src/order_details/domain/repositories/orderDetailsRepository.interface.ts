export interface IOrderDetailsRepository {
  createOrderDetail(
    total: number,
    details: any,
    payment: any,
    customer: any,
  ): Promise<void>;
}
