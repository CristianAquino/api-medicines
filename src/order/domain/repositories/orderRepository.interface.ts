export interface IOrderRepository {
  createOrder(orders: any): Promise<any>;
  getAllOrders(): Promise<any>;
}
