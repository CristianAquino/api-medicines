import { AuthRepository } from '@auth/infrastructure/repositories/auth.repository';
import { LoginUseCase, LogoutUseCase } from '@auth/usecases';
import { LoggerModule } from '@common/logger/logger.module';
import { LoggerService } from '@common/logger/logger.service';
import { RepositoriesModule } from '@common/repository/repositories.module';
import { BcryptModule } from '@common/service/bcrypt/bcrypt.module';
import { BcryptService } from '@common/service/bcrypt/bcrypt.service';
import { JwtModule } from '@common/service/jwt/jwt.module';
import { JwtTokenService } from '@common/service/jwt/jwt.service';
import { DynamicModule, Module } from '@nestjs/common';
import { UserRepository } from '@user/infrastructure/repositories';
import { SeedRepository } from '@user/repositories/seed.repository';
import {
  AddUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  PutUpdateDataUserUseCase,
  RegisterInitialAdminUserUseCase,
} from '@user/usecases';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, RepositoriesModule],
})
export class UsecaseProxyModule {
  // auth
  static LOGOUT_USECASE_PROXY = 'logoutUseCaseProxy';
  static LOGIN_USECASE_PROXY = 'loginUseCaseProxy';
  // user
  static REGISTER_INITIAL_ADMIN_USER_USECASE_PROXY =
    'registerInitialAdminUserUseCaseProxy';
  static ADD_USER_USECASE_PROXY = 'addUserUseCaseProxy';
  static DELETE_USER_USECASE_PROXY = 'deleteUserUseCaseProxy';
  static GET_ALL_USERS_USECASE_PROXY = 'getAllUsersUseCaseProxy';
  static PUT_UPDATE_DATA_USER_USECASE_PROXY = 'putUpdateDataUserUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [LoggerService, SeedRepository, BcryptService],
          provide: UsecaseProxyModule.REGISTER_INITIAL_ADMIN_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            seedRepository: SeedRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new RegisterInitialAdminUserUseCase(
                logger,
                seedRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [LoggerService, UserRepository, BcryptService],
          provide: UsecaseProxyModule.ADD_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new AddUserUseCase(logger, userRepository, bcryptService),
            ),
        },
        {
          inject: [LoggerService, UserRepository],
          provide: UsecaseProxyModule.DELETE_USER_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: UserRepository) =>
            new UseCaseProxy(new DeleteUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, UserRepository],
          provide: UsecaseProxyModule.GET_ALL_USERS_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: UserRepository) =>
            new UseCaseProxy(new GetAllUsersUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, UserRepository, BcryptService],
          provide: UsecaseProxyModule.PUT_UPDATE_DATA_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new PutUpdateDataUserUseCase(
                logger,
                userRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [],
          provide: UsecaseProxyModule.LOGOUT_USECASE_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCase()),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            BcryptService,
            AuthRepository,
          ],
          provide: UsecaseProxyModule.LOGIN_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            bcryptService: BcryptService,
            authRepository: AuthRepository,
          ) =>
            new UseCaseProxy(
              new LoginUseCase(
                logger,
                jwtTokenService,
                bcryptService,
                authRepository,
              ),
            ),
        },
      ],
      exports: [
        UsecaseProxyModule.REGISTER_INITIAL_ADMIN_USER_USECASE_PROXY,
        UsecaseProxyModule.ADD_USER_USECASE_PROXY,
        UsecaseProxyModule.DELETE_USER_USECASE_PROXY,
        UsecaseProxyModule.GET_ALL_USERS_USECASE_PROXY,
        UsecaseProxyModule.PUT_UPDATE_DATA_USER_USECASE_PROXY,
        UsecaseProxyModule.LOGOUT_USECASE_PROXY,
        UsecaseProxyModule.LOGIN_USECASE_PROXY,
      ],
    };
  }
}
