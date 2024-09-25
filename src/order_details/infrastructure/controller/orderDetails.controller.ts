import { ResponseErrorDTO } from '@common/dto';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { UseCaseProxy } from '@common/usecases-proxy/usecases-proxy';
import { UsecaseProxyModule } from '@common/usecases-proxy/usecases-proxy.module';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetOrderDetailsByIdUseCase } from '@order_details/usecases';
import { SWGOrderDetailsData } from './dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order_details')
@ApiTags('Order Details')
@ApiCookieAuth()
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
export class OrderDetailsController {
  constructor(
    @Inject(UsecaseProxyModule.GET_ORDER_DETAILS_BY_ID_USECASE_PROXY)
    private readonly getOrderDetailsByIdUsecaseProxy: UseCaseProxy<GetOrderDetailsByIdUseCase>,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  @ApiResponse({ status: HttpStatus.OK, type: SWGOrderDetailsData })
  @HttpCode(HttpStatus.OK)
  async getOrderDetailsById(@Param('id', ParseIntPipe) id: number) {
    return this.getOrderDetailsByIdUsecaseProxy.getInstance().execute(id);
  }
}
