import { AuthRepository } from '@auth/infrastructure/repositories/auth.repository';
import { CategoryRepository } from '@category/infrastructure/repositories/category.repository';
import { TypeOrmConfigModule } from '@common/config/database-config/typeorm.module';
import {
  Category,
  Customer,
  Order,
  OrderDetail,
  Payment,
  Product,
  User,
} from '@common/entities';
import { CustomerRepository } from '@customer/infrasctructure/repositories/customer.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from '@order/infrastructure/repositories/order.repository';
import { OrderDetailsRepository } from '@order_details/infrastructure/repositories/orderDetails.respository';
import { PaymentRepository } from '@payment/infrastructure/repositories/payment.repository';
import { ProductRepository } from '@product/infrastructure/repositories/product.repository';
import {
  SeedRepository,
  UserRepository,
} from '@user/infrastructure/repositories';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      User,
      Category,
      Product,
      Order,
      OrderDetail,
      Customer,
      Payment,
    ]),
  ],
  providers: [
    SeedRepository,
    UserRepository,
    AuthRepository,
    CategoryRepository,
    ProductRepository,
    OrderRepository,
    OrderDetailsRepository,
    PaymentRepository,
    CustomerRepository,
  ],
  exports: [
    SeedRepository,
    UserRepository,
    AuthRepository,
    CategoryRepository,
    ProductRepository,
    OrderRepository,
    OrderDetailsRepository,
    PaymentRepository,
    CustomerRepository,
  ],
})
export class RepositoriesModule {}
