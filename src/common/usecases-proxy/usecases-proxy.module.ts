import { LoggerModule } from '@common/logger/logger.module';
import { LoggerService } from '@common/logger/logger.service';
import { RepositoriesModule } from '@common/repository/repositories.module';
import { BcryptModule } from '@common/service/bcrypt/bcrypt.module';
import { BcryptService } from '@common/service/bcrypt/bcrypt.service';
import { DynamicModule, Module } from '@nestjs/common';
import { UserRepository } from '@user/infrastructure/repositories/user.repository';
import { RegisterInitialAdminUserUseCase } from '@user/registerInitialAdminUser.usecase';
import { SeedRepository } from '@user/repositories/seed.repository';
import { AddUserUseCase } from '@user/usecases/addUser.usecase';
import { DeleteUserUseCase } from '@user/usecases/deleteUser.usecase';
import { GetAllUsersUseCase } from '@user/usecases/getAllUsers.usecase';
import { PutUpdateDataUserUseCase } from '@user/usecases/putUpdateDataUser.usecase';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, BcryptModule, RepositoriesModule],
})
export class UsecaseProxyModule {
  static INITIAL_ADMIN_USER_PROXY = 'initialAdminUserProxy';
  static POST_INSERT_NEW_USER_PROXY = 'postInsertNewUserProxy';
  static DELETE_USER_BY_ID_PROXY = 'deleteUserByIdProxy';
  static GET_ALL_USERS_PROXY = 'getAllUsersProxy';
  static PUT_UPDATE_DATA_USER_PROXY = 'putUpdateDataUserProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [LoggerService, SeedRepository, BcryptService],
          provide: UsecaseProxyModule.INITIAL_ADMIN_USER_PROXY,
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
          provide: UsecaseProxyModule.POST_INSERT_NEW_USER_PROXY,
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
          provide: UsecaseProxyModule.DELETE_USER_BY_ID_PROXY,
          useFactory: (logger: LoggerService, userRepository: UserRepository) =>
            new UseCaseProxy(new DeleteUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, UserRepository],
          provide: UsecaseProxyModule.GET_ALL_USERS_PROXY,
          useFactory: (logger: LoggerService, userRepository: UserRepository) =>
            new UseCaseProxy(new GetAllUsersUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, UserRepository, BcryptService],
          provide: UsecaseProxyModule.PUT_UPDATE_DATA_USER_PROXY,
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
      ],
      exports: [
        UsecaseProxyModule.INITIAL_ADMIN_USER_PROXY,
        UsecaseProxyModule.POST_INSERT_NEW_USER_PROXY,
        UsecaseProxyModule.DELETE_USER_BY_ID_PROXY,
        UsecaseProxyModule.GET_ALL_USERS_PROXY,
        UsecaseProxyModule.PUT_UPDATE_DATA_USER_PROXY,
      ],
    };
  }
}
