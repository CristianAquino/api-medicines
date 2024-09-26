export interface IOrderDetailsRepository {
  createOrderDetail(
    details: any,
    payment: any,
    customer: any,
    total: any,
  ): Promise<void>;
  getOrderDetailsById(id: number): Promise<any>;
}
