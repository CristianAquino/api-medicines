import { ResponseErrorDTO } from '@common/dto';
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
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOrderDetailsByIdUseCase } from '@order_details/usecases';
import { CreateBillReportUseCase } from '@report/usecases/createBillReport.usecase';
import { Response } from 'express';

@Controller('report')
@ApiTags('Report')
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
export class ReportController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_BILL_REPORT_USECASE_PROXY)
    private readonly createBillReportUsecaseProxy: UseCaseProxy<CreateBillReportUseCase>,
    @Inject(UsecaseProxyModule.GET_ORDER_DETAILS_BY_ID_USECASE_PROXY)
    private readonly getOrderDetailsByIdUsecaseProxy: UseCaseProxy<GetOrderDetailsByIdUseCase>,
  ) {}

  @Get(':id')
  @ApiOperation({ description: 'Report' })
  @ApiResponse({ status: HttpStatus.OK, content: { 'application/pdf': {} } })
  @HttpCode(HttpStatus.OK)
  async getBillReport(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    const detail = await this.getOrderDetailsByIdUsecaseProxy
      .getInstance()
      .execute(id);
    const pdfDocument = await this.createBillReportUsecaseProxy
      .getInstance()
      .execute(detail);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=factura-${id}.pdf`,
    );

    pdfDocument.pipe(response);
    pdfDocument.end();
  }
}
