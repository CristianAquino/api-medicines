import { PaginationDTO } from '@common/dto';
import { Order } from '@common/entities';
import { OrderModel, ProductModel } from '@common/entities/models';
import { InjectRepository } from '@nestjs/typeorm';
import { IOrderRepository } from '@order/domain/repositories/orderRepository.interface';
import { Repository } from 'typeorm';
import { AllOrdersData } from '../controller/dto';

export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(order: any): Promise<any> {
    const newOrder = this.orderRepository.create(order);
    return await this.orderRepository.save(newOrder);
  }
  async findAllOrders(pagination: PaginationDTO): Promise<AllOrdersData> {
    const { page, limit } = pagination;
    const [orders, total_orders] = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.product', 'product')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const last_page = Math.ceil(total_orders / limit);

    return {
      data: orders.map((order) => this.findOrders(order)),
      meta: {
        total: total_orders,
        page,
        last_page,
      },
    };
  }

  private findOrder(order: OrderModel) {
    const ord = new OrderModel();
    ord.id = order.id;
    ord.quantity = order.quantity;
    ord.unit_price = order.unit_price;
    ord.total = order.total;
    ord.createdAt = order.createdAt;
    return ord;
  }

  private findOrders(order: OrderModel) {
    const allOrders = this.findOrder(order) as OrderModel;
    allOrders.product = this.product(order.product);
    return allOrders;
  }

  private product(product: ProductModel) {
    const pro = new ProductModel();
    pro.id = product.id;
    pro.name = product.name;
    pro.sku = product.sku;
    return pro;
  }
}
