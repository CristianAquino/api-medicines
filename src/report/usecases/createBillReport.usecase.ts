import { IPdfMake } from '@common/adapters';
import { OrderDetailsModel } from '@common/entities/models';
import { ILogger } from '@common/logger/logger.interface';
import { billReport } from '@report/common';

export class CreateBillReportUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly printer: IPdfMake,
  ) {}

  async execute(detail: OrderDetailsModel): Promise<PDFKit.PDFDocument> {
    const doc = billReport(detail);
    this.logger.log('CreateBillReportUseCase', 'Creating bill report...');
    return this.printer.createPdf(doc);
  }
}
