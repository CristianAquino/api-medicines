import { Module } from '@nestjs/common';
import { PdfMakeService } from './pdfMake.service';

@Module({
  providers: [PdfMakeService],
  exports: [PdfMakeService],
})
export class PdfMakeModule {}
