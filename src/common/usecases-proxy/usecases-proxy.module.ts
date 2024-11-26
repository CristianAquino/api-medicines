import { AuthRepository } from '@auth/infrastructure/repositories/auth.repository';
import { LoginUseCase, LogoutUseCase } from '@auth/usecases';
import { CategoryRepository } from '@category/infrastructure/repositories/category.repository';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  PutUpdateDataCategoryUseCase,
} from '@category/usecases';
import { LoggerModule } from '@common/logger/logger.module';
import { LoggerService } from '@common/logger/logger.service';
import { RepositoriesModule } from '@common/repository/repositories.module';
import { BcryptModule } from '@common/service/bcrypt/bcrypt.module';
import { BcryptService } from '@common/service/bcrypt/bcrypt.service';
import { JwtModule } from '@common/service/jwt/jwt.module';
import { JwtTokenService } from '@common/service/jwt/jwt.service';
import { PdfMakeModule } from '@common/service/pdfMake/pdfMake.module';
import { PdfMakeService } from '@common/service/pdfMake/pdfMake.service';
import { CustomerRepository } from '@customer/infrasctructure/repositories/customer.repository';
import { AddCustomerUseCase } from '@customer/usecases';
import { DynamicModule, Module } from '@nestjs/common';
import { OrderRepository } from '@order/infrastructure/repositories/order.repository';
import { AddOrderUseCase, GetAllOrdersUseCase } from '@order/usecases';
import { OrderDetailsRepository } from '@order_details/infrastructure/repositories/orderDetails.respository';
import {
  AddOrderDetailsUseCase,
  GetAllOrderDetailsUseCase,
  GetOrderDetailsByIdUseCase,
} from '@order_details/usecases';
import { PaymentRepository } from '@payment/infrastructure/repositories/payment.repository';
import { AddPaymentUseCase } from '@payment/usecases';
import { ProductRepository } from '@product/infrastructure/repositories/product.repository';
import {
  AddProductUseCase,
  DeleteProductUseCase,
  GetAllProductsUseCase,
  PutUpdateDataProductUseCase,
} from '@product/usecases';
import { CreateBillReportUseCase } from '@report/usecases/createBillReport.usecase';
import { UserRepository } from '@user/infrastructure/repositories';
import { SeedRepository } from '@user/repositories/seed.repository';
import {
  CreateAdminUserUseCase,
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  PutUpdateDataUserByAdminUseCase,
  PutUpdateDataUserUseCase,
  PutUpdatePasswordUserUseCase,
} from '@user/usecases';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    PdfMakeModule,
    RepositoriesModule,
  ],
})
export class UsecaseProxyModule {
  // auth
  static LOGOUT_USECASE_PROXY = 'logoutUseCaseProxy';
  static LOGIN_USECASE_PROXY = 'loginUseCaseProxy';
  // create admin
  static CREATE_ADMIN_USER_USECASE_PROXY = 'createAdminUserUseCaseProxy';
  // user
  static CREATE_USER_USECASE_PROXY = 'createUserUseCaseProxy';
  static DELETE_USER_USECASE_PROXY = 'deleteUserUseCaseProxy';
  static GET_ALL_USERS_USECASE_PROXY = 'getAllUsersUseCaseProxy';
  static PUT_UPDATE_DATA_USER_USECASE_PROXY = 'putUpdateDataUserUseCaseProxy';
  static PUT_UPDATE_DATA_USER_BY_ADMIN_USECASE_PROXY =
    'putUpdateDataUserByAdminUseCaseProxy';
  static PUT_UPDATE_PASSWORD_USER_USECASE_PROXY =
    'putUpdatePasswordUserUseCaseProxy';
  // category
  static CREATE_CATEGORY_USECASE_PROXY = 'createCategoryUseCaseProxy';
  static GET_ALL_CATEGORY_USECASE_PROXY = 'getAllCategoryUseCaseProxy';
  static PUT_UPDATE__DATA_CATEGORY_USECASE_PROXY =
    'putUpdateDataCategoryUseCaseProxy';
  static DELETE_CATEGORY_USECASE_PROXY = 'deleteCategoryUseCaseProxy';
  // product
  static ADD_PRODUCT_USECASE_PROXY = 'addProductUseCaseProxy';
  static GET_ALL_PRODUCTS_USECASE_PROXY = 'getAllProductsUseCaseProxy';
  static DELETE_PRODUCT_BY_ID_USECASE_PROXY = 'deleteProductByIdUseCaseProxy';
  static PUT_UPDATE_DATA_PRODUCT_USECASE_PROXY =
    'putUpdateDataProductUseCaseProxy';
  // order
  static ADD_ORDER_USECASE_PROXY = 'addOrderUseCaseProxy';
  static GET_ALL_ORDERS_USECASE_PROXY = 'getAllOrdersUseCaseProxy';
  // order details
  static ADD_ORDER_DETAILS_USECASE_PROXY = 'addOrderDetailUseCaseProxy';
  static GET_ORDER_DETAILS_BY_ID_USECASE_PROXY =
    'getOrderDetailsByIdUsecaseProxy';
  static GET_ALL_ORDER_DETAILS_USECASE_PROXY = 'getAllOrderDetailsUsecaseProxy';
  // payment
  static ADD_PAYMENT_USECASE_PROXY = 'addPaymentUseCaseProxy';
  // customer
  static ADD_CUSTOMER_USECASE_PROXY = 'addCustomerUseCaseProxy';
  // print
  static CREATE_BILL_REPORT_USECASE_PROXY = 'createBillReportUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [LoggerService, SeedRepository, BcryptService],
          provide: UsecaseProxyModule.CREATE_ADMIN_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            seedRepository: SeedRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new CreateAdminUserUseCase(logger, seedRepository, bcryptService),
            ),
        },
        {
          inject: [LoggerService, UserRepository, BcryptService],
          provide: UsecaseProxyModule.CREATE_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCase(logger, userRepository, bcryptService),
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
          inject: [LoggerService, UserRepository],
          provide: UsecaseProxyModule.PUT_UPDATE_DATA_USER_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: UserRepository) =>
            new UseCaseProxy(
              new PutUpdateDataUserUseCase(logger, userRepository),
            ),
        },
        {
          inject: [LoggerService, UserRepository],
          provide:
            UsecaseProxyModule.PUT_UPDATE_DATA_USER_BY_ADMIN_USECASE_PROXY,
          useFactory: (logger: LoggerService, userRepository: UserRepository) =>
            new UseCaseProxy(
              new PutUpdateDataUserByAdminUseCase(logger, userRepository),
            ),
        },
        {
          inject: [
            LoggerService,
            UserRepository,
            BcryptService,
            JwtTokenService,
          ],
          provide: UsecaseProxyModule.PUT_UPDATE_PASSWORD_USER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: UserRepository,
            bcryptService: BcryptService,
            jwtTokenService: JwtTokenService,
          ) =>
            new UseCaseProxy(
              new PutUpdatePasswordUserUseCase(
                logger,
                userRepository,
                bcryptService,
                jwtTokenService,
              ),
            ),
        },
        {
          inject: [LoggerService],
          provide: UsecaseProxyModule.LOGOUT_USECASE_PROXY,
          useFactory: (logger: LoggerService) =>
            new UseCaseProxy(new LogoutUseCase(logger)),
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
        {
          inject: [LoggerService, CategoryRepository],
          provide: UsecaseProxyModule.CREATE_CATEGORY_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: CategoryRepository,
          ) =>
            new UseCaseProxy(
              new CreateCategoryUseCase(logger, categoryRepository),
            ),
        },
        {
          inject: [LoggerService, CategoryRepository],
          provide: UsecaseProxyModule.GET_ALL_CATEGORY_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: CategoryRepository,
          ) =>
            new UseCaseProxy(
              new GetAllCategoriesUseCase(logger, categoryRepository),
            ),
        },
        {
          inject: [LoggerService, CategoryRepository],
          provide: UsecaseProxyModule.PUT_UPDATE__DATA_CATEGORY_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: CategoryRepository,
          ) =>
            new UseCaseProxy(
              new PutUpdateDataCategoryUseCase(logger, categoryRepository),
            ),
        },
        {
          inject: [LoggerService, CategoryRepository],
          provide: UsecaseProxyModule.DELETE_CATEGORY_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            categoryRepository: CategoryRepository,
          ) =>
            new UseCaseProxy(
              new DeleteCategoryUseCase(logger, categoryRepository),
            ),
        },
        {
          inject: [LoggerService, ProductRepository, CategoryRepository],
          provide: UsecaseProxyModule.ADD_PRODUCT_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: ProductRepository,
            categoryRepository: CategoryRepository,
          ) =>
            new UseCaseProxy(
              new AddProductUseCase(
                logger,
                productRepository,
                categoryRepository,
              ),
            ),
        },
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecaseProxyModule.GET_ALL_PRODUCTS_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: ProductRepository,
          ) =>
            new UseCaseProxy(
              new GetAllProductsUseCase(logger, productRepository),
            ),
        },
        {
          inject: [LoggerService, ProductRepository],
          provide: UsecaseProxyModule.DELETE_PRODUCT_BY_ID_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: ProductRepository,
          ) =>
            new UseCaseProxy(
              new DeleteProductUseCase(logger, productRepository),
            ),
        },
        {
          inject: [LoggerService, ProductRepository, CategoryRepository],
          provide: UsecaseProxyModule.PUT_UPDATE_DATA_PRODUCT_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: ProductRepository,
            categoryRepository: CategoryRepository,
          ) =>
            new UseCaseProxy(
              new PutUpdateDataProductUseCase(
                logger,
                productRepository,
                categoryRepository,
              ),
            ),
        },
        {
          inject: [LoggerService, ProductRepository, OrderRepository],
          provide: UsecaseProxyModule.ADD_ORDER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            productRepository: ProductRepository,
            orderRepository: OrderRepository,
          ) =>
            new UseCaseProxy(
              new AddOrderUseCase(logger, productRepository, orderRepository),
            ),
        },
        {
          inject: [LoggerService, OrderRepository],
          provide: UsecaseProxyModule.GET_ALL_ORDERS_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            orderRepository: OrderRepository,
          ) =>
            new UseCaseProxy(new GetAllOrdersUseCase(logger, orderRepository)),
        },
        {
          inject: [LoggerService, OrderDetailsRepository],
          provide: UsecaseProxyModule.ADD_ORDER_DETAILS_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            orderDetailsRepository: OrderDetailsRepository,
          ) =>
            new UseCaseProxy(
              new AddOrderDetailsUseCase(logger, orderDetailsRepository),
            ),
        },
        {
          inject: [LoggerService, OrderDetailsRepository],
          provide: UsecaseProxyModule.GET_ORDER_DETAILS_BY_ID_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            orderDetailsRepository: OrderDetailsRepository,
          ) =>
            new UseCaseProxy(
              new GetOrderDetailsByIdUseCase(logger, orderDetailsRepository),
            ),
        },
        {
          inject: [LoggerService, OrderDetailsRepository],
          provide: UsecaseProxyModule.GET_ALL_ORDER_DETAILS_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            orderDetailsRepository: OrderDetailsRepository,
          ) =>
            new UseCaseProxy(
              new GetAllOrderDetailsUseCase(logger, orderDetailsRepository),
            ),
        },
        {
          inject: [LoggerService, PaymentRepository],
          provide: UsecaseProxyModule.ADD_PAYMENT_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            paymentRepository: PaymentRepository,
          ) =>
            new UseCaseProxy(new AddPaymentUseCase(logger, paymentRepository)),
        },
        {
          inject: [LoggerService, CustomerRepository],
          provide: UsecaseProxyModule.ADD_CUSTOMER_USECASE_PROXY,
          useFactory: (
            logger: LoggerService,
            customerRepository: CustomerRepository,
          ) =>
            new UseCaseProxy(
              new AddCustomerUseCase(logger, customerRepository),
            ),
        },
        {
          inject: [LoggerService, PdfMakeService],
          provide: UsecaseProxyModule.CREATE_BILL_REPORT_USECASE_PROXY,
          useFactory: (logger: LoggerService, pdfMakeSerive: PdfMakeService) =>
            new UseCaseProxy(
              new CreateBillReportUseCase(logger, pdfMakeSerive),
            ),
        },
      ],
      exports: [
        UsecaseProxyModule.CREATE_ADMIN_USER_USECASE_PROXY,
        UsecaseProxyModule.CREATE_USER_USECASE_PROXY,
        UsecaseProxyModule.DELETE_USER_USECASE_PROXY,
        UsecaseProxyModule.GET_ALL_USERS_USECASE_PROXY,
        UsecaseProxyModule.PUT_UPDATE_DATA_USER_USECASE_PROXY,
        UsecaseProxyModule.PUT_UPDATE_DATA_USER_BY_ADMIN_USECASE_PROXY,
        UsecaseProxyModule.PUT_UPDATE_PASSWORD_USER_USECASE_PROXY,
        UsecaseProxyModule.LOGOUT_USECASE_PROXY,
        UsecaseProxyModule.LOGIN_USECASE_PROXY,
        UsecaseProxyModule.CREATE_CATEGORY_USECASE_PROXY,
        UsecaseProxyModule.GET_ALL_CATEGORY_USECASE_PROXY,
        UsecaseProxyModule.PUT_UPDATE__DATA_CATEGORY_USECASE_PROXY,
        UsecaseProxyModule.DELETE_CATEGORY_USECASE_PROXY,
        UsecaseProxyModule.ADD_PRODUCT_USECASE_PROXY,
        UsecaseProxyModule.GET_ALL_PRODUCTS_USECASE_PROXY,
        UsecaseProxyModule.DELETE_PRODUCT_BY_ID_USECASE_PROXY,
        UsecaseProxyModule.PUT_UPDATE_DATA_PRODUCT_USECASE_PROXY,
        UsecaseProxyModule.ADD_ORDER_USECASE_PROXY,
        UsecaseProxyModule.GET_ALL_ORDERS_USECASE_PROXY,
        UsecaseProxyModule.ADD_ORDER_DETAILS_USECASE_PROXY,
        UsecaseProxyModule.GET_ORDER_DETAILS_BY_ID_USECASE_PROXY,
        UsecaseProxyModule.GET_ALL_ORDER_DETAILS_USECASE_PROXY,
        UsecaseProxyModule.ADD_PAYMENT_USECASE_PROXY,
        UsecaseProxyModule.ADD_CUSTOMER_USECASE_PROXY,
        UsecaseProxyModule.CREATE_BILL_REPORT_USECASE_PROXY,
      ],
    };
  }
}
