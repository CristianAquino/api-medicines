import { ResponseErrorDTO } from '@common/dto';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import { AddCustomerUseCase } from '@customer/usecases';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddOrderUseCase, GetAllOrdersUseCase } from '@order/usecases';
import { AddOrderDetailsUseCase } from '@order_details/usecases';
import { AddPaymentUseCase } from '@payment/usecases';
import { AddOrderDTO } from './dto';

@Controller('order')
@ApiTags('Order')
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal error',
  type: ResponseErrorDTO,
})
@ApiResponse({
  status: HttpStatus.CONFLICT,
  description: 'Conflict',
  type: ResponseErrorDTO,
})
export class OrderController {
  constructor(
    @Inject(UsecaseProxyModule.ADD_ORDER_USECASE_PROXY)
    private readonly addOrderUsecaseProxy: UseCaseProxy<AddOrderUseCase>,
    @Inject(UsecaseProxyModule.GET_ALL_ORDERS_USECASE_PROXY)
    private readonly getAllOrdersUsecaseProxy: UseCaseProxy<GetAllOrdersUseCase>,
    @Inject(UsecaseProxyModule.ADD_ORDER_DETAILS_USECASE_PROXY)
    private readonly addOrderDetailsUsecaseProxy: UseCaseProxy<AddOrderDetailsUseCase>,
    @Inject(UsecaseProxyModule.ADD_PAYMENT_USECASE_PROXY)
    private readonly addPaymentUsecaseProxy: UseCaseProxy<AddPaymentUseCase>,
    @Inject(UsecaseProxyModule.ADD_CUSTOMER_USECASE_PROXY)
    private readonly addCustomerUsecaseProxy: UseCaseProxy<AddCustomerUseCase>,
  ) {}

  @Post('add')
  @ApiBody({ type: AddOrderDTO })
  @ApiOperation({ summary: 'Add new product order' })
  @HttpCode(HttpStatus.CREATED)
  async addProduct(@Body() addOrderDTO: AddOrderDTO) {
    const { orders, customer, payment, descount } = addOrderDTO;
    const details = await this.addOrderUsecaseProxy
      .getInstance()
      .execute(orders);
    const pay = await this.addPaymentUsecaseProxy
      .getInstance()
      .execute(payment);
    const cust = await this.addCustomerUsecaseProxy
      .getInstance()
      .execute(customer);
    await this.addOrderDetailsUsecaseProxy
      .getInstance()
      .execute(details, pay, cust, descount);
    return 'Orders have been added';
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all orders' })
  @HttpCode(HttpStatus.OK)
  async getAllProducts() {
    const response = await this.getAllOrdersUsecaseProxy
      .getInstance()
      .execute();
    return response;
  }
}
