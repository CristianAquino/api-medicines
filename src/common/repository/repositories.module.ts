import { TypeOrmConfigModule } from '@common/config/database-config/typeorm.module';
import { Category } from '@common/entities/category.entity';
import { Customer } from '@common/entities/customer.entity';
import { Order } from '@common/entities/order.entity';
import { OrderDetail } from '@common/entities/order_details.entity';
import { Payment } from '@common/entities/payment.entity';
import { Product } from '@common/entities/product.entity';
import { User } from '@common/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/infrastructure/repositories/user.repository';
import { SeedRepository } from '@user/repositories/seed.repository';

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
  providers: [SeedRepository, UserRepository],
  exports: [SeedRepository, UserRepository],
})
export class RepositoriesModule {}
