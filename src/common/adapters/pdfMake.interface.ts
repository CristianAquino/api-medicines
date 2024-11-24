import { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface IPdfMake {
  createPdf(docDefinition: TDocumentDefinitions): PDFKit.PDFDocument;
}
