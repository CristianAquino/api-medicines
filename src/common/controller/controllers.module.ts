import { AuthController } from '@auth/infrastructure/controller/auth.controller';
import { CategoryController } from '@category/infrastructure/controller/category.controller';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { OrderController } from '@order/infrastructure/controller/order.controller';
import { OrderDetailsController } from '@order_details/infrastructure/controller/orderDetails.controller';
import { ProductController } from '@product/infrastructure/controller/product.controller';
import { UserController } from '@user/infrastructure/controller/user.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [
    AuthController,
    UserController,
    CategoryController,
    ProductController,
    OrderController,
    OrderDetailsController,
  ],
})
export class ControllersModule {}
