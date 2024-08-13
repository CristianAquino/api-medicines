import { AuthRepository } from '@auth/infrastructure/repositories/auth.repository';
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
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  providers: [SeedRepository, UserRepository, AuthRepository],
  exports: [SeedRepository, UserRepository, AuthRepository],
})
export class RepositoriesModule {}
