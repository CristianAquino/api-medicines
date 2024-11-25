import { OrderDetailsModel } from '@common/entities/models';
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces';
import { Formatter } from './helpers/formatter.helper';

const logo: Content = {
  image: 'src/assets/medical.png',
  width: 100,
};

export const billReport = (detail: OrderDetailsModel): TDocumentDefinitions => {
  const { orders, customer, payment, ...data } = detail;
  return {
    header: {
      text: 'Bill Report',
      alignment: 'right',
      margin: [10, 10],
    },
    content: [
      logo,
      {
        text: `full_names: ${customer.full_names}\n surnames: ${customer.surnames}\n dni: ${customer.dni}\n method pay: ${payment.type}`,
        margin: [10, 10],
      },
      // table data sold
      {
        margin: [0, 20],
        layout: 'lightHorizontalLines',
        table: {
          widths: ['auto', '*', 'auto', 'auto', 'auto'],
          headerRows: 1,
          body: [
            [
              { text: 'ID', alignment: 'center' },
              'Product',
              { text: 'Price', alignment: 'center' },
              { text: 'Quantity', alignment: 'center' },
              { text: 'Total', alignment: 'right' },
            ],
            ...orders.map((order, index) => [
              { text: index + 1, alignment: 'center' },
              order.product.name,
              {
                text: Formatter.currency(order.unit_price),
                alignment: 'center',
              },
              { text: order.quantity, alignment: 'center' },
              {
                text: Formatter.currency(order.total),
                alignment: 'right',
                bold: true,
              },
            ]),
            [{}, {}, {}, {}, {}],
            // totals
            [
              { text: 'SubTotal', colSpan: 4, alignment: 'right' },
              {},
              {},
              {},
              {
                text: Formatter.currency(data.sub_total),
                alignment: 'right',
                bold: true,
              },
            ],
            [
              {},
              {},
              {
                text: 'Total',
                colSpan: 2,
                alignment: 'right',
                fillColor: '#000',
                color: '#fff',
                bold: true,
                margin: [5, 5],
                fontSize: 14,
              },
              {},
              {
                text: Formatter.currency(data.total_amount),
                alignment: 'right',
                bold: true,
                fillColor: '#000',
                color: '#fff',
                margin: [5, 5],
                fontSize: 14,
              },
            ],
          ],
        },
      },
    ],
  };
};
