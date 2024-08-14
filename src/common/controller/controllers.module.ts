import { AuthController } from '@auth/infrastructure/controller/auth.controller';
import { CategoryController } from '@category/infrastructure/controller/category.controller';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { UserController } from '@user/infrastructure/controller/user.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [AuthController, UserController, CategoryController],
})
export class ControllersModule {}
