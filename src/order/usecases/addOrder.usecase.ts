import { ILogger } from '@common/logger/logger.interface';
import { NotFoundException } from '@nestjs/common';
import { IOrderRepository } from '@order/domain/repositories/orderRepository.interface';
import { OrderDTO } from '@order/infrastructure/controller/dto';
import { IProductRepository } from '@product/domain/repositories/productRepository.interface';

export class AddOrderUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: IProductRepository,
    private readonly orderRepository: IOrderRepository,
  ) {}
  async execute(orders: OrderDTO[]): Promise<any> {
    const verify: any = [];
    const details: any = [];
    // esta parte en un guard
    if (orders.length == 0) {
      this.logger.warn('AddOrderUseCase', 'Datos is empty');
      throw new Error('Datos is empty');
    }
    for (const data of orders) {
      const { id: productID, ...order } = data;
      const productResponse = await this.productRepository.findById(productID);
      if (!productResponse) {
        this.logger.error(
          'AddOrderUseCase',
          `The product ${productResponse.name} not exists`,
        );
        throw new NotFoundException(
          `The product ${productResponse.name} not exists`,
        );
      }
      if (!productResponse.available) {
        this.logger.error(
          'AddOrderUseCase',
          `The product ${productResponse.name} is not available`,
        );
        throw new Error(`The product ${productResponse.name} is not available`);
      }
      if (order.quantity > productResponse.stock) {
        this.logger.error(
          'AddOrderUseCase',
          `The quantity of product ${productResponse.name} in ${order.quantity} is greater than the stock ${productResponse.stock}`,
        );
        throw new Error(
          `The quantity of product ${productResponse.name} in ${order.quantity} is greater than the stock ${productResponse.stock}`,
        );
      }
      if (data.total != order.quantity * productResponse.unit_price) {
        this.logger.error(
          'AddOrderUseCase',
          `The total of product ${productResponse.name} is incorrect`,
        );
        throw new Error(
          `The total of product ${productResponse.name} is incorrect`,
        );
      }
      verify.push({
        ...data,
        product: productResponse,
      });
    }
    // esta parte se puede quedar
    // y verify vendria desde el guard
    for (const order of verify) {
      const { id, ...content } = order;
      await this.productRepository.updateProduct({
        id,
        stock: content.product.stock - content.quantity,
        available: content.product.stock === content.quantity ? false : true,
      });
      const od = await this.orderRepository.createOrder(content);
      details.push(od);
    }
    return details;
  }
}
