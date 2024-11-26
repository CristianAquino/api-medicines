import { OrderDetail } from '@common/entities';
import {
  CustomerModel,
  OrderDetailsModel,
  OrderModel,
  PaymentModel,
  ProductModel,
} from '@common/entities/models';
import { InjectRepository } from '@nestjs/typeorm';
import { IOrderDetailsRepository } from '@order_details/domain/repositories/orderDetailsRepository.interface';
import { Repository } from 'typeorm';
import { AllOrderDetailsData, FindAllOrderDetailsDTO } from '../controller/dto';

export class OrderDetailsRepository implements IOrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailEntityRepository: Repository<OrderDetail>,
  ) {}

  async createOrderDetail(
    details: any,
    payment: any,
    customer: any,
    total: any,
  ): Promise<void> {
    const od = new OrderDetailsModel();
    od.total_amount = total.total_amount;
    od.sub_total = total.sub_total;
    od.orders = details;
    od.payment = payment;
    od.customer = customer;
    await this.orderDetailEntityRepository.save(od);
  }
  async findOrderDetailsById(id: number): Promise<any> {
    // const details = await this.orderDetailEntityRepository
    //   .createQueryBuilder('order_details')
    //   .innerJoinAndSelect('order_details.orders', 'orders')
    //   .innerJoinAndSelect('orders.product', 'product')
    //   .innerJoinAndSelect('order_details.payment', 'payment')
    //   .innerJoinAndSelect('order_details.customer', 'customer')
    //   .where('order_details.id = :id', { id })
    //   .getOne();
    const details = await this.orderDetailEntityRepository.findOne({
      where: { id: id },
      relations: ['orders', 'orders.product', 'payment', 'customer'],
    });
    if (!details) return null;
    return this.findOrderDetails(details);
  }

  async findAllOrderDetails(
    findAllOrderDetails: FindAllOrderDetailsDTO,
  ): Promise<AllOrderDetailsData> {
    const { limit, page, date } = findAllOrderDetails;
    const query = this.orderDetailEntityRepository
      .createQueryBuilder('order_details')
      .innerJoinAndSelect('order_details.orders', 'orders')
      .innerJoinAndSelect('orders.product', 'product')
      .innerJoinAndSelect('order_details.payment', 'payment')
      .innerJoinAndSelect('order_details.customer', 'customer');
    if (date) {
      query.where('order_details.created_at = :date', { date });
    }
    const [orders, total_orders] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const last_page = Math.ceil(total_orders / limit);

    return {
      data: orders.map((ele) => this.findAllOrdersDetails(ele)),
      meta: {
        total: total_orders,
        page,
        last_page,
      },
    };
  }

  private findOrderDetails(data: OrderDetailsModel) {
    const od = new OrderDetailsModel();
    od.id = data.id;
    od.total_amount = data.total_amount;
    od.sub_total = data.sub_total;
    od.orders = data.orders.map((order) => this.findOrder(order));
    od.customer = this.findCustomer(data.customer);
    od.payment = this.findPayment(data.payment);
    return od;
  }
  private findAllOrdersDetails(data: OrderDetailsModel) {
    const od = this.findOrderDetails(data) as OrderDetailsModel;
    od.orders = data.orders.map((order) => this.findOrder(order));
    od.customer = this.findCustomer(data.customer);
    od.payment = this.findPayment(data.payment);
    return od;
  }
  private findProduct(data: ProductModel): ProductModel {
    const product = new ProductModel();
    product.id = data.id;
    product.name = data.name;
    product.sku = data.sku;
    return product;
  }
  private findOrder(data: OrderModel): OrderModel {
    const order = new OrderModel();
    order.id = data.id;
    order.quantity = data.quantity;
    order.total = data.total;
    order.unit_price = data.unit_price;
    order.product = this.findProduct(data.product);
    return order;
  }
  private findCustomer(data: CustomerModel): CustomerModel {
    const customer = new CustomerModel();
    customer.id = data.id;
    customer.full_names = data.full_names ?? '';
    customer.surnames = data.surnames ?? '';
    customer.dni = data.dni;
    return customer;
  }
  private findPayment(data: PaymentModel): PaymentModel {
    const payment = new PaymentModel();
    payment.id = data.id;
    payment.type = data.type;
    return payment;
  }
}
