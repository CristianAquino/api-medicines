import { envs } from '@common/config/environment-config';
import { ControllersModule } from '@common/controller/controllers.module';
import { LoggerModule } from '@common/logger/logger.module';
import { BcryptModule } from '@common/service/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from '@common/service/jwt/jwt.module';
import { JwtStrategy, LocalStrategy } from '@common/strategies';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RegisterInitialAdminUserUseCase } from '@user/usecases';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwtSecret,
    }),
    LoggerModule,
    UsecaseProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
  ],
  providers: [LocalStrategy, JwtStrategy],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(UsecaseProxyModule.REGISTER_INITIAL_ADMIN_USER_USECASE_PROXY)
    private readonly initialAdminUserUseCaseProxy: UseCaseProxy<RegisterInitialAdminUserUseCase>,
  ) {}

  async onModuleInit() {
    await this.initialAdminUserUseCaseProxy.getInstance().execute();
  }
}
