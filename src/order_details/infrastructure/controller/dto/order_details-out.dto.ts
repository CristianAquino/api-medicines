import { ResponseDTO } from '@common/dto';
import {
  CustomerModel,
  OrderModel,
  PaymentModel,
} from '@common/entities/models';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDetailsData {
  @ApiProperty({
    example: '1',
    description: 'order details id',
  })
  id: string;
  @ApiProperty({
    example: 120,
    description: 'total_amount',
  })
  total_amount: number;
  @ApiProperty({
    example: 120,
    description: 'sub_total',
  })
  sub_total: number;
  @ApiProperty({
    type: [OrderModel],
    description: 'order data',
  })
  orders: OrderModel[];
  @ApiProperty({
    type: CustomerModel,
    description: 'customer data',
  })
  customer: CustomerModel;
  @ApiProperty({
    type: PaymentModel,
    description: 'payment data',
  })
  payment: PaymentModel;
}

export class SWGOrderDetailsData extends ResponseDTO {
  @ApiProperty({
    type: OrderDetailsData,
    description: 'data',
  })
  data: OrderDetailsData;
}
