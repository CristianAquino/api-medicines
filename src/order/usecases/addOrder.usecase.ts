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

    if (orders.length == 0) {
      this.logger.warn('AddOrderUseCase', 'Datos is empty');
      throw new Error('Datos is empty');
    }
    for (const data of orders) {
      const { id: productID, ...order } = data;
      const productResponse = await this.productRepository.findById(productID);
      if (!productResponse) {
        this.logger.error('AddOrderUseCase', 'The product not exists');
        throw new NotFoundException('The product not exists');
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
          `The requested quantity of the ${productResponse.name} product is greater than the amount stored`,
        );
        throw new Error(
          `The requested quantity of the ${productResponse.name} product is greater than the amount stored`,
        );
      }
      if (order.total != order.quantity * productResponse.unit_price) {
        this.logger.error(
          'AddOrderUseCase',
          `The total cost for the ${productResponse.name} product is incorrect`,
        );
        throw new Error(
          `The total cost for the ${productResponse.name} product is incorrect`,
        );
      }
      verify.push({
        ...data,
        unit_price: productResponse.unit_price,
        product: productResponse,
      });
    }

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
    if (details.length > 0) {
      this.logger.log('AddOrderUseCase', 'Orders have been added');
    }
    return details;
  }
}
